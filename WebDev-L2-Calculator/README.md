# Task 1 · Precision Calculator (OmniCalc Pro)
### Track: Web Development & Designing | Level 2 | Oasis Infobyte (OIBSIP)

**Intern Name:** MD Sheik Rafiwol Karim Rafi  
**Role:** Full Stack Web Developer & CSE Student  
**Submission Folder:** `OIBSIP/WebDev-L2-Calculator/`  

---

## 🎯 Project Objective
Build a robust browser-based calculator capable of performing standard arithmetic operations with a responsive button interface, expression chaining, keyboard accessibility, and safe evaluation without `eval()`.

---

## ✨ Features Checklist Compliance
- [x] **Dual Display Screen:** Shows active operand/result and live operator history.
- [x] **Numeric & Decimal Keys:** `0–9` buttons and `.` decimal separator.
- [x] **Arithmetic Operators:** Addition (`+`), subtraction (`−`), multiplication (`×`), and division (`÷`).
- [x] **Equals (`=`) Button:** Evaluates active arithmetic expressions.
- [x] **Clear (`C`) & Backspace (`⌫`):** Full display reset and single-character backspace.
- [x] **Zero-Division Protection:** Displays friendly `Cannot divide by 0` message instead of NaN or infinity crashes.
- [x] **Operator Chaining:** Supports sequential calculations without resetting.
- [x] **CSS Grid Alignment:** Modern, aligned grid matrix for keypad buttons.
- [x] **Clean Event Listeners:** Event delegation used across all keys with zero inline `onclick` attributes.
- [x] **Strict Security (No `eval()`):** Built using an algorithmic state engine and switch cases.
- [x] **Bonus Features:** Calculation tape history with click-to-recall, clipboard copy button, full keyboard navigation.
- [x] **Built-in 2-Second Title Card:** Overlay compliant with the Oasis Infobyte video submission guideline.

---

## 🛠️ Tech Stack
- **HTML5:** Semantic calculator layout and accessible buttons.
- **CSS3:** Modern dark UI, CSS Grid keypad, glassmorphism, responsive design.
- **JavaScript (ES6+):** Custom arithmetic parsing engine, event delegation, keyboard listener.

---

## 🚀 How to Run Locally
1. Clone or open the repository:
   ```bash
   git clone https://github.com/1rafi3/OIBSIP.git
   cd OIBSIP/WebDev-L2-Calculator
   ```
2. Open `index.html` in your browser.
3. Use either the on-screen keypad or physical keyboard (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Esc`).

---

## 📹 Video Submission Title Card Guide
This project displays a built-in static title card overlay on load.
To trigger it again anytime during your screen recording:
- Click the **"Record Title Card"** button at the bottom-right corner.
- Record the first 2 seconds showing:
  - **Intern Name:** MD Sheik Rafiwol Karim Rafi
  - **Track:** Web Development & Designing
  - **Task Title:** Level 2 — Task 1: Calculator
