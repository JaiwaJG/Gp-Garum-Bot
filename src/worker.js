import { handleRouter } from "./router.js";

export default {

    async fetch(request, env) {

        if (request.method !== "POST") {

            return new Response("GP Garum Bot");

        }

        const update = await request.json();

        await handleRouter(update, env);

        return new Response("OK");

    }

};