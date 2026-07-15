import { getChatMember } from "../telegram.js";

export async function isGroupAdmin(
    env,
    chatId,
    userId
) {

    const result = await getChatMember(
        env,
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