import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { sendMessage } from "../telegram.js";

export async function calcCommand(update, env) {

    const message = update.message;
    const isAdmin = await isGroupAdmin(
        message.chat.id,
        message.from.id
    );

    if (!isAdmin) return;

    await sendMessage(
        env,
        message.chat.id,
        "<b> Calc Command </b>"
    );

    return;

}