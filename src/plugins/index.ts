/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { Plugin } from "@utils/types";

import Settings from "./_core/settings";
import BetterNavigator from "./betterNavigator";
import ChatListStatus from "./chatListStatus";
import ChatStateFavicons from "./chatStateFavicons";
import Cleaner from "./cleaner";
import ComposerOpacity from "./composerOpacity";
import Continue from "./continue";
import CustomSidebarIdentity from "./customSidebarIdentity";
import GreetingCustomizer from "./greetingCustomizer";
import InputHistory from "./inputHistory";
import MessageTimestamps from "./messageTimestamps";
import NoDictation from "./noDictation";
import NoShareLink from "./noShareLink";
import NoSidebarIdentity from "./noSidebarIdentity";
import PromptQueue from "./promptQueue";
import RecentTopics from "./recentTopics";
import ResponseNotification from "./responseNotification";
import SidebarIdentityOpacity from "./sidebarIdentityOpacity";
import StarChats from "./starChats";
import StreamerMode from "./streamerMode";
import WiderChat from "./widerChat";

const list: Plugin[] = [
    Settings,
    BetterNavigator,
    ChatListStatus,
    ChatStateFavicons,
    Cleaner,
    ComposerOpacity,
    Continue,
    CustomSidebarIdentity,
    GreetingCustomizer,
    InputHistory,
    MessageTimestamps,
    NoDictation,
    NoShareLink,
    NoSidebarIdentity,
    PromptQueue,
    RecentTopics,
    ResponseNotification,
    SidebarIdentityOpacity,
    StarChats,
    StreamerMode,
    WiderChat,
];

export default list;
