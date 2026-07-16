import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { sendMessage } from "../telegram.js";

export async function calcCommand(update, env) {

    const message = update.message;

    const isAdmin = await isGroupAdmin(
        env,
        message.chat.id,
        message.from.id
    );

    if (!isAdmin) {
        return;
    }

    await env.CALC_SESSION.put(
        String(message.from.id),
        "on",
        {
            expirationTtl: 60
        }
    );

    await sendMessage(
        env,
        message.chat.id,
        //"<b>🧮 Calculator Mode ON</b>",
        "<tg-emoji emoji-id='5190741648237161191'>🧮</tg-emoji>\n<b>Calculator Mode ON</b>",
        {
            parse_mode: "HTML",
            reply_parameters: {
                message_id: message.message_id
            }
        }
    );

}