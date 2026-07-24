import { sendMessage } from "../../telegram.js";

export async function handleUsage(update, env) {

    const chatId = update.message.chat.id;

    await sendMessage(
        env,
        chatId,
`<tg-emoji emoji-id='5258328383183396223'>📖</tg-emoji> GP Garum Bot Usage

<tg-emoji emoji-id='5258513401784573443'>👥</tg-emoji>  Group Features

• Send Game ID
<tg-emoji emoji-id='5260450573768990626'>➡️</tg-emoji>  Bot shows:

<tg-emoji emoji-id='5458668249396827657'>🎅</tg-emoji>  Copy
<tg-emoji emoji-id='6208506738266610545'>🗑</tg-emoji>  Delete

<tg-emoji emoji-id='6059615271679696088'>✅</tg-emoji>  Admin Commands

Welcome! Here are the available commands.

━━━━━━━━━━━━━━

<tg-emoji emoji-id='5190741648237161191'>🧮</tg-emoji>  <b>/calc</b>
Enable Calculator Mode.

<b>How to use:</b>
• Reply to a Game ID message.
• Type <code>/calc</code>.
• Send an expression like:
<code>5*5200</code>

━━━━━━━━━━━━━━

<tg-emoji emoji-id="5215677343594457295">⚠️</tg-emoji>  <b>/warn</b>
Warn a user.

<b>How to use:</b>
Reply to the user's message:
<code>/warn Spam</code>

━━━━━━━━━━━━━━

<tg-emoji emoji-id='5258476306152038031'>🔒</tg-emoji>  <b>/restrict</b>
Restrict a user permanently.

<b>How to use:</b>
Reply to the user's message:
<code>/restrict</code>

━━━━━━━━━━━━━━

<tg-emoji emoji-id='6091190140368071716'>🚫</tg-emoji>  <b>/ban</b>
Ban a user permanently.

<b>How to use:</b>
Reply to the user's message:
<code>/ban</code>

━━━━━━━━━━━━━━

<tg-emoji emoji-id='5258503720928288433'>ℹ️</tg-emoji> <b>/info</b>
User infomation.

<b>How to use:</b>
Reply to the user's message:
<code>/info</code>

━━━━━━━━━━━━━━

<tg-emoji emoji-id='5258503720928288433'>ℹ️</tg-emoji>  <b>Notes</b>

• GP Garum Bot must access admin permision at bot to use admin command.
• Most moderation commands must be used by replying to a user's message.
• Only group administrators can use moderation commands.
• Private chat only supports:
/start
/usage`,
{
    parse_mode: "HTML"
}
    );

}