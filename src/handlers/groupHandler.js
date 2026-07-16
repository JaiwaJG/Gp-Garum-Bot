import { calcCommand } from "../commands/calc.js";
import { parseGameId } from "../parser.js";
import { sendMessage } from "../telegram.js";
import { gameIdKeyboard } from "../keyboards/gameId.js";
import { calcSessions } from "../database.js";
import { calculate } from "../utils/calculator.js";

export async function handleGroup(update, env) {

    const text = (update.message.text || "").trim();

    const session = calcSessions.get(update.message.from.id);

    if (
        session &&
        !text.startsWith("/")
    ) {

        if (!/^[0-9+\-*/().\s]+$/.test(text)) {
            return;
        }

        const result = calculate(text);

        if (result === null) {
            return;
        }

        await sendMessage(
            env,
            update.message.chat.id,
            <code>${text} = ${result} Ks</code>,
            {
                parse_mode: "HTML",
                reply_parameters: {
                    message_id: update.message.message_id
                }
            }
        );

        calcSessions.delete(
            update.message.from.id
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
                parse_mode: "HTML",
                reply_parameters: {
                    message_id: update.message.message_id
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

    switch (text.split(" ")[0].toLowerCase()) {

        case "/calc":
            return await calcCommand(update, env);

        default:
            return;

    }

}