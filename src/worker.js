import { handleRouter } from "./router.js";
import { handleCallback } from "./handlers/callbackHandler.js";

export default {

    async fetch(request, env) {

        if (request.method !== "POST") {
            return new Response("GP Garum Bot");

        }

        const update = await request.json();
        if (update.callback_query) {
            await handleCallback(update.callback_query, env);
            return new Response("OK");
        }
        await handleRouter(update, env);
        return new Response("OK");

    }

};