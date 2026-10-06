# Task 3 · Interactive Temperature & Climate Studio (ThermoFlow)
### Track: Web Development & Designing | Level 1 | Oasis Infobyte (OIBSIP)

**Intern Name:** MD Sheik Rafiwol Karim Rafi  
**Role:** Full Stack Web Developer & CSE Student  
**Submission Folder:** `OIBSIP/WebDev-L1-TemperatureConverter/`  

---

## 🎯 Project Objective
Build an interactive thermodynamic web tool that converts temperature values between Celsius, Fahrenheit, and Kelvin, featuring strict input validation, edge-case thermodynamic safety limits, and simultaneous output visualization.

---

## ✨ Features Checklist Compliance
- [x] **Numeric Input Validation:** Rejects empty or non-numeric inputs with instant feedback messages.
- [x] **Source Unit Selector:** Dropdown menu supporting Celsius (°C), Fahrenheit (°F), and Kelvin (K).
- [x] **Simultaneous Multi-Scale Output:** Displays converted values across all 3 units concurrently in dedicated tiles.
- [x] **Calculation Trigger:** Executes calculations via "Calculate Conversions" submit button and real-time input listeners.
- [x] **Edge Case & Absolute Zero Guard:** Warns users whenever input temperatures fall below thermodynamic absolute zero (−273.15°C / 0K / −459.67°F).
- [x] **Centred, Clean UI:** Modern laboratory dashboard with scientific formula breakdown cards.
- [x] **Bonus — Mercury Gauge Simulation:** Dynamic visual thermometer that updates column height and modulates color (Freezing Ice Cyan → Warm Emerald → Boiling Crimson).
- [x] **Quick Presets:** Instant one-click presets for Freezing (0°C), Room Temp (25°C), Body Temp (37°C), Boiling (100°C), and Absolute Zero (−273.15°C).
- [x] **Built-in 2-Second Title Card:** Overlay compliant with the Oasis Infobyte video submission guideline.

---

## 🛠️ Tech Stack & Scientific Formulas
- **HTML5:** Accessible numeric form elements and laboratory layout.
- **CSS3:** Custom properties, glassmorphism, dynamic mercury column transitions.
- **JavaScript (ES6+):** Conversion math formulas:
  - $°F = (°C \times 9/5) + 32$
  - $K = °C + 273.15$
  - $°C = (°F - 32) \times 5/9$

---

## 🚀 How to Run Locally
1. Clone or open the repository:
   ```bash
   git clone https://github.com/1rafi3/OIBSIP.git
   cd OIBSIP/WebDev-L1-TemperatureConverter
   ```
2. Open `index.html` in your browser.

---

## 📹 Video Submission Title Card Guide
This project displays a built-in static title card overlay on load.
To trigger it again anytime during your screen recording:
- Click the **"Record Title Card"** button at the bottom-right corner.
- Record the first 2 seconds showing:
  - **Intern Name:** MD Sheik Rafiwol Karim Rafi
  - **Track:** Web Development & Designing
  - **Task Title:** Level 1 — Task 3: Temperature Converter Website
