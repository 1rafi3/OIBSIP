/**
 * AuthShield Pro - Authentication & Protected Route Engine
 * Author: MD Sheik Rafiwol Karim Rafi
 * Track: Web Development & Designing (Oasis Infobyte OIBSIP - Level 2 Task 4)
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
  // 2. CRYPTOGRAPHIC UTILITY (SHA-256 HASHING)
  // Standard Web Crypto API - Zero plaintext storage
  // ==========================================
  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ==========================================
  // 3. STORAGE & DATABASE HELPERS (localStorage)
  // ==========================================
  const USERS_STORAGE_KEY = 'oibsip_auth_users';
  const SESSION_STORAGE_KEY = 'oibsip_active_session';

  function getUsers() {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  function getActiveSession() {
    try {
      const data = localStorage.getItem(SESSION_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  function setActiveSession(user) {
    const session = {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      loginTimestamp: new Date().toLocaleString(),
      sessionId: 'SES-' + Math.floor(100000 + Math.random() * 900000),
      passwordHash: user.passwordHash
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  function clearActiveSession() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  // Seed default demonstration account if none exists
  async function seedDefaultUser() {
    const users = getUsers();
    if (users.length === 0) {
      const demoHash = await sha256('Rafi2026!');
      users.push({
        fullName: 'MD Sheik Rafiwol Karim Rafi',
        username: 'rafi_dev',
        email: 'rwolkorimrafi@gmail.com',
        passwordHash: demoHash,
        createdAt: new Date().toISOString()
      });
      saveUsers(users);
    }
  }
  seedDefaultUser();

  // ==========================================
  // 4. UI ELEMENTS & TAB SWITCHING
  // ==========================================
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const authSection = document.getElementById('auth-section');
  const dashboardSection = document.getElementById('dashboard-section');
  const alertBox = document.getElementById('auth-alert');
  const sessionStatusText = document.getElementById('session-status-text');
  const statusIndicator = document.querySelector('.status-indicator');

  function showAlert(message, type = 'error') {
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.className = `alert-box show ${type}`;
    setTimeout(() => {
      alertBox.classList.remove('show');
    }, 5000);
  }

  function switchTab(target) {
    alertBox.className = 'alert-box';
    if (target === 'login') {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    } else {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    }
  }

  tabLogin.addEventListener('click', () => switchTab('login'));
  tabRegister.addEventListener('click', () => switchTab('register'));

  // Password visibility toggle buttons
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    });
  });

  // ==========================================
  // 5. REGISTRATION VALIDATION & REAL-TIME METER
  // ==========================================
  const regPassword = document.getElementById('reg-password');
  const ruleLength = document.getElementById('rule-length');
  const ruleNumber = document.getElementById('rule-number');
  const meterFill = document.getElementById('meter-fill');

  regPassword.addEventListener('input', () => {
    const val = regPassword.value;
    const hasLength = val.length >= 8;
    const hasNumber = /\d/.test(val);

    ruleLength.className = hasLength ? 'rule-item valid' : 'rule-item';
    ruleLength.textContent = hasLength ? '✓ At least 8 characters' : '✗ At least 8 characters';

    ruleNumber.className = hasNumber ? 'rule-item valid' : 'rule-item';
    ruleNumber.textContent = hasNumber ? '✓ Contains at least 1 number' : '✗ Contains at least 1 number';

    // Meter calculation
    if (hasLength && hasNumber && /[!@#$%^&*]/.test(val)) {
      meterFill.className = 'meter-fill strong';
    } else if (hasLength && hasNumber) {
      meterFill.className = 'meter-fill medium';
    } else if (val.length > 0) {
      meterFill.className = 'meter-fill weak';
    } else {
      meterFill.className = 'meter-fill';
    }
  });

  // Register Form Submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('reg-fullname').value.trim();
    const username = document.getElementById('reg-username').value.trim().toLowerCase();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = regPassword.value;
    const confirm = document.getElementById('reg-confirm').value;

    // Reset error labels
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');

    // Form Validation
    let hasError = false;
    if (!fullName) {
      document.getElementById('reg-name-error').textContent = 'Please enter your full name.';
      hasError = true;
    }
    if (!username || username.length < 3) {
      document.getElementById('reg-user-error').textContent = 'Username must be at least 3 characters.';
      hasError = true;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('reg-email-error').textContent = 'Please enter a valid email address.';
      hasError = true;
    }
    if (password.length < 8 || !/\d/.test(password)) {
      showAlert('Password must be at least 8 characters long and contain at least one number.');
      hasError = true;
    }
    if (password !== confirm) {
      document.getElementById('reg-confirm-error').textContent = 'Passwords do not match.';
      hasError = true;
    }

    if (hasError) return;

    // Duplicate Check
    const users = getUsers();
    const exists = users.find(u => u.username === username || u.email === email);
    if (exists) {
      if (exists.username === username) {
        document.getElementById('reg-user-error').textContent = 'Username is already taken.';
      }
      if (exists.email === email) {
        document.getElementById('reg-email-error').textContent = 'An account with this email already exists.';
      }
      showAlert('Registration failed: Username or Email is already registered.');
      return;
    }

    // Cryptographic SHA-256 Hashing before storage
    const passwordHash = await sha256(password);
    const newUser = {
      fullName,
      username,
      email,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    showAlert('Registration successful! You may now sign in with your credentials.', 'success');
    registerForm.reset();
    meterFill.className = 'meter-fill';
    ruleLength.className = 'rule-item';
    ruleNumber.className = 'rule-item';
    switchTab('login');
  });

  // ==========================================
  // 6. LOGIN FORM SUBMISSION
  // ==========================================
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    if (!identifier || !password) {
      showAlert('Please enter both your username/email and password.');
      return;
    }

    // Hash entered password to compare against stored hash
    const inputHash = await sha256(password);
    const users = getUsers();
    const matchedUser = users.find(u => 
      (u.username === identifier || u.email === identifier) && u.passwordHash === inputHash
    );

    if (matchedUser) {
      // Successful Login
      const session = setActiveSession(matchedUser);
      loginForm.reset();
      renderDashboard(session);
    } else {
      // Security standard: generic message preventing username harvesting
      showAlert('Invalid username/email or password.');
    }
  });

  // ==========================================
  // 7. PROTECTED DASHBOARD CONTROLLER
  // ==========================================
  const dashUserName = document.getElementById('dash-user-name');
  const dashUserEmail = document.getElementById('dash-user-email');
  const dashAvatar = document.getElementById('dash-avatar');
  const dashSessionId = document.getElementById('dash-session-id');
  const dashLoginTime = document.getElementById('dash-login-time');
  const dashStoredHash = document.getElementById('dash-stored-hash');
  const btnLogout = document.getElementById('btn-logout');
  const btnRefreshSession = document.getElementById('btn-refresh-session');

  function renderDashboard(session) {
    authSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');

    dashUserName.textContent = session.fullName || session.username;
    dashUserEmail.textContent = session.email;
    dashAvatar.textContent = (session.fullName ? session.fullName[0] : session.username[0]).toUpperCase();
    dashSessionId.textContent = session.sessionId;
    dashLoginTime.textContent = session.loginTimestamp;
    dashStoredHash.textContent = session.passwordHash;

    sessionStatusText.textContent = `Authenticated: ${session.username}`;
    statusIndicator.classList.add('active');
  }

  function renderAuthGateway() {
    dashboardSection.classList.add('hidden');
    authSection.classList.remove('hidden');
    sessionStatusText.textContent = 'Guest Mode (Unauthenticated)';
    statusIndicator.classList.remove('active');
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      clearActiveSession();
      renderAuthGateway();
      showAlert('You have been logged out successfully.', 'success');
    });
  }

  if (btnRefreshSession) {
    btnRefreshSession.addEventListener('click', () => {
      const active = getActiveSession();
      if (active) {
        active.sessionId = 'SES-' + Math.floor(100000 + Math.random() * 900000);
        active.loginTimestamp = new Date().toLocaleString();
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(active));
        renderDashboard(active);
        showAlert('Security session token refreshed successfully.', 'success');
      }
    });
  }

  // Check active session on initial load (Protects Dashboard Route)
  const currentSession = getActiveSession();
  if (currentSession) {
    renderDashboard(currentSession);
  } else {
    renderAuthGateway();
  }
});
