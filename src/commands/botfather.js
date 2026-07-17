import {
    PRIVATE_COMMANDS,
    GROUP_COMMANDS
} from "./manifest.js";

export function generateBotFatherCommands() {

    const commands = [
        ...PRIVATE_COMMANDS,
        ...GROUP_COMMANDS
    ];

    return commands
        .map(c => `${c.command} - ${c.description}`)
        .join("\n");

}