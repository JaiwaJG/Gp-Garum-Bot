import { isGroupAdmin } from "../../permissions/groupAdmin.js";
import { 
    deleteMessage, 
    sendMessage, 
    restrictChatMember 
} from "../../telegram.js";

export async function restrictCommand(update, env) {

    const message = update.message;

    if (!(await isGroupAdmin(env, message.chat.id, message.from.id))) {
        return;
    }
    
    const reply = message.reply_to_message;

    if (!reply) {

        return await sendMessage(
            env,
            message.chat.id,
            `<tg-emoji emoji-id="5990170559650991836">⬅️</tg-emoji> <b>Reply to a user's message to use <code>/restrict</code>.</b>`,
            {
                parse_mode: "HTML"
            }
        );

    }

    const target = reply.from;

    const reason = "Np reason provided.";

    await restrictChatMember(
        env,
        message.chat.id,
        target.id
    );
    
    await deleteMessage(
        env,
        message.chat.id,
        message.message_id
    );

    return await sendMessage(
        env,
        message.chat.id,
        `🔒 <b>User Restricted</b>

<tg-emoji emoji-id='5258011929993026890'>👤</tg-emoji>  <b>User:</b> ${target.username
                                                                        ? `@${target.username}`
                                                                        : target.first_name}
<tg-emoji emoji-id='5370546867786523009'>📝</tg-emoji>  <b>Reason:</b> <i> Reason is not defined</i>

<tg-emoji emoji-id='5258503720928288433'>ℹ️</tg-emoji>  This user has been restricted indefinitely.`,
        {
            parse_mode: "HTML",
            reply_to_message_id: reply.message_id
        }
    );

}