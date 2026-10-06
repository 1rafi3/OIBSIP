/**
 * Alan Turing Tribute Page Script & Cryptographic Simulator
 * Author: MD Sheik Rafiwol Karim Rafi
 * Track: Web Development & Designing (Oasis Infobyte OIBSIP - Level 2 Task 2)
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
  // 2. STATION X: ROTOR / CIPHER SIMULATOR
  // ==========================================
  const cipherInput = document.getElementById('cipher-input');
  const cipherOutput = document.getElementById('cipher-output');
  const rotorShift = document.getElementById('rotor-shift');
  const shiftValDisplay = document.getElementById('shift-val');

  function encryptText(text, shift) {
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Lowercase letters
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      return char;
    }).join('');
  }

  function updateCipher() {
    if (!cipherInput || !cipherOutput || !rotorShift) return;
    const shift = parseInt(rotorShift.value, 10);
    const keyLetter = String.fromCharCode(65 + (shift % 26));
    shiftValDisplay.textContent = `${shift} (Key ${keyLetter})`;
    cipherOutput.value = encryptText(cipherInput.value, shift);
  }

  if (cipherInput && rotorShift) {
    cipherInput.addEventListener('input', updateCipher);
    rotorShift.addEventListener('input', updateCipher);
    updateCipher();
  }
});
