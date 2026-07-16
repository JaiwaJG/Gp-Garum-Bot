

export function calculate(expression) {

    console.log("CALC INPUT:", expression);

    try {

        expression = expression.replace(/\s+/g, "");

        console.log("CALC CLEAN:", expression);

        if (!/^[0-9+\-*/().]+$/.test(expression)) {
            console.log("REGEX FAILED");
            return null;
        }

        const result = Function(
            "return (" + expression + ")"
        )();

        console.log("RESULT:", result);

        if (!Number.isFinite(result)) {
            return null;
        }

        return result;

    } catch (e) {

        console.log("CALC ERROR:", e);

        return null;

    }

}