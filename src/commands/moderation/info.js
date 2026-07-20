import { isGroupAdmin } from "../../permissions/groupAdmin.js";
import { sendMessage } from "../../telegram.js";

export async function infoCommand(update, env) {

    const message = update.message;

    if (!(await isGroupAdmin(env, message.chat.id, message.from.id))) {
        return;
    }

    const reply = message.reply_to_message;

    if (!reply) {
        return await sendMessage(
            env,
            message.chat.id,
            `<tg-emoji emoji-id="5990170559650991836">⬅️</tg-emoji> <b>Reply to a user's message to use <code>/info</code>.</b>`,
            {
                parse_mode: "HTML"
            }
        );
    }

    const target = reply.from;

    const targetName = target.username
        ? `@${target.username}`
        : target.first_name;

    return await sendMessage(
        env,
        message.chat.id,
        `👤 <b>User Information</b>

    🆔 <b>ID:</b> <code>${target.id}</code>

    👤 <b>Name:</b> ${target.first_name}

    🔗 <b>Username:</b> ${targetName}`,
        {
            parse_mode: "HTML",
            reply_to_message_id: reply.message_id
        }
    );

}