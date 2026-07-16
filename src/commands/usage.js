import { sendMessage } from "../telegram.js";

export async function handleUsage(update, env) {

    const chatId = update.message.chat.id;

    await sendMessage(
        env,
        chatId,
`📖 GP Garum Bot Usage

👥 Group Features

• Send Game ID
→ Bot shows:
📋 Copy
🗑 Delete

👮 Admin Commands

/calc
/payment
/setpayment
/complete
/pin
/scam
/ban
/restrict

ℹ️ Only Group Admins can use admin commands.`,
{
    parse_mode: "HTML"
}
    );

}