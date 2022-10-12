'strict mode';

class Calculator {
  constructor(previousOperandTextEl, currentOperandTextEl) {
    this.previousOperandTextEl = previousOperandTextEl;
    this.currentOperandTextEl = currentOperandTextEl;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (
      typeof this.currentOperand === 'number' &&
      this.operation === undefined &&
      this.previousOperand === ''
    )
      return;
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    console.log(prev, current);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case '×':
        computation = prev * current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';

    console.log(this);
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    console.log(stringNumber);
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    console.log(integerDigits);
    const decimalDigits = stringNumber.split('.')[1];
    console.log(decimalDigits);
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    }

    if (!isNaN(integerDigits)) {
      integerDisplay = integerDigits.toLocaleString('en-US', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits !== undefined) {
      return `${integerDisplay}.${decimalDigits}`;
    }

    if (decimalDigits === undefined) {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextEl.textContent = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation !== undefined) {
      this.previousOperandTextEl.textContent = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
      return;
    }
    this.previousOperandTextEl.textContent = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextEl = document.querySelector('[data-previous-operand]');
const currentOperandTextEl = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
