#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
APP="/Applications/ChatGPT.app"
EXPECTED_ID="com.openai.codex"
EXPECTED_TEAM="2DC432GLL2"

fail() {
    printf 'Bloom++: %s\n' "$*" >&2
    exit 1
}

pick_node() {
    local candidate ver major
    local candidates=()
    if [ -n "${BLOOM_NODE:-}" ]; then
        candidates+=("$BLOOM_NODE")
    fi
    if [ -d "${HOME}/.nvm/versions/node" ]; then
        while IFS= read -r candidate; do
            candidates+=("$candidate")
        done < <(/bin/ls -1d "${HOME}/.nvm/versions/node"/v*/bin/node 2>/dev/null | /usr/bin/sort -V -r)
    fi
    for candidate in /opt/homebrew/opt/node@24/bin/node /opt/homebrew/opt/node@22/bin/node /usr/local/opt/node@24/bin/node /usr/local/opt/node@22/bin/node; do
        candidates+=("$candidate")
    done
    if command -v node >/dev/null 2>&1; then
        candidates+=("$(command -v node)")
    fi
    for candidate in "${candidates[@]}"; do
        [ -x "$candidate" ] || continue
        ver="$("$candidate" -p "process.versions.node" 2>/dev/null || true)"
        major="${ver%%.*}"
        case "$major" in
            ''|*[!0-9]*) continue ;;
        esac
        if [ "$major" -ge 22 ]; then
            printf '%s\n' "$candidate"
            return 0
        fi
    done
    return 1
}

[ "$(/usr/bin/uname -s)" = "Darwin" ] || fail "This launcher is for macOS."
[ -d "$APP" ] || fail "Official ChatGPT.app not found at $APP."
[ -f "$ROOT/userscript/Bloom.app.user.js" ] || fail "Build Bloom.app.user.js first (bun run build)."

IDENTIFIER="$(/usr/bin/plutil -extract CFBundleIdentifier raw -o - "$APP/Contents/Info.plist" 2>/dev/null || true)"
[ "$IDENTIFIER" = "$EXPECTED_ID" ] || fail "Refusing $APP (id ${IDENTIFIER:-missing}; expected $EXPECTED_ID)."

/usr/bin/codesign --verify --deep --strict "$APP" >/dev/null 2>&1 \
    || fail "ChatGPT.app signature is not valid. Reinstall the official app."

TEAM="$(/usr/bin/codesign -dv --verbose=4 "$APP" 2>&1 | /usr/bin/awk -F= '/^TeamIdentifier=/{print $2; exit}')"
[ "$TEAM" = "$EXPECTED_TEAM" ] || fail "Refusing unsigned or third-party ChatGPT.app (team ${TEAM:-missing})."

NODE="$(pick_node)" || fail "Need Node 22 or newer. Install nvm/node@22+, or set BLOOM_NODE."

if /usr/bin/pgrep -x ChatGPT >/dev/null 2>&1; then
    printf 'Bloom++: asking ChatGPT to quit…\n'
    /usr/bin/osascript -e 'tell application id "com.openai.codex" to quit' >/dev/null 2>&1 || true
    for _ in $(/usr/bin/seq 1 40); do
        /usr/bin/pgrep -x ChatGPT >/dev/null 2>&1 || break
        /bin/sleep 0.5
    done
    /usr/bin/pgrep -x ChatGPT >/dev/null 2>&1 && fail "ChatGPT is still running. Quit it from the menu, then run this again."
fi

PORT=""
for _ in $(/usr/bin/seq 1 30); do
    try="$((40000 + RANDOM % 20000))"
    if ! /usr/sbin/lsof -nP -iTCP:"$try" -sTCP:LISTEN >/dev/null 2>&1; then
        PORT="$try"
        break
    fi
done
[ -n "$PORT" ] || fail "Could not find a free loopback port."

printf 'Bloom++: launching ChatGPT with 127.0.0.1:%s\n' "$PORT"
/usr/bin/open -na "$APP" --args --remote-debugging-address=127.0.0.1 --remote-debugging-port="$PORT"

exec "$NODE" "$ROOT/scripts/app-inject/inject.mjs" "$PORT"
