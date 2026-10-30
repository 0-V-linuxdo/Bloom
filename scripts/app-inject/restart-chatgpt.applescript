-- 优雅退出 ChatGPT（如果有正在回复的对话，会弹出确认框）
tell application "ChatGPT"
	quit
end tell

-- 等待它真正退出（用户点了 Quit 之后）
repeat 20 times
	delay 0.3
	if not (application "ChatGPT" is running) then exit repeat
end repeat

-- 再重新打开（官方应用 + 127.0.0.1 CDP，并注入 Bloom）
if not (application "ChatGPT" is running) then
	set chatgptApp to "/Applications/ChatGPT.app"
	set nodeBin to "/Users/zhutaiyu/.nvm/versions/node/v24.19.0/bin/node"
	set injectJs to "/Users/zhutaiyu/Downloads/Cursor Workspace/Bloom++/未命名/scripts/app-inject/inject.mjs"
	set bloomLog to "/tmp/bloom-chatgpt-cdp.log"
	set ident to do shell script "/usr/bin/plutil -extract CFBundleIdentifier raw -o - " & quoted form of (chatgptApp & "/Contents/Info.plist")
	if ident is not "com.openai.codex" then error "Bloom++: refusing non-official ChatGPT.app"
	set cdpPort to do shell script "/bin/bash -c " & quoted form of "for i in {1..30}; do try=$((40000 + RANDOM % 20000)); if ! /usr/sbin/lsof -nP -iTCP:$try -sTCP:LISTEN >/dev/null 2>&1; then printf %s \"$try\"; exit 0; fi; done; exit 1"
	do shell script "/usr/bin/open -na " & quoted form of chatgptApp & " --args --remote-debugging-address=127.0.0.1 --remote-debugging-port=" & cdpPort
	do shell script "/usr/bin/nohup " & quoted form of nodeBin & " " & quoted form of injectJs & " " & cdpPort & " >" & quoted form of bloomLog & " 2>&1 </dev/null & echo $!"
end if
