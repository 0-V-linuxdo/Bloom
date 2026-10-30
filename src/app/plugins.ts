/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { Plugin } from "@utils/types";

import Settings from "../plugins/_core/settings";
import Themes from "../plugins/_core/themes";
import BetterNavigator from "../plugins/betterNavigator";
import BetterQuotes from "../plugins/betterQuotes";
import ChatListStatus from "../plugins/chatListStatus";
import Cleaner from "../plugins/cleaner";
import ComposerOpacity from "../plugins/composerOpacity";
import Continue from "../plugins/continue";
import CustomSidebarIdentity from "../plugins/customSidebarIdentity";
import GreetingCustomizer from "../plugins/greetingCustomizer";
import InputHistory from "../plugins/inputHistory";
import MessageTimestamps from "../plugins/messageTimestamps";
import NoDictation from "../plugins/noDictation";
import NoShareLink from "../plugins/noShareLink";
import NoSidebarIdentity from "../plugins/noSidebarIdentity";
import RecentTopics from "../plugins/recentTopics";
import ResponseNotification from "../plugins/responseNotification";
import SidebarIdentityOpacity from "../plugins/sidebarIdentityOpacity";
import StarChats from "../plugins/starChats";
import StreamerMode from "../plugins/streamerMode";
import UserQuotes from "../plugins/userQuotes";
import WiderChat from "../plugins/widerChat";

const list: Plugin[] = [
    Settings,
    Themes,
    BetterNavigator,
    BetterQuotes,
    ChatListStatus,
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
    RecentTopics,
    ResponseNotification,
    SidebarIdentityOpacity,
    StarChats,
    StreamerMode,
    UserQuotes,
    WiderChat,
];

export default list;
