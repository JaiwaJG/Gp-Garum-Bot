import { isGroupAdmin } from "../../permissions/groupAdmin.js";
import { sendMessage } from "../../telegram.js";

export async function warnCommand(update, env) {

    const message = update.message;
    const reply = message.reply_to_message;

    if (!reply) {

        return await sendMessage(
            env,
            message.chat.id,
            `<tg-emoji emoji-id="6309581148536183273">⬅️</tg-emoji> <b>Reply to a user's message to use <code>/warn</code>.</b>`,
            {
                parse_mode: "HTML"
            }
        );

    }

    const isAdmin = await isGroupAdmin(
        env,
        message.chat.id,
        message.from.id
    );

    if (!isAdmin) {

        return await sendMessage(
            env,
            message.chat.id,
            `<tg-emoji emoji-id="6208506738266610545"></tg-emoji> <b>Only group admins can use this command.</b>`,
            {
                parse_mode: "HTML"
            }
        );

    }

    const target = reply.from;

    const targetName =
        target.username
            ? `@${target.username}`
            : target.first_name;

    return await sendMessage(
        env,
        message.chat.id,
        `<tg-emoji emoji-id="5215677343594457295"></tg-emoji> <b>Warning Issued</b>

<b>User:</b> ${targetName}
<b>Reason:</b> <i>No reason provided.</i>`,
        {
            parse_mode: "HTML"
        }
    );

}