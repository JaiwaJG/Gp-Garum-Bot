export async function callTelegram(
    env,
    method,
    data
) {
    const API = `https://api.telegram.org/bot${env.BOT_TOKEN}`;

    const res = await fetch(
        `${API}/${method}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return await res.json();

}

export async function sendMessage(
    env,
    chatId,
    text,
    options = {}
) {

    return callTelegram(
        env,
        "sendMessage",
        {
            chat_id: chatId,
            text,
            ...options
        }
    );

}

export async function answerCallbackQuery(
    callbackId,
    text = "",
    alert = false
) {

    return callTelegram(
        "answerCallbackQuery",
        {
            callback_query_id: callbackId,
            text,
            show_alert: alert
        }
    );

}

export async function deleteMessage(
    chatId,
    messageId
) {

    return callTelegram(
        "deleteMessage",
        {
            chat_id: chatId,
            message_id: messageId
        }
    );

}

export async function editMessageText(
    chatId,
    messageId,
    text,
    options = {}
) {

    return callTelegram(
        "editMessageText",
        {
            chat_id: chatId,
            message_id: messageId,
            text,
            ...options
        }
    );

}

export async function getChatMember(
    chatId,
    userId
) {

    return callTelegram(
        "getChatMember",
        {
            chat_id: chatId,
            user_id: userId
        }
    );

}

export async function pinChatMessage(
    chatId,
    messageId
) {

    return callTelegram(
        "pinChatMessage",
        {
            chat_id: chatId,
            message_id: messageId
        }
    );

}