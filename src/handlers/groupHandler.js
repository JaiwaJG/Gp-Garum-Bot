import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { calcCommand } from "../commands/calc.js";

export async function handleGroup(update, env) {

    const text = (update.message.text || "").trim();
    if (
        text === "/start" ||
        text === "/usage"
    ) {
        return;
    }

    if (!text.startsWith("/")) {
    return;
    }

    console.log("GROUP:", text);

    switch (text.split(" ")[0].toLowerCase()) {

        case "/calc":
            return await calcCommand(update, env);

        default:
            return;

    }

}