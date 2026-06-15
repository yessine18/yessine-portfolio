'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================================
     1. THEME TOGGLE
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (themeToggleBtn) {
    const applyTheme = function (theme) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      const icon = themeToggleBtn.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
      }
    };

    // Restore saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      applyTheme('light');
    }

    themeToggleBtn.addEventListener('click', function () {
      const isLight = document.documentElement.hasAttribute('data-theme');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* ==========================================================================
     2. SCROLL HEADER
     ========================================================================== */
  const header = document.getElementById('header');

  function scrollHeader() {
    if (!header) return;
    if (window.scrollY >= 50) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  }

  window.addEventListener('scroll', scrollHeader);
  scrollHeader(); // Initial run

  /* ==========================================================================
     3. MOBILE NAV MENU
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose && navMenu) {
    navClose.addEventListener('click', function () {
      navMenu.classList.remove('show-menu');
    });
  }

  if (navLinks.length && navMenu) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('show-menu');
      });
    });
  }

  /* ==========================================================================
     4. ACTIVE NAV LINK ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function scrollActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(function (section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      const link = document.querySelector('.nav__link[href*="' + sectionId + '"]');
      if (!link) return;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }

  window.addEventListener('scroll', scrollActiveLink);
  scrollActiveLink(); // Initial run

  /* ==========================================================================
     5. SOCIAL / ACHIEVEMENTS FILTER
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.social__filter-btn');
  const socialCards = document.querySelectorAll('.social__card');

  if (filterBtns.length && socialCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Toggle button active class
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        socialCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          const shouldShow = filterValue === 'all' || category === filterValue;

          if (shouldShow) {
            card.setAttribute('data-visible', 'true');
            card.classList.remove('fadeInUp');
            void card.offsetWidth; // Force reflow
            card.classList.add('fadeInUp');
          } else {
            card.setAttribute('data-visible', 'false');
            card.classList.remove('fadeInUp');
          }
        });
      });
    });
  }

  /* ==========================================================================
     6. SKILL BARS ANIMATION
     ========================================================================== */
  const skillFills = document.querySelectorAll('.skills__fill');
  const skillsContainer = document.querySelector('.skills__sub');

  if (skillFills.length && skillsContainer) {
    const skillsObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          skillFills.forEach(function (fill) {
            const targetWidth = fill.getAttribute('data-width');
            if (targetWidth) {
              fill.style.width = targetWidth;
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    skillsObserver.observe(skillsContainer);
  }

  /* ==========================================================================
     7. CONTACT FORM VALIDATION
     ========================================================================== */
  const contactForm = document.querySelector('[data-form]');
  const contactInputs = document.querySelectorAll('[data-form-input]');
  const contactBtn = document.querySelector('[data-form-btn]');

  if (contactForm && contactInputs.length && contactBtn) {
    contactInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        if (contactForm.checkValidity()) {
          contactBtn.removeAttribute('disabled');
        } else {
          contactBtn.setAttribute('disabled', '');
        }
      });
    });
  }

  /* ==========================================================================
     8. CLICKABLE CARDS
     ========================================================================== */
  const clickableCards = document.querySelectorAll('.project__card[data-url], .social__card[data-url]');

  clickableCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Don't trigger if user clicked an anchor/button inside the card
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      const url = card.getAttribute('data-url');
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });

  /* ==========================================================================
     9. SCROLL UP BUTTON
     ========================================================================== */
  const scrollUpBtn = document.querySelector('.scrollup');

  function toggleScrollUp() {
    if (!scrollUpBtn) return;
    if (window.scrollY >= 350) {
      scrollUpBtn.classList.add('show-scroll');
    } else {
      scrollUpBtn.classList.remove('show-scroll');
    }
  }

  window.addEventListener('scroll', toggleScrollUp);
  toggleScrollUp(); // Initial run

  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     10. SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '40px',
      duration: 1200,
      delay: 150,
      reset: false
    });

    sr.reveal('.blueprint-label, .blueprint-status, .home__name, .home__profession, .home__description, .home__buttons, .home__social', { interval: 100 });
    sr.reveal('.home__img-container', { delay: 450, origin: 'bottom' });
    
    sr.reveal('.section__header', {});
    sr.reveal('.about__data', { origin: 'left' });
    sr.reveal('.specialty__card', { interval: 100, origin: 'bottom' });
    
    sr.reveal('.timeline__col', { interval: 150, origin: 'left' });
    sr.reveal('.skills__sub', { delay: 200 });
    
    sr.reveal('.project__card', { interval: 100 });
    sr.reveal('.social__card', { interval: 80 });
    
    sr.reveal('.contact__info', { origin: 'left' });
    sr.reveal('.contact__map-wrapper', { delay: 200 });
    sr.reveal('.contact__form-wrapper', { origin: 'right', delay: 300 });
  }

  /* ==========================================================================
     11. CURRENT YEAR
     ========================================================================== */
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});