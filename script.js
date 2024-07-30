const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const negate = (a) => a - (a * 2);

function operate(operator, left, right) {
    switch (operator) {
        case '+':
            return add(left, right);
        case '-':
            return subtract(left, right);
        case '*':
            return multiply(left, right);
        case '/':
            return divide(left, right);
        default:
            return 'Woops!';
    }
}

function formatResult(result) {
    let resultStr = result.toString();

    if (resultStr.length > 11) {
        if (Math.abs(result) >= 1e11 || Math.abs(result) < 1e-10) {
            resultStr = result.toExponential(5);
        } else {
            let precision = 10 - Math.floor(Math.log10(Math.abs(result))) - 1;
            resultStr = result.toFixed(precision);

            if (resultStr.length > 11) {
                resultStr = result.toExponential(6);
            }
        }
    }

    return resultStr;
}

function reset() {
    operator = null;
    left = 0;
    right = 0;
    finalValue = 0;
    startOfLeftNumber = true;
    startOfRightNumber = false;
    workingOnLeftNumber = true;
    display.textContent = '0';
}

function leftNumberHasStarted() {
    startOfLeftNumber = false;
}

function hasLeftNumberStarted() {
    if(startOfLeftNumber === false && workingOnLeftNumber === true) {
        return true;
    } else {
        return false;
    }
}

function afterEqual() {
    operator = null;
    left = parseInt(display.textContent);
    right = 0;
    finalValue = 0;
    startOfLeftNumber = false;
    startOfRightNumber = true;
    workingOnLeftNumber = true;
}

let operator, left, right, finalValue, startOfLeftNumber, startOfRightNumber, workingOnLeftNumber;

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.num');
const operandButtons = document.querySelectorAll('.operand');
const negateButton = document.querySelector('.negate');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');

reset();

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (startOfLeftNumber === true) {
            display.textContent = e.target.textContent;
            left = parseInt(display.textContent);
            leftNumberHasStarted();
        } else if (hasLeftNumberStarted()) {
            display.textContent = display.textContent + '' + e.target.textContent;
            left = parseInt(display.textContent);
        } else if (startOfRightNumber === true && workingOnLeftNumber === false) {
            display.textContent = e.target.textContent;
            right = parseInt(display.textContent);
            startOfRightNumber = false;
        } else if (startOfRightNumber === false && workingOnLeftNumber === false) {
            display.textContent = display.textContent + '' + e.target.textContent;
            right = parseInt(display.textContent);
        }
    });
});

operandButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (workingOnLeftNumber === true) {
            operator = e.target.textContent;
            workingOnLeftNumber = false;
            startOfRightNumber = true;
        } else if (workingOnLeftNumber === false) {
            let tempFinalValue = operate(operator, left, right);
            left = tempFinalValue;
            display.textContent = left;
            right = 0;
            startOfRightNumber = true;
            workingOnLeftNumber = false;
            operator = e.target.textContent;
        }
    });
});

negateButton.addEventListener("click", () => {
    if (workingOnLeftNumber === true) {
        let tempLeftValue = negate(left);
        left = tempLeftValue;
        display.textContent = left;
    } else if (workingOnLeftNumber === false) {
        let tempRightValue = negate(right);
        right = tempRightValue;
        display.textContent = right;
    }
});

equalButton.addEventListener("click", () => {
    finalValue = operate(operator, left, right);
    display.textContent = formatResult(finalValue);
    afterEqual();
});

clearButton.addEventListener("click", () => {
    reset();
});