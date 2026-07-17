export async function getWarnCount(env, chatId, userId) {

    const key = `warn:${chatId}:${userId}`;

    const value = await env.MODERATION_DB.get(key);

    return value ? Number(value) : 0;

}

export async function setWarnCount(env, chatId, userId, count) {

    const key = `warn:${chatId}:${userId}`;

    await env.MODERATION_DB.put(
        key,
        String(count)
    );

}

export async function getWarnData(env, chatId, userId) {

    const key = `warn:${chatId}:${userId}`;

    const value = await env.MODERATION_DB.get(key);

    if (!value) {

        return {
            count: 0,
            history: []
        };

    }

    return JSON.parse(value);

}

export async function setWarnData(env, chatId, userId, data) {

    const key = `warn:${chatId}:${userId}`;

    await env.MODERATION_DB.put(
        key,
        JSON.stringify(data)
    );

}