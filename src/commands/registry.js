//import { startCommand } from "./private/start.js";
//import { usageCommand } from "./private/usage.js";

import { calcCommand } from "./group/calc.js";

import { banCommand } from "./moderation/ban.js";
import { warnCommand } from "./moderation/warn.js";
import { restrictCommand } from "./moderation/restrict.js";
import { muteCommand } from "./moderation/mute.js";
import { kickCommand } from "./moderation/kick.js";
import { pinCommand } from "./moderation/pin.js";

import { handleStart } from "./private/start.js";
import { handleUsage } from "./private/usage.js";

export const PRIVATE_COMMANDS = {
    start: handleStart,
    usage: handleUsage
};

export const GROUP_COMMANDS = {
    calc: calcCommand,
    ban: banCommand,
    warn: warnCommand,
    mute: muteCommand,
    restrict: restrictCommand,
    kick: kickCommand,
    pin: pinCommand,
};