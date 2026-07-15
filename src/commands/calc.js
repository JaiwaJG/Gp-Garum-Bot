import { isGroupAdmin } from "../permissions/groupAdmin";
import { sendMesage } from "../telegram.js";

export async function calcCommand(update) {

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