# Task 4 · Login Authentication System & Protected Dashboard
### Track: Web Development & Designing | Level 2 | Oasis Infobyte (OIBSIP)

**Intern Name:** MD Sheik Rafiwol Karim Rafi  
**Role:** Full Stack Web Developer & CSE Student  
**Submission Folder:** `OIBSIP/WebDev-L2-AuthSystem/`  

---

## 🎯 Project Objective
Architect a secure client-side authentication system featuring user registration, cryptographic password protection, credential validation, duplicate detection, and a protected dashboard accessible only with a valid active session.

---

## ✨ Features Checklist Compliance
- [x] **Registration View:** Fields for Full Name, Username, Email, and Password with confirm verification.
- [x] **Password Validation:** Enforces minimum 8 characters and at least 1 numeric digit, visualized via real-time checklist and strength meter.
- [x] **Duplicate Detection:** Prevents multiple registrations using identical usernames or email addresses.
- [x] **Login View:** Identifier (username/email) and password inputs with remember-session checkbox.
- [x] **Security-Compliant Error Handling:** Standard generic error message (`Invalid username/email or password`) that defends against username enumeration attacks.
- [x] **Protected Dashboard Route:** Guarded against unauthenticated access; directly displays session ID, timestamp, and user profile.
- [x] **Secure Logout Flow:** Clears the active session token and redirects back to the login interface.
- [x] **Zero Plaintext Storage (SHA-256):** Implemented using the browser's native **Web Crypto API** (`crypto.subtle.digest('SHA-256')`).
- [x] **Built-in 2-Second Title Card:** Overlay compliant with the Oasis Infobyte video submission guideline.

---

## 🛠️ Tech Stack & Cryptography
- **HTML5:** Semantic elements, form controls, and accessible ARIA attributes.
- **CSS3:** Cyber-themed dark mode, glassmorphism, responsive grid layout.
- **JavaScript (ES6+):** DOM manipulation, state routing, regex validation.
- **Web Crypto API:** Native asynchronous SHA-256 message hashing.
- **Persistence:** Browser `localStorage` for registered user accounts and session tracking.

---

## 🚀 How to Run Locally
1. Clone or open the repository:
   ```bash
   git clone https://github.com/1rafi3/OIBSIP.git
   cd OIBSIP/WebDev-L2-AuthSystem
   ```
2. Open `index.html` in any modern web browser.
3. **Demo Credentials Provided by Default:**
   - **Username / Email:** `rafi_dev` or `rwolkorimrafi@gmail.com`
   - **Password:** `Rafi2026!`
   - *Or click "Create Account" to register any new account.*

---

## 📹 Video Submission Title Card Guide
This project displays a built-in static title card overlay on load.
To trigger it again anytime during your screen recording:
- Click the **"Record Title Card"** button at the bottom-right corner.
- Record the first 2 seconds showing:
  - **Intern Name:** MD Sheik Rafiwol Karim Rafi
  - **Track:** Web Development & Designing
  - **Task Title:** Level 2 — Task 4: Login Authentication System
