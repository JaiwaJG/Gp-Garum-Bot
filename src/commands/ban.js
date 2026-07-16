import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { sendMessage, banChatMember } from "../telegram.js";

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

    const targetUserId = message.reply_to_message.from.id;

    await banChatMember(
        env,
        message.chat.id,
        targetUserId
    );

    await sendMessage(
        env,
        message.chat.id,
        "<tg-emoji emoji-id='6091190140368071716'>🚫</tg-emoji> <b> BANNED</b>",
        {
            parse_mode: "HTML",
            reply_parameters: {
                message_id: message.reply_to_message.message_id
            }
        }
    );

}