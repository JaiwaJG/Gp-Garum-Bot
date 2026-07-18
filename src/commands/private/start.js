import { sendMessage } from "../../telegram.js";

export async function handleStart(update, env) {

    const chatId = update.message.chat.id;

    const firstName = update.message.from.first_name;

    await sendMessage(
        env,
        chatId,
`Hello, <b>${firstName}</b> <tg-emoji emoji-id='6059615271679696088'>✅</tg-emoji>

Welcome to <b>GP Garum Bot</b>.<tg-emoji emoji-id='5458668249396827657'>🎅</tg-emoji>

Use /usage to learn how to use this bot.`,
        {
            parse_mode: "HTML"
        }
    );

}