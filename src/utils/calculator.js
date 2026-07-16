export function calculate(expression) {

    try {

        const result = Function(
            `"use strict"; return (${expression})`
        )();

        if (!Number.isFinite(result)) {
            return null;
        }

        return result;

    } catch {

        return null;

    }

}