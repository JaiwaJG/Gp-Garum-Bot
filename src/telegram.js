import { PRIVATE_MENU, GROUP_MENU } from "./commands/manifest.js";

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
            parse_mode: "HTML",
            ...options
        }
    );

}

export async function answerCallbackQuery(
    env,
    callbackId,
    text = "",
    alert = false
) {

    return callTelegram(
        env,
        "answerCallbackQuery",
        {
            callback_query_id: callbackId,
            text,
            show_alert: alert
        }
    );

}

export async function deleteMessage(
    env,
    chatId,
    messageId
) {

    return callTelegram(
        env,
        "deleteMessage",
        {
            chat_id: chatId,
            message_id: messageId
        }
    );

}

export async function editMessageText(
    env,
    chatId,
    messageId,
    text,
    options = {}
) {

    return callTelegram(
        env,
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
    env,
    chatId,
    userId
) {

    return callTelegram(
        env,
        "getChatMember",
        {
            chat_id: chatId,
            user_id: userId
        }
    );

}

export async function pinChatMessage(
    env,
    chatId,
    messageId
) {

    return callTelegram(
        env,
        "pinChatMessage",
        {
            chat_id: chatId,
            message_id: messageId
        }
    );

}

export async function banChatMember(
    env,
    chatId,
    userId
) {
    return callTelegram(
        env,
        "banChatMember",
        {
            chat_id: chatId,
            user_id: userId
        }
    );
}

export async function setMyCommands(
    env,
    commands,
    scope = null
) {

    const data = {
        commands
    };

    if (scope) {
        data.scope = scope;
    }

    return callTelegram(
        env,
        "setMyCommands",
        data
    );

}

export async function syncCommands(env) {

    await setMyCommands(
        env,
        PRIVATE_MENU
    );

    await setMyCommands(
        env,
        GROUP_MENU,
        {
            type: "all_group_chats"
        }
    );

}

export async function restrictChatMember(
    env,
    chatId,
    userId,
    untilDate
) {

    return await callTelegram(
        env,
        "restrictChatMember",
        {
            chat_id: chatId,
            user_id: userId,

            permissions: {
                can_send_messages: false,
                can_send_audios: false,
                can_send_documents: false,
                can_send_photos: false,
                can_send_videos: false,
                can_send_video_notes: false,
                can_send_voice_notes: false,
                can_send_polls: false,
                can_send_other_messages: false,
                can_add_web_page_previews: false,
                can_change_info: false,
                can_invite_users: false,
                can_pin_messages: false
            },

            until_date: untilDate
        }
    );

}