import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { sendMessage } from "../telegram.js";

export async function banCommand(update, env) {

    const message = update.message;

    const isAdmin = await isGroupAdmin(
        env,
        message.chat.id,
        message.from.id
    );

    if (!isAdmin) {
        return;
    }

    if (!message.reply_to_message) {

        await sendMessage(
            env,
            message.chat.id,
            "<b>Reply to a message!!</b>",
            {
                parse_mode: "HTML",
                reply_parameters: {
                    message_id: message.message_id
                }
            }
        );

        return;

    }

    const target = message.reply_to_message.text?.trim();

    if (!target) {
        return;
    }

    await env.BAN_LIST.put(
        target,
        "1"
    );

    await sendMessage(
        env,
        message.chat.id,
        "<b>🚫 BANNED</b>",
        {
            parse_mode: "HTML",
            reply_parameters: {
                message_id: message.reply_to_message.message_id
            }
        }
    );

}