const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');

const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const percentButton = document.querySelector('[data-percent]');
const posNegButton = document.querySelector('[data-posneg]');

const now = new Date().getFullYear();
const dateDisplay = document.querySelector('.date');
dateDisplay.innerText = now;

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }


  appendNumber(number) {
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
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
  }

  percent() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    if (isNaN(prev)) return;
    switch (this.operation) {
      case '%':
        computation = prev / 100;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  posNeg() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    if (isNaN(prev)) return;
    switch (this.operation) {
      case '+/-':
        if (prev < 0) {
          computation = prev * -1;
        } else {
          computation = -Math.abs(prev);
        }
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }


  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

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

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

percentButton.addEventListener('click', button => {
  calculator.chooseOperation(button.target.innerText);
  calculator.percent();
  calculator.updateDisplay();
});

posNegButton.addEventListener('click', button => {
  calculator.chooseOperation(button.target.innerText);
  calculator.posNeg();
  calculator.updateDisplay();
});


allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

document.body.addEventListener('keypress', function(e) {
  let keyPress = e.key;
  // console.log(e)
  if (isFinite(keyPress)) {
    calculator.appendNumber(keyPress);
    calculator.updateDisplay();
  } else {

    calculator.updateDisplay();
    switch (keyPress) {
      case '.':
        calculator.appendNumber('.');
        calculator.updateDisplay();
        break;
      case '*':
        calculator.chooseOperation('×');
        calculator.updateDisplay();
        break;
      case '/':
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
        break;
      case '+':
        calculator.chooseOperation('+');
        calculator.updateDisplay();
        break;
      case '-':
        calculator.chooseOperation('-');
        calculator.updateDisplay();
        break;
      case '%':
        calculator.chooseOperation('%');
        calculator.percent();
        calculator.updateDisplay();
        break;
      case '±':
        calculator.chooseOperation('+/-');
        calculator.updateDisplay();
        calculator.posNeg();
        calculator.updateDisplay();
        break;
      case '=':
      case 'Enter':
        calculator.compute();
        calculator.updateDisplay();
        break;
      default:
      return;
    }
  }

});
