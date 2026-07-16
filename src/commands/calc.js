import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { sendMessage } from "../telegram.js";
import { calculate } from "../utils/calculator.js";
import { calcSessions } from "../database.js";

export async function calcCommand(update, env) {

    const message = update.message;
    const text = message.text?.trim() ?? "";

    const isAdmin = await isGroupAdmin(
        env,
        message.chat.id,
        message.from.id
    );

    if (!isAdmin) return;

    const gameId = message.reply_to_message?.text?.trim();

    calcSessions.set(
        message.from.id,
        {
            chatId: message.chat.id,
            gameId,
            replyMessageId: message.reply_to_message.message_id
        }
    );

    const expression = text.replace("/calc", "").trim();

    if (!expression) {
        await sendMessage(
            env,
            message.chat.id,
            "<b>Reply with your calculation.</b>",
            {
                parse_mode: "HTML",
                reply_parameters: {
                    message_id: message.message_id
                }
            }
        );

        return;

    }

    const result = calculate(expression);

    await sendMessage(
        env,
        message.chat.id,
        `${gameId ? `<b>${gameId}</b>\n\n` : ""}<code>${expression} = ${result} Ks</code>`,
        {
            parse_mode: "HTML",
            reply_parameters: message.reply_to_message
                ? {
                      message_id: message.reply_to_message.message_id
                  }
                : undefined
        }
    );

    return;

}