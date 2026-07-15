import { answerCallbackQuery } from "../telegram";

export async function handleCallback(query, env) {
    const data = query.data;

    switch (data) {

        case "copy":

            await answerCallbackQuery(
                env,
                query.id
            );
            return;

        default:
            return;

    }
}