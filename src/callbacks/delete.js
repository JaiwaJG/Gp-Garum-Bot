import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { answerCallbackQuery, deleteMessage } from "../telegram.js";

export async function deleteCallback(query, env) {

    const isAdmin = await isGroupAdmin(
        query.message.chat.id,
        query.from.id,
        env
    );

    if (!isAdmin) {

        return await answerCallbackQuery(
            env,
            query.id,
            "❌ Admin ni sha message hpe Delete lu na!",
            true
        );

    }

}