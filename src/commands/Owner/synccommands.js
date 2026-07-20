import { callTelegram, sendMessage } from "../../telegram.js";

export async function syncCommands(update, env) {

    // Private Chat Commands
    await callTelegram(
        env,
        "setMyCommands",
        {
            scope: {
                type: "all_private_chats"
            },
            commands: [
                {
                    command: "start",
                    description: "Start the bot"
                },
                {
                    command: "usage",
                    description: "How to use the bot"
                }
            ]
        }
    );

    // Group Commands
    await callTelegram(
        env,
        "setMyCommands",
        {
            scope: {
                type: "all_group_chats"
            },
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
                    command: "ban",
                    description: "Ban a user"
                }
            ]
        }
    );

    return await sendMessage(
        env,
        update.message.chat.id,
        "<tg-emoji emoji-id='6055095969651892237'>✅</tg-emoji> Commands synced successfully.",
        {
            parse_mode: "HTML"
        }
    );
}