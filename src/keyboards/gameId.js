export function gameIdKeyboard() {

    return {
        inline_keyboard: [
            [
                {
                    text: "📋 Copy",
                    callback_data: "copy"
                },
            
                {
                    text: "🗑 Delete",
                    callback_data: "delete"
                }
            ]
        ]
    };

}