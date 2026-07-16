export function calculate(expression) {

    expression = (expression || "").replace(/\s+/g, "");

    if (!/^[0-9+\-*/.]+$/.test(expression)) {
        return null;
    }

    const match = expression.match(
        /^(-?\d+(?:\.\d+)?)([+\-*/])(-?\d+(?:\.\d+)?)$/
    );

    if (!match) {
        return null;
    }

    const a = Number(match[1]);
    const op = match[2];
    const b = Number(match[3]);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return null;
    }

    switch (op) {

        case "+":
            return a + b;

        case "-":
            return a - b;

        case "*":
            return a * b;

        case "/":
            if (b === 0) {
                return null;
            }
            return a / b;

        default:
            return null;

    }

}