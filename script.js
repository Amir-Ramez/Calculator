let firstOperand = '',
    secondOperand = '',
    operator = '';
let result;

const operands = document.querySelectorAll('.numericalButton');
const operators = document.querySelectorAll('.operator');
let currentInput = document.querySelector('.display .current');
let inputHistory = document.querySelector('.display .history');
let equalButton = document.querySelector('.equalButton');

operands.forEach((numericalButton) => {
    numericalButton.addEventListener('click', (e) => {
        if (operator === '') {
            if (result) firstOperand = '';

            firstOperand = firstOperand + e.target.textContent;
            currentInput.textContent = firstOperand;
        } else if (firstOperand && operator !== '') {
            secondOperand = secondOperand + e.target.textContent;
            currentInput.textContent = secondOperand;
        }
    });
});

operators.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (e) => {
        if (firstOperand && !secondOperand) {
            operator = e.target.textContent;
            inputHistory.textContent = firstOperand + ' ' + operator;
        } else if (firstOperand && secondOperand) {
            evaluate();
            operator = e.target.textContent;
            inputHistory.textContent = firstOperand + ' ' + operator;
        }
    });
});

function evaluate() {
    result = equal(
        parseFloat(firstOperand),
        parseFloat(secondOperand),
        operator
    );

    inputHistory.innerHTML = '';
    currentInput.textContent = `${result}`;
    firstOperand = String(result);
    secondOperand = '';
    operator = '';
}

function equal(firstOperand, secondOperand, operator) {
    if (operator === '+') return firstOperand + secondOperand;
    else if (operator === '-') return firstOperand - secondOperand;
    else if (operator === '*') return firstOperand * secondOperand;
    else if (operator === '/') return firstOperand / secondOperand;
}

equalButton.addEventListener('click', () => {
    evaluate();
});
