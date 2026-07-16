import { isGroupAdmin } from "../permissions/groupAdmin.js";
import { calcCommand } from "../commands/calc.js";
import { parseGameId } from "../parser.js";
import { sendMessage } from "../telegram.js";
import { gameIdKeyboard } from "../keyboards/gameId.js";
import { calcSessions } from "../database.js";
import { calculate } from "../utils/calculator.js";

export async function handleGroup(update, env) {

    const text = (update.message.text || "").trim();

    const session = calcSessions.get(update.message.from.id);

    if (session) {

        const result = eval(text);

        await sendMessage(
            env,
            update.message.chat.id,
            `<code>${text} = ${result} Ks</code>`,
            {
                parse_mode: "HTML",
                reply_parameters: {
                    message_id: session.replyMessageId
                }
            }
        );

        return;

    }

    const gameId = parseGameId(text);

    if (gameId) {
        await sendMessage(
            env,
            update.message.chat.id,
            gameId,
            {
                reply_parameters: {
                    message_id: update.message.message_id
                },
                parse_mode: "HTML",
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

    console.log("GROUP:", text);

    switch (text.split(" ")[0].toLowerCase()) {

        case "/calc":
            return await calcCommand(update, env);

        default:
            return;

    }

}