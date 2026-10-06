/**
 * Portfolio Interactive Script
 * Author: MD Sheik Rafiwol Karim Rafi
 * Track: Web Development & Designing (Oasis Infobyte OIBSIP)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. OASIS INFOBYTE VIDEO TITLE CARD CONTROLLER
  // Ensures compliance with the 2-second intro requirement
  // ==========================================
  const titleCard = document.getElementById('video-title-card');
  const closeCardBtn = document.getElementById('close-title-card');
  const showCardBtn = document.getElementById('show-title-card-btn');

  // Auto-dismiss title card after 3 seconds on fresh load, or allow manual dismiss
  let autoDismissTimer = setTimeout(() => {
    hideTitleCard();
  }, 3000);

  function hideTitleCard() {
    if (titleCard) {
      titleCard.classList.add('hidden');
    }
  }

  function showTitleCard() {
    if (titleCard) {
      titleCard.classList.remove('hidden');
      clearTimeout(autoDismissTimer);
    }
  }

  if (closeCardBtn) {
    closeCardBtn.addEventListener('click', () => {
      clearTimeout(autoDismissTimer);
      hideTitleCard();
    });
  }

  if (showCardBtn) {
    showCardBtn.addEventListener('click', () => {
      showTitleCard();
    });
  }

  // ==========================================
  // 2. THEME CONTROLLER (Dark / Light Mode)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme preference or default to dark
  const savedTheme = localStorage.getItem('rafi_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('rafi_portfolio_theme', newTheme);
    });
  }

  // ==========================================
  // 3. MOBILE MENU TOGGLE
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 4. SKILLS CATEGORY FILTERING
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5. NAVBAR SCROLL HIGHLIGHT & ACTIVE LINK
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  });

  // ==========================================
  // 6. CONTACT FORM REAL-TIME VALIDATION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const formStatus = document.getElementById('form-status');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      nameInput.classList.remove('invalid');
      emailInput.classList.remove('invalid');
      messageInput.classList.remove('invalid');

      // Name Validation
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please provide your full name.';
        nameInput.classList.add('invalid');
        isValid = false;
      }

      // Email Validation
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email address is required.';
        emailInput.classList.add('invalid');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('invalid');
        isValid = false;
      }

      // Message Validation
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Message content cannot be blank.';
        messageInput.classList.add('invalid');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message should be at least 10 characters long.';
        messageInput.classList.add('invalid');
        isValid = false;
      }

      if (isValid) {
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Thank you! Your message has been prepared. Opening your email client...';

        // Trigger direct mailto link with encoded parameters
        const subject = encodeURIComponent(document.getElementById('contact-subject').value || 'Portfolio Contact Inquiry');
        const body = encodeURIComponent(`Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`);
        
        setTimeout(() => {
          window.location.href = `mailto:rwolkorimrafi@gmail.com?subject=${subject}&body=${body}`;
          contactForm.reset();
        }, 1200);
      } else {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please correct the highlighted fields before submitting.';
      }
    });
  }
});
