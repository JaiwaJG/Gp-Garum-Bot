import { answerCallbackQuery } from "../telegram.js";

export async function copyCallback(query, env) {

    return await answerCallbackQuery(
        env,
        query.id,
        query.message.text
    );

}