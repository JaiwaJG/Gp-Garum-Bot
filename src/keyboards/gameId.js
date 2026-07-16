export function gameIdKeyboard(gameId) {

    return {
        inline_keyboard: [
            [
                {
                    text: "📋 Copy",
                    copy_text: {
                        text: gameId
                    }
                },
            
                {
                    text: "🗑 Delete",
                    callback_data: "delete"
                }
            ]
        ]
    };

}