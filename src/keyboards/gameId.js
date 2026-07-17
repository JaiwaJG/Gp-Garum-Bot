export function gameIdKeyboard(gameId) {
  return {
    inline_keyboard: [
      [
        {
          text: "Copy",
          copy_text: {
            text: gameId
          },
          style: "primary",
          icon_custom_emoji_id: "5458668249396827657"
        },
        {
          text: "Delete",
          callback_data: "delete",
          style: "danger"
          // icon_custom_emoji_id: "YOUR_EMOJI_ID"
        }
      ]
    ]
  };
}