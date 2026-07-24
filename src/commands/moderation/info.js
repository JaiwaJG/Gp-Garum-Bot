import { isGroupAdmin } from "../../permissions/groupAdmin.js";
import { sendMessage, deleteMessage } from "../../telegram.js";

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

    const language = target.language_code || "Unknown";

    const targetName = target.username
        ? `@${target.username}`
        : target.first_name;

    const mention = `<a href="tg://user?id=${target.id}">${target.first_name}</a>`;

    await deleteMessage(
        env,
        message.chat.id,
        message.message_id
    );

    return await sendMessage(
        env,
        message.chat.id,
`<tg-emoji emoji-id='5258503720928288433'>ℹ️</tg-emoji>  <b>USER INFORMATION</b>

━━━━━━━━━━━━━━

🆔 <b>User ID</b>
<code>${target.id}</code>

👤 <b>Full Name</b>
${mention}

🏷 <b>Username</b>
${target.username ? `@${target.username}` : "No Username"}

<tg-emoji emoji-id='6057351540446863374'>🤖</tg-emoji>  <b>Bot Account</b>
${target.is_bot ? "Yes" : "No"}

<tg-emoji emoji-id='6219704503986293418'>🌐</tg-emoji>  <b>Language</b>
<code>${language}</code>

⭐ <b>Telegram Premium</b>
${target.is_premium ? "✅ Yes" : "❌ No"}


━━━━━━━━━━━━━━`,
        {
            parse_mode: "HTML",
            reply_to_message_id: reply.message_id
        }
    );

}