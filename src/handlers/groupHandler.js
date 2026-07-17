import { parseGameId } from "../parser.js";
import { sendMessage } from "../telegram.js";
import { gameIdKeyboard } from "../keyboards/gameId.js";
import { calculate } from "../utils/calculator.js";
import { GROUP_COMMANDS } from "../commands/registry.js";

export async function handleGroup(update, env) {

    const message = update.message;

    const text = (message.text || "").trim();

    const session = await env.CALC_SESSION.get(
        String(message.from.id)
    );

    if (
        session === "on" &&
        !text.startsWith("/")
    ) {

        if (!/^[0-9+\-*/().\s]+$/.test(text)) {
           return;
        }

        const result = calculate(text);

        if (result === null) {
            return;
        }

        const formatted = result.toLocaleString("en-US");

        await sendMessage(
            env,
            message.chat.id,
            `<b>${text} = ${formatted} Ks</b>`,
            {
                parse_mode: "HTML",
                reply_parameters: {
                    message_id: message.message_id
                }
            }
        );

        await env.CALC_SESSION.delete(
            String(message.from.id)
        );

        return;

    }

    const parsed = parseGameId(text);

    if (parsed) {

        const gameId = parsed.gameId;
        const extra = parsed.extra;

        const display = extra
            ? `${gameId} (${extra})`
            : gameId;

        await sendMessage(
            env,
            message.chat.id,
`<tg-emoji emoji-id='5458668249396827657'>🎅</tg-emoji> <code>${gameId}</code>`,
            {
                parse_mode: "HTML",
                reply_parameters: {
                    message_id: message.message_id
                },
                reply_markup: gameIdKeyboard(gameId)
            }
        );

        return;

    }

    if (
        text === "/start" ||
        text === "/usage"
    ) {
        return;
    }

    if (!text.startsWith("/")) {
        return;
    }

    const command = text.split(" ")[0].slice(1).toLowerCase();

    const handler = GROUP_COMMANDS[command];

    if (handler) {
        return await handler(update, env);
    }

    return;

}