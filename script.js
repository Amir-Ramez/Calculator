let firstOperand = '',
    secondOperand = '',
    operator = '';
let result;

const operands = document.querySelectorAll('.numericalButton');
const operators = document.querySelectorAll('.operator');
let currentInput = document.querySelector('.display .current');
let inputHistory = document.querySelector('.display .history');
let equalButton = document.querySelector('.equalButton');
let dotButton = document.querySelector('.dotButton');
let clearButton = document.querySelector('.clearButton');
let deleteButton = document.querySelector('.deleteButton');

operands.forEach((numericalButton) => {
    numericalButton.addEventListener('click', (e) => {
        if (operator === '') {
            if (result) {
                firstOperand = '';
                result = null;
            }

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

function safeRound(num, maxDigits = 15) {
    if (Number.isInteger(num)) return num;

    const str = String(num);
    if (str.length <= maxDigits) return num;

    const rounded = parseFloat(num.toPrecision(maxDigits));
    return Number.isInteger(rounded) ? Math.trunc(rounded) : rounded;
}

function evaluate() {
    result = equal(
        parseFloat(firstOperand),
        parseFloat(secondOperand),
        operator
    );

    result = safeRound(result);

    inputHistory.textContent = '';
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

dotButton.addEventListener('click', () => {
    if (operator === '') {
        if (!firstOperand.includes('.')) {
            firstOperand = firstOperand + (firstOperand === '' ? '0.' : '.');
            currentInput.textContent = firstOperand;
        }
    } else {
        if (!secondOperand.includes('.')) {
            secondOperand = secondOperand + (secondOperand === '' ? '0.' : '.');
        }
    }
});

clearButton.addEventListener('click', () => {
    currentInput.textContent = '0';
    inputHistory.textContent = '';
    firstOperand = secondOperand = '';
    operator = '';
});

deleteButton.addEventListener('click', () => {
    if (operator) secondOperand = '';
    else firstOperand = '';
    currentInput.textContent = '0';
});
