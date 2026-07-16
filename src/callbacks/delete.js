import { isGroupAdmin } from "../permissions/groupAdmin.js";
import {
    answerCallbackQuery,
    deleteMessage
} from "../telegram.js";

export async function deleteCallback(query, env) {

    const isAdmin = await isGroupAdmin(
        env,
        query.message.chat.id,
        query.from.id
    );

    if (!isAdmin) {

        return await answerCallbackQuery(
            env,
            query.id,
            "❌ Admin ni sha message hpe Delete lu na!",
            true
        );

    }

    return await deleteMessage(
        env,
        query.message.chat.id,
        query.message.message_id
    );

}