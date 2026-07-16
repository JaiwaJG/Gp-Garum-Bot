import { answerCallbackQuery } from "../telegram";
import { copyCallback } from "../callbacks/copy.js";

export async function handleCallback(query, env) {
    const data = query.data;

    switch (data) {

        case "copy":
            await answerCallbackQuery(
                env,
                query.id
            );

            return await copyCallback(
                query,
                env
            );

        default:
            return;

    }
}