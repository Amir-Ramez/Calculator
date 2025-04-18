let firstOperand = 0,
    secondOperand = 0;
let operator = '';

const operands = document.querySelectorAll('.numericalButton');
const operators = document.querySelectorAll('.operator');
let currentInput = document.querySelector('.display .current');
let inputHistory = document.querySelector('.display .history');

operands.forEach((numericalButton) => {
    numericalButton.addEventListener('click', (e) => {
        if (operator === '') {
            firstOperand = firstOperand * 10 + +e.target.textContent;
            currentInput.textContent = firstOperand;
        } else if (firstOperand && operator !== '') {
            secondOperand = secondOperand * 10 + +e.target.textContent;
            currentInput.textContent = secondOperand;
        }
    });
});

operators.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (e) => {
        if (firstOperand && !secondOperand) {
            operator = e.target.textContent;
            inputHistory.textContent = firstOperand + ' ' + operator;
            currentInput.innerHTML = '';
        }
    });
});
