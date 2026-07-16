export function calculate(expression) {

    try {

        expression = expression.replace(/\s+/g, "");

        if (!/^[0-9+\-*/().]+$/.test(expression)) {
            return null;
        }

        const result = Function(
            "return (" + expression + ")"
        )();

        if (!Number.isFinite(result)) {
            return null;
        }

        return result;

    } catch {

        return null;

    }

}