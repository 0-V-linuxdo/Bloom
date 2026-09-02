/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Re-exports ChatGPT host detectors for the favicon plugin.
 */

export {
    COMPOSER_SEL,
    EDITOR_SEL,
    getActiveEditor,
    getComposerRoot,
    getStopButton,
    getSubmitButton,
    isInputEmpty,
    isVisible,
    submitIsGray,
} from "../../host/composer";
export { contextKeyFromUrl, conversationToken } from "../../host/conversation";
export { hasErrorToast, isStreaming } from "../../host/streaming";
