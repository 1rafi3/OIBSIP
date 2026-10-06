/**
 * NovaCode AI - SaaS Landing Page Script
 * Author: MD Sheik Rafiwol Karim Rafi
 * Track: Web Development & Designing (Oasis Infobyte OIBSIP - Level 1 Task 1)
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
  // 2. PRICING TOGGLE (MONTHLY VS YEARLY)
  // ==========================================
  const pricingToggle = document.getElementById('pricing-toggle');
  const priceValues = document.querySelectorAll('.price-val');
  let isYearly = false;

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      isYearly = !isYearly;
      pricingToggle.classList.toggle('active', isYearly);

      priceValues.forEach(priceEl => {
        const targetVal = isYearly ? priceEl.dataset.yearly : priceEl.dataset.monthly;
        priceEl.textContent = targetVal;
      });
    });
  }

  // ==========================================
  // 3. FAQ ACCORDION INTERACTIVITY
  // ==========================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close other items
      accordionItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Open first accordion by default
  if (accordionItems.length > 0) {
    accordionItems[0].classList.add('open');
  }

  // ==========================================
  // 4. MOBILE NAVIGATION TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = '#07090e';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }
});
