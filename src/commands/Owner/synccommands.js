import { callTelegram, sendMessage } from "../../telegram.js";

export async function syncCommands(update, env) {
    await callTelegram(
        env,
        "setMyCommands",
        {
            commands: [
                {
                    command: "calc",
                    description: "Calculator mode"
                },
                {
                    command: "warn",
                    description: "Warn a user"
                },
                {
                    command: "restrict",
                    description: "Restrict a user"
                },
                {
                    command: "mute",
                    description: "Mute a user"
                },
                {
                    command: "ban",
                    description: "Ban a user"
                },
                {
                    command: "kick",
                    description: "Kick a user"
                },
                {
                    command: "pin",
                    description: "Pin a message"
                }
            ]
        }
    );

    return await sendMessage(
        env,
        update.message.chat.id,
        "<tg-emoji emoji-id='6055095969651892237'>✅</tg-emoji>   Commands synced successfully.",
        {
            parse_mode: "HTML"
        }
    );
}