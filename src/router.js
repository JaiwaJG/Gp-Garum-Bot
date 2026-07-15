import { handlePrivate } from "./handlers/privateHandler.js";
import { handleGroup } from "./handlers/groupHandler.js";

export async function handleRouter(update, env) {
  if (!update.message) return;

  const message = update.message;
  const chatType = message.chat.type;
  const text = (message.text ?? "").trim();

  // Private Chat Only
  if (chatType === "private") {
    return await handlePrivate(update, env);
  }

  // Group Chat Only
  if (chatType === "group" || chatType === "supergroup") {
    return await handleGroup(update, env);
  }
}