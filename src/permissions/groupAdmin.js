import { getChatMember } from "../telegram.js";

export async function isGroupAdmin(
    chatId,
    userId
) {

    const result = await getChatMember(
        chatId,
        userId
    );

    if (!result.ok) {
        return false;
    }

    const status = result.result.status;

    return (
        status === "creator" ||
        status === "administrator"
    );

}