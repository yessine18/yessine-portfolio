'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================================
     1. THEME TOGGLE
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    var applyTheme = function (theme) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      var icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
      }
    };

    // Restore saved theme
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      applyTheme('light');
    }

    themeToggle.addEventListener('click', function () {
      var isLight = document.documentElement.hasAttribute('data-theme');
      var newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* ==========================================================================
     2. SCROLL HEADER
     ========================================================================== */
  var header = document.getElementById('header');

  function scrollHeader() {
    if (!header) return;
    if (window.scrollY >= 50) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  }

  window.addEventListener('scroll', scrollHeader, { passive: true });
  scrollHeader();

  /* ==========================================================================
     3. MOBILE NAV MENU
     ========================================================================== */
  var navToggle = document.getElementById('nav-toggle');
  var navClose = document.getElementById('nav-close');
  var navMenu = document.getElementById('nav-menu');
  var navLinks = document.querySelectorAll('.nav__link');

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
  var sections = document.querySelectorAll('section[id]');

  function scrollActiveLink() {
    var scrollY = window.scrollY;

    sections.forEach(function (section) {
      var sectionHeight = section.offsetHeight;
      var sectionTop = section.offsetTop - 120;
      var sectionId = section.getAttribute('id');

      var link = document.querySelector('.nav__link[href*="' + sectionId + '"]');
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active-link');
        } else {
          link.classList.remove('active-link');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollActiveLink, { passive: true });
  scrollActiveLink();

  /* ==========================================================================
     5. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ==========================================================================
     6. SOCIAL / ACHIEVEMENTS FILTER
     ========================================================================== */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var socialCards = document.querySelectorAll('.social-card');

  if (filterBtns.length && socialCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filterValue = btn.getAttribute('data-filter');

        socialCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          var shouldShow = filterValue === 'all' || category === filterValue;

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
     7. SKILL BARS ANIMATION
     ========================================================================== */
  var skillsSections = document.querySelectorAll('.skills-section');

  if (skillsSections.length) {
    var skillsObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fills = entry.target.querySelectorAll('.skill__fill');
          fills.forEach(function (fill) {
            var targetWidth = fill.getAttribute('data-width');
            if (targetWidth) {
              fill.style.width = targetWidth;
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    skillsSections.forEach(function (container) {
      skillsObserver.observe(container);
    });
  }

  /* ==========================================================================
     8. CONTACT FORM VALIDATION
     ========================================================================== */
  var contactForms = document.querySelectorAll('[data-form]');

  contactForms.forEach(function (form) {
    var inputs = form.querySelectorAll('[data-form-input]');
    var btn = form.querySelector('[data-form-btn]');

    if (inputs.length && btn) {
      inputs.forEach(function (input) {
        input.addEventListener('input', function () {
          if (form.checkValidity()) {
            btn.removeAttribute('disabled');
          } else {
            btn.setAttribute('disabled', '');
          }
        });
      });
    }
  });

  /* ==========================================================================
     9. CLICKABLE CARDS
     ========================================================================== */
  var clickableCards = document.querySelectorAll('.project-card[data-url], .social-card[data-url]');

  clickableCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('button')) return;
      var url = card.getAttribute('data-url');
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });

  /* ==========================================================================
     10. SCROLL UP BUTTON
     ========================================================================== */
  var scrollUpBtn = document.querySelector('.scrollup');

  function toggleScrollUp() {
    if (!scrollUpBtn) return;
    if (window.scrollY >= 350) {
      scrollUpBtn.classList.add('show-scroll');
    } else {
      scrollUpBtn.classList.remove('show-scroll');
    }
  }

  window.addEventListener('scroll', toggleScrollUp, { passive: true });
  toggleScrollUp();

  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     11. HERO PARALLAX
     ========================================================================== */
  var heroImg = document.querySelector('.hero__img-frame');

  if (heroImg) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroImg.style.transform = 'translateY(' + (scrollY * 0.06) + 'px)';
      }
    }, { passive: true });
  }

  /* ==========================================================================
     12. CURRENT YEAR
     ========================================================================== */
  var footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});