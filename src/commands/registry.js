//import { startCommand } from "./private/start.js";
//import { usageCommand } from "./private/usage.js";

import { calcCommand } from "./group/calc.js";
import { banCommand } from "./group/ban.js";
import { handleStart } from "./private/start.js";
import { handleUsage } from "./private/usage.js";

export const PRIVATE_COMMANDS = {
    start: handleStart,
    usage: handleUsage
};

export const GROUP_COMMANDS = {
    calc: calcCommand,
    ban: banCommand
};