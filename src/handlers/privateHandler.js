import { handleStart } from "../commands/private/start.js";
import { handleUsage } from "../commands/private/usage.js";

export async function handlePrivate(update, env) {

    const text = (update.message.text || "").trim();

    switch (text) {

        case "/start":
            return await handleStart(update, env);

        case "/usage":
            return await handleUsage(update, env);

        default:
            return;

    }

}