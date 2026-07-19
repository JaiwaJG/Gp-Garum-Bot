import { isGroupAdmin } from "../../permissions/groupAdmin.js";
import { deleteMessage, sendMessage } from "../../telegram.js";
import {
    getWarnCount,
    setWarnCount,
    getWarnData
} from "../../respositories/warnRepository.js";
import { restrictChatMember } from "../../telegram.js";

export async function warnCommand(update, env) {

    const message = update.message;

    const text = message.text.trim();

    const parts = text.split(" ");

    const reason =
        parts.length > 1
            ? parts.slice(1).join(" ")
            : "No reason provided.";

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
            `<tg-emoji emoji-id="6208506738266610545">⚠️</tg-emoji> <b>Only group admins can use this command.</b>`,
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

    if (newWarnCount >= 3) {

        const untilDate =
            Math.floor(Date.now() / 1000) + (60 * 60 * 24);

        await restrictChatMember(
            env,
            message.chat.id,
            target.id,
            untilDate
        );

        await setWarnCount(
            env,
            message.chat.id,
            target.id,
            0
        );

        await deleteMessage(
            env,
            message.chat.id,
            message.message_id
        );

        return await sendMessage(
            env,
            message.chat.id,
            `<tg-emoji emoji-id='5258267368877989660'>🔇</tg-emoji>  <b>User Automatically Restricted</b>

            <tg-emoji emoji-id="5215677343594457295">⚠️</tg-emoji>  <b>Triggered after reaching 3 warnings.</b>

<tg-emoji emoji-id='5258011929993026890'>👤</tg-emoji>  <b>User:</b> ${targetName}
<tg-emoji emoji-id='5370546867786523009'>📝</tg-emoji>  <b>Reason:</b> <i> ${reason}</i>

<tg-emoji emoji-id='5451732530048802485'>⏳</tg-emoji>  <b>Duration:</b> 24 Hours`,
            {
                parse_mode: "HTML",
                reply_to_message_id: reply.message_id
            }
        );

    }

    return await sendMessage(
        env,
        message.chat.id,
        `<tg-emoji emoji-id="5215677343594457295">⚠️</tg-emoji>   <b>Warning Issued</b>

<tg-emoji emoji-id='5258011929993026890'>👤</tg-emoji>  <b>User:</b> ${targetName}
<tg-emoji emoji-id='5258420634785947640'>🔄</tg-emoji>  <b>Warnings:</b> ${newWarnCount} <b>of</b>3
<tg-emoji emoji-id='5370546867786523009'>📝</tg-emoji>  <b>Reason:</b> <i> ${reason}</i>

<blockquote><tg-emoji emoji-id='5258503720928288433'>ℹ️</tg-emoji>  <b>Notice:</b> This user will be automatically restricted for <b>24 hours</b> after receiving <b>3 warnings</b>.</blockquote>`,
        {
            parse_mode: "HTML",
            reply_to_message_id: reply.message_id
        }
    );

}