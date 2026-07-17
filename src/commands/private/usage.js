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

/calc
/payment
/setpayment
/complete
/pin
/scam
/ban
/mute

<tg-emoji emoji-id='5258503720928288433'>ℹ️</tg-emoji>  Only Group Admins can use admin commands.`,
{
    parse_mode: "HTML"
}
    );

}