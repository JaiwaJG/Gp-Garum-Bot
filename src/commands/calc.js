import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { sendMessage } from "../telegram.js";

export async function calcCommand(update, env) {

    const message = update.message;
    const isAdmin = await isGroupAdmin(
        env,
        message.chat.id,
        message.from.id
    );

    if (!isAdmin) return;

    if (!message.reply_to_message) return;

    const gameId = message.reply_to_message.text?.trim();

    await sendMessage(
        env,
        message.chat.id,
        `<b>${gameId}</b>`
    );

    return;

}