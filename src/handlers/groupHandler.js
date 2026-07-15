import { isGroupAdmin } from "../permissions/groupAdmin.js";
export async function handleGroup(update) {

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

        default:
            return;

    }

}