export function calculate(expression) {

    try {

        const result = Function(
            `"use strict"; return (${expression})`
        )();

        return result;

    } catch {

        return null;

    }

}