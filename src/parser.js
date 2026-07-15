export function parseGameId(text) {

    if (!text) {
        return null;
    }

    const value = text.trim();

    if (!/^\d+$/.test(value)) {
        return null;
    }

    return value;

}