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
            "<tg-emoji emoji-id='5990170559650991836'>⬅️</tg-emoji> <b>Reply to a message!!</b>",
            {
                parse_mode: "HTML",
                reply_parameters: {
                    message_id: message.message_id
                }
            }
        );

        return;
    }

    const targetUser = message.reply_to_message.from;
    const username = targetUser.username
        ? `@${targetUser.username}`
        : "None";
    const targetUserId = targetUser.id;

    const targetName = targetUser.first_name;

    await banChatMember(
        env,
        message.chat.id,
        targetUserId
    );

    await sendMessage(
        env,
        message.chat.id,
`<tg-emoji emoji-id='6091190140368071716'>🚫</tg-emoji> <b>BANNED</b>
        
<tg-emoji emoji-id='5258011929993026890'>👤</tg-emoji> <b>UserName:</b> <code>${username}</code>
<tg-emoji emoji-id='6309581148536183273'>🆔</tg-emoji> <b>UserId         :</b> <code>${targetUserId}</code>`,
        {
            parse_mode: "HTML",
            reply_parameters: {
                message_id: message.reply_to_message.message_id
            }
        }
    );

}