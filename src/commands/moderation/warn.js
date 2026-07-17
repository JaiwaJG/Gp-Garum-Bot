import { isGroupAdmin } from "../../permissions/groupAdmin.js";
import { sendMessage } from "../../telegram.js";
import {
    getWarnCount,
    setWarnCount
} from "../../respositories/warnRepository.js";

export async function warnCommand(update, env) {

    const message = update.message;
    const reply = message.reply_to_message;

    if (!reply) {

        return await sendMessage(
            env,
            message.chat.id,
            `<tg-emoji emoji-id="5990170559650991836">⬅️</tg-emoji> <b>Reply to a user's message to use <code>/warn</code>.</b>`,
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

    const warnCount =
        await getWarnCount(
            env,
            message.chat.id,
            target.id
        );

    const newWarnCount = warnCount + 1;

    await setWarnCount(
        env,
        message.chat.id,
        target.id,
        newWarnCount
    );

    const targetName =
        target.username
            ? `@${target.username}`
            : target.first_name;

    return await sendMessage(
        env,
        message.chat.id,
        `<tg-emoji emoji-id="5215677343594457295"></tg-emoji>   <b>Warning Issued</b>

<tg-emoji emoji-id='5258011929993026890'>👤</tg-emoji>  <b>User:</b> ${targetName}
<tg-emoji emoji-id='5258420634785947640'>🔄</tg-emoji>  <b>Warnings:</b> ${newWarnCount}/3
<tg-emoji emoji-id='5258503720928288433'>ℹ️</tg-emoji>  <b>Reason:</b> <i>No reason provided.</i>`,
        {
            parse_mode: "HTML"
        }
    );

}