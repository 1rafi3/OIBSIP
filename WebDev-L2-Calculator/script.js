/**
 * OmniCalc Pro - Precision Mathematics Engine
 * Author: MD Sheik Rafiwol Karim Rafi
 * Track: Web Development & Designing (Oasis Infobyte OIBSIP - Level 2 Task 1)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. OASIS INFOBYTE VIDEO TITLE CARD CONTROLLER
  // ==========================================
  const titleCard = document.getElementById('video-title-card');
  const closeCardBtn = document.getElementById('close-title-card');
  const showCardBtn = document.getElementById('show-title-card-btn');

  let autoDismissTimer = setTimeout(() => {
    if (titleCard) titleCard.classList.add('hidden');
  }, 3000);

  if (closeCardBtn) {
    closeCardBtn.addEventListener('click', () => {
      clearTimeout(autoDismissTimer);
      if (titleCard) titleCard.classList.add('hidden');
    });
  }

  if (showCardBtn) {
    showCardBtn.addEventListener('click', () => {
      if (titleCard) titleCard.classList.remove('hidden');
    });
  }

  // ==========================================
  // 2. CALCULATOR ENGINE STATE (ZERO EVAL())
  // ==========================================
  let currentInput = '0';
  let previousInput = null;
  let activeOperator = null;
  let shouldResetScreen = false;
  let calculationTape = [];

  const currentDisplay = document.getElementById('current-display');
  const historyDisplay = document.getElementById('history-display');
  const tapeList = document.getElementById('tape-list');
  const tapeEmpty = document.getElementById('tape-empty');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const btnCopyResult = document.getElementById('btn-copy-result');

  // Format number for display
  function formatDisplay(numStr) {
    if (numStr === 'Error' || numStr === 'Cannot divide by 0') return numStr;
    const parts = numStr.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    if (isNaN(Number(integerPart))) return numStr;
    const formattedInt = Number(integerPart).toLocaleString('en-US');
    return formattedInt + decimalPart;
  }

  function updateScreen() {
    currentDisplay.textContent = formatDisplay(currentInput);
    if (activeOperator && previousInput !== null) {
      historyDisplay.textContent = `${formatDisplay(previousInput)} ${activeOperator}`;
    } else {
      historyDisplay.innerHTML = '&nbsp;';
    }
  }

  // Reset engine
  function clearAll() {
    currentInput = '0';
    previousInput = null;
    activeOperator = null;
    shouldResetScreen = false;
    updateScreen();
  }

  // Backspace / Delete
  function deleteLastDigit() {
    if (currentInput === 'Error' || currentInput === 'Cannot divide by 0') {
      clearAll();
      return;
    }
    if (shouldResetScreen) return;
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
      currentInput = '0';
    } else {
      currentInput = currentInput.slice(0, -1);
    }
    updateScreen();
  }

  // Number Input
  function appendNumber(number) {
    if (currentInput === 'Error' || currentInput === 'Cannot divide by 0') {
      clearAll();
    }
    if (currentInput === '0' || shouldResetScreen) {
      currentInput = number;
      shouldResetScreen = false;
    } else {
      if (currentInput.length < 15) { // Prevent screen overflow
        currentInput += number;
      }
    }
    updateScreen();
  }

  // Decimal Point
  function appendDecimal() {
    if (shouldResetScreen) {
      currentInput = '0.';
      shouldResetScreen = false;
      updateScreen();
      return;
    }
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateScreen();
    }
  }

  // Toggle Sign
  function toggleSign() {
    if (currentInput === '0' || currentInput === 'Error' || currentInput === 'Cannot divide by 0') return;
    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    updateScreen();
  }

  // Percentage
  function applyPercentage() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) return;
    currentInput = (num / 100).toString();
    updateScreen();
  }

  // Safe Arithmetic Computation (Strictly without eval)
  function compute(a, b, op) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (op) {
      case '+': return numA + numB;
      case '−':
      case '-': return numA - numB;
      case '×':
      case '*': return numA * numB;
      case '÷':
      case '/':
        if (numB === 0) return 'Cannot divide by 0';
        return numA / numB;
      default: return numB;
    }
  }

  // Handle Operator
  function handleOperator(op) {
    if (currentInput === 'Cannot divide by 0' || currentInput === 'Error') {
      clearAll();
      return;
    }

    if (activeOperator && !shouldResetScreen) {
      evaluate(true); // Chain calculation
    }

    previousInput = currentInput;
    activeOperator = op;
    shouldResetScreen = true;
    updateScreen();
  }

  // Evaluate Expression
  function evaluate(isChaining = false) {
    if (!activeOperator || previousInput === null) return;

    const operandA = previousInput;
    const operandB = currentInput;
    const operator = activeOperator;

    const result = compute(operandA, operandB, operator);

    if (result === 'Cannot divide by 0') {
      currentInput = 'Cannot divide by 0';
      previousInput = null;
      activeOperator = null;
      shouldResetScreen = true;
      updateScreen();
      return;
    }

    // Round precision issues (e.g. 0.1 + 0.2 = 0.30000000000000004)
    const rounded = Math.round(result * 1e10) / 1e10;
    const resultStr = rounded.toString();

    // Log to history tape
    recordTape(`${operandA} ${operator} ${operandB}`, resultStr);

    historyDisplay.textContent = `${formatDisplay(operandA)} ${operator} ${formatDisplay(operandB)} =`;
    currentInput = resultStr;

    if (!isChaining) {
      previousInput = null;
      activeOperator = null;
    } else {
      previousInput = resultStr;
    }

    shouldResetScreen = true;
    currentDisplay.textContent = formatDisplay(currentInput);
  }

  // Record Calculation Tape
  function recordTape(expr, res) {
    calculationTape.unshift({ expr, res });
    renderTape();
  }

  function renderTape() {
    tapeList.innerHTML = '';
    if (calculationTape.length === 0) {
      tapeEmpty.classList.remove('hidden');
      return;
    }
    tapeEmpty.classList.add('hidden');

    calculationTape.forEach(item => {
      const el = document.createElement('div');
      el.className = 'tape-item';
      el.innerHTML = `
        <span class="tape-expr">${item.expr} =</span>
        <span class="tape-res">${formatDisplay(item.res)}</span>
      `;
      // Click to recall result
      el.addEventListener('click', () => {
        currentInput = item.res;
        shouldResetScreen = true;
        updateScreen();
      });
      tapeList.appendChild(el);
    });
  }

  btnClearHistory.addEventListener('click', () => {
    calculationTape = [];
    renderTape();
  });

  // Copy Result
  btnCopyResult.addEventListener('click', () => {
    navigator.clipboard.writeText(currentInput).then(() => {
      const original = btnCopyResult.textContent;
      btnCopyResult.textContent = '✓ Copied!';
      setTimeout(() => btnCopyResult.textContent = original, 1500);
    });
  });

  // ==========================================
  // 3. EVENT LISTENERS ON BUTTON MATRIX (NO INLINE ONCLICK)
  // ==========================================
  const keypad = document.getElementById('keypad');

  keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    if (btn.dataset.num !== undefined) {
      appendNumber(btn.dataset.num);
    } else if (btn.dataset.operator !== undefined) {
      handleOperator(btn.dataset.operator);
    } else if (btn.dataset.action !== undefined) {
      switch (btn.dataset.action) {
        case 'clear': clearAll(); break;
        case 'backspace': deleteLastDigit(); break;
        case 'decimal': appendDecimal(); break;
        case 'calculate': evaluate(false); break;
        case 'toggle-sign': toggleSign(); break;
        case 'percent': applyPercentage(); break;
      }
    }
  });

  // ==========================================
  // 4. KEYBOARD SHORTCUT SUPPORT
  // ==========================================
  window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return;

    if (e.key >= '0' && e.key <= '9') {
      appendNumber(e.key);
    } else if (e.key === '.') {
      appendDecimal();
    } else if (e.key === '+') {
      handleOperator('+');
    } else if (e.key === '-') {
      handleOperator('−');
    } else if (e.key === '*') {
      handleOperator('×');
    } else if (e.key === '/') {
      e.preventDefault();
      handleOperator('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      evaluate(false);
    } else if (e.key === 'Backspace') {
      deleteLastDigit();
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
      clearAll();
    } else if (e.key === '%') {
      applyPercentage();
    }
  });

  updateScreen();
  renderTape();
});
