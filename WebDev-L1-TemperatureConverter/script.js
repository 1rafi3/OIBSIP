/**
 * ThermoFlow Studio - Temperature Converter Logic
 * Author: MD Sheik Rafiwol Karim Rafi
 * Track: Web Development & Designing (Oasis Infobyte OIBSIP - Level 1 Task 3)
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
  // 2. DOM REFERENCES
  // ==========================================
  const tempForm = document.getElementById('converter-form');
  const tempInput = document.getElementById('temp-input');
  const unitSelect = document.getElementById('unit-select');
  const inputUnitSymbol = document.getElementById('input-unit-symbol');
  const validationMsg = document.getElementById('validation-msg');
  const alertBanner = document.getElementById('absolute-zero-alert');
  const alertText = document.getElementById('alert-text');

  const valCelsius = document.getElementById('val-celsius');
  const valFahrenheit = document.getElementById('val-fahrenheit');
  const valKelvin = document.getElementById('val-kelvin');

  const mercuryColumn = document.getElementById('mercury-column');
  const mercuryBulb = document.getElementById('mercury-bulb');
  const thermalStateTag = document.getElementById('thermal-state-tag');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Scientific Constants
  const ABSOLUTE_ZERO_C = -273.15;
  const ABSOLUTE_ZERO_F = -459.67;
  const ABSOLUTE_ZERO_K = 0;

  // Unit Symbol Mapping
  const unitSymbols = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K'
  };

  unitSelect.addEventListener('change', () => {
    inputUnitSymbol.textContent = unitSymbols[unitSelect.value] || '°C';
    performConversion();
  });

  // Preset Buttons
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tempInput.value = btn.dataset.val;
      unitSelect.value = btn.dataset.unit;
      inputUnitSymbol.textContent = unitSymbols[btn.dataset.unit];
      performConversion();
    });
  });

  // Form Submit Handler
  tempForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performConversion();
  });

  // Real-time conversion on typing
  tempInput.addEventListener('input', () => {
    performConversion();
  });

  // ==========================================
  // 3. CORE CONVERSION ENGINE & EDGE CASE GUARD
  // ==========================================
  function performConversion() {
    const rawVal = tempInput.value.trim();

    // Reset error state
    validationMsg.textContent = '';
    tempInput.classList.remove('error');
    alertBanner.classList.add('hidden');

    // Input Validation: Check for empty or non-numeric
    if (rawVal === '') {
      validationMsg.textContent = 'Please enter a numeric temperature value.';
      tempInput.classList.add('error');
      clearDisplays();
      return;
    }

    const num = Number(rawVal);
    if (isNaN(num)) {
      validationMsg.textContent = 'Invalid input: only numeric values (e.g. 25, -10.5) are permitted.';
      tempInput.classList.add('error');
      clearDisplays();
      return;
    }

    const unit = unitSelect.value;
    let celsiusVal = 0;
    let isBelowZero = false;

    // Convert from source to Celsius first
    if (unit === 'celsius') {
      celsiusVal = num;
      if (celsiusVal < ABSOLUTE_ZERO_C) isBelowZero = true;
    } else if (unit === 'fahrenheit') {
      celsiusVal = (num - 32) * (5 / 9);
      if (num < ABSOLUTE_ZERO_F) isBelowZero = true;
    } else if (unit === 'kelvin') {
      celsiusVal = num - 273.15;
      if (num < ABSOLUTE_ZERO_K) isBelowZero = true;
    }

    // Absolute Zero Guard
    if (isBelowZero) {
      alertBanner.classList.remove('hidden');
      alertText.textContent = `Warning: ${rawVal}${unitSymbols[unit]} is strictly below Absolute Zero (${ABSOLUTE_ZERO_C}°C / ${ABSOLUTE_ZERO_F}°F / 0K), violating physical thermodynamic limits.`;
    }

    // Compute all three units
    const C = celsiusVal;
    const F = (celsiusVal * 9 / 5) + 32;
    const K = celsiusVal + 273.15;

    // Display formatted results (rounded to 2 decimal places)
    valCelsius.textContent = `${C.toFixed(2)} °C`;
    valFahrenheit.textContent = `${F.toFixed(2)} °F`;
    valKelvin.textContent = `${K.toFixed(2)} K`;

    // Update Mercury Gauge Visual
    updateThermometerVisual(C);
  }

  function clearDisplays() {
    valCelsius.textContent = '-- °C';
    valFahrenheit.textContent = '-- °F';
    valKelvin.textContent = '-- K';
  }

  // ==========================================
  // 4. THERMOMETER MERCURY GAUGE CONTROLLER
  // ==========================================
  function updateThermometerVisual(celsius) {
    // Clamp visual range between -50°C (0%) and 100°C (100%)
    let percent = ((celsius - (-50)) / (100 - (-50))) * 100;
    percent = Math.max(5, Math.min(100, percent));

    mercuryColumn.style.height = `${percent}%`;

    // Thermal Color Dynamic Modulation
    let color = '#10b981'; // default warm green
    let stateText = 'Normal State';

    if (celsius <= 0) {
      color = '#06b6d4'; // Ice cyan
      stateText = 'Freezing / Sub-Zero ❄️';
    } else if (celsius > 0 && celsius <= 30) {
      color = '#10b981'; // Emerald
      stateText = 'Comfortable / Room Temp 🌿';
    } else if (celsius > 30 && celsius <= 65) {
      color = '#f97316'; // Orange
      stateText = 'Hot / Elevated 🔥';
    } else {
      color = '#ef4444'; // Crimson
      stateText = 'Critical / Boiling Point ♨️';
    }

    mercuryColumn.style.background = color;
    mercuryBulb.style.background = color;
    mercuryColumn.style.boxShadow = `0 0 12px ${color}80`;
    mercuryBulb.style.boxShadow = `0 0 15px ${color}aa`;

    thermalStateTag.textContent = stateText;
    thermalStateTag.style.color = color;
    thermalStateTag.style.borderColor = `${color}60`;
    thermalStateTag.style.background = `${color}18`;
  }

  // Initial Calculation
  performConversion();
});
