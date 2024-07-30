const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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
            return 'not a symbol';
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
    operator = '';
    left = 0;
    right = 0;
    displayInt = 0;
    startOfLeftNumber = true;
    startOfRightNumber = false;
    workingOnLeftNumber = true;
    finalValue = 0;
    display.textContent = '0';
}

let operator = '', left = 0, right = 0, displayInt = 0;
let startOfLeftNumber = true;
let startOfRightNumber = false;
let workingOnLeftNumber = true;
let finalValue = 0;

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.num');
const operandButtons = document.querySelectorAll('.operand');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');

reset();

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (startOfLeftNumber === true) {
            display.textContent = e.target.textContent;
            left = parseInt(display.textContent);
            startOfLeftNumber = false;
            //console.log(`${typeof(left)} ${left}`);
        } else if (startOfLeftNumber === false && workingOnLeftNumber === true) {
            display.textContent = display.textContent + '' + e.target.textContent;
            left = parseInt(display.textContent);
            //console.log(`${typeof(left)} ${left}`);
        } else if (startOfRightNumber === true && workingOnLeftNumber === false) {
            display.textContent = e.target.textContent;
            right = parseInt(display.textContent);
            startOfRightNumber = false;
            //console.log(`${typeof(right)} ${right}`);
        } else if (startOfRightNumber === false && workingOnLeftNumber === false) {
            display.textContent = display.textContent + '' + e.target.textContent;
            right = parseInt(display.textContent);
            //console.log(`${typeof(right)} ${right}`);
        }
    });
});

operandButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (workingOnLeftNumber === true) {
            operator = e.target.textContent;
            workingOnLeftNumber = false;
            startOfRightNumber = true;
            //console.log(`${typeof(operator)} ${operator}`);
        } else if (workingOnLeftNumber === false) {
            let tempFinalValue = operate(operator, left, right);
            left = tempFinalValue;
            display.textContent = left;
            right = 0;
            startOfRightNumber = true;
            workingOnLeftNumber = false;
            operator = e.target.textContent;
            //console.log(`${typeof(operator)} ${operator}`);
        }
    });
});

equalButton.addEventListener("click", () => {
    finalValue = formatResult(operate(operator, left, right));
    display.textContent = finalValue;
});

clearButton.addEventListener("click", () => {
    reset();
});