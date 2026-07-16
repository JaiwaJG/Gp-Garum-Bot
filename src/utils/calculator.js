export function calculate(expression) {

    expression = (expression || "").replace(/\s+/g, "");

    if (!/^[0-9+\-*/().]+$/.test(expression)) {
        return null;
    }

    const values = [];
    const ops = [];

    const precedence = (op) => {
        if (op === "+" || op === "-") return 1;
        if (op === "*" || op === "/") return 2;
        return 0;
    };

    const apply = () => {

        if (values.length < 2 || ops.length === 0) {
            throw new Error();
        }

        const b = values.pop();
        const a = values.pop();
        const op = ops.pop();

        switch (op) {

            case "+":
                values.push(a + b);
                break;

            case "-":
                values.push(a - b);
                break;

            case "*":
                values.push(a * b);
                break;

            case "/":
                if (b === 0) return null;
                values.push(a / b);
                break;

        }

    };

    try {

        let i = 0;

        while (i < expression.length) {

            const ch = expression[i];

            if (/\d/.test(ch)) {

                let num = "";

                while (
                    i < expression.length &&
                    /[\d.]/.test(expression[i])
                ) {
                    num += expression[i++];
                }

                values.push(Number(num));
                continue;

            }

            if (ch === "(") {
                ops.push(ch);
            }

            else if (ch === ")") {

                while (
                    ops.length &&
                    ops[ops.length - 1] !== "("
                ) {
                    apply();
                }

                ops.pop();

            }

            else {

                while (
                    ops.length &&
                    precedence(ops[ops.length - 1]) >= precedence(ch)
                ) {
                    apply();
                }

                ops.push(ch);

            }

            i++;

        }

        while (ops.length) {
            apply();
        }

        if (
            values.length !== 1 ||
            !Number.isFinite(values[0])
        ) {
            return null;
        }

        return values[0];

    } catch {

        return null;

    }

}