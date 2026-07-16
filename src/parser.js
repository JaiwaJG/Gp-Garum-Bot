export function parseGameId(text) {

    if (!text) {
        return null;
    }

    const match = text.match(
        /\b(\d{5,})\b(?:\s*\(\d+\))?/
    );

    if (!match) {
        return null;
    }

    return match[1];

}