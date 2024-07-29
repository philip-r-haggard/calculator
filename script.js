const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, left, right) {
    switch(operator) {
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

let operator, left, right;

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.num');

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        display.textContent = e.target.textContent;
    });
});