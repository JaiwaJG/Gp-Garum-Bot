import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { sendMessage } from "../telegram.js";
import { calcSessions } from "../database.js";

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

    calcSessions.set(
        message.from.id,
        true
    );

    await sendMessage(
        env,
        message.chat.id,
        "<b>🧮 Calculator Mode ON</b>",
        {
            parse_mode: "HTML",
            reply_parameters: {
                message_id: message.message_id
            }
        }
    );

}