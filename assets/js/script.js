// ----------------------------------------------------
// YESSINE FAKHFAKH — PORTFOLIO 2026 INTERACTION SYSTEM
// ----------------------------------------------------
function initApp() {
  initLanguageToggle();
  initNavEvents();
  initRevealAnimations();
  initCustomCursor();
  initJourneyMarquee();
  initSkillsObserver();
  initProjectsSection();
  initAchievementsFilter();
  initContactForm();
  initLightbox();
  initFooterYear();
}

// ----------------------------------------------------
// NAVIGATION BAR & ACTIVE LINK HIGHLIGHTING
// ----------------------------------------------------
function initNavEvents() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }
  
  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }
  
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('show-menu');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show-menu')) {
      if (!navMenu.contains(e.target) && navToggle && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
      }
    }
  });
  
  // Highlight navigation links on scroll
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('header');

  function scrollActive() {
    const scrollY = window.pageYOffset;

    if (header) {
      header.classList.toggle('scroll-header', scrollY > 24);
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 110;
      const sectionId = current.getAttribute('id');
      if (!sectionId) return;
      const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active-link');
        } else {
          navLink.classList.remove('active-link');
        }
      }
    });
  }
  window.addEventListener('scroll', scrollActive, { passive: true });
  scrollActive();
}

// ----------------------------------------------------
// SCROLL REVEAL ANIMATIONS
// Smooth staggered section-by-section reveals
// ----------------------------------------------------
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        
        setTimeout(() => {
          el.classList.add('active');
        }, Number(delay));
        
        observer.unobserve(el);
      }
    });
  }, observerOptions);
  
  let currentSection = null;
  let sectionChildIndex = 0;
  
  reveals.forEach(el => {
    const parentSection = el.closest('section');
    if (parentSection !== currentSection) {
      currentSection = parentSection;
      sectionChildIndex = 0;
    }
    
    el.dataset.delay = Math.min(sectionChildIndex, 4) * 80;
    sectionChildIndex++;
    
    observer.observe(el);
  });
  
  requestAnimationFrame(() => {
    const heroElements = document.querySelectorAll('.hero .reveal-left, .hero .reveal-right, .hero .reveal, .hero .reveal-scale');
    heroElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('active');
      }, 100 + i * 90);
    });
  });
}

// ----------------------------------------------------
// CUSTOM DUAL CURSOR
// ----------------------------------------------------
function initCustomCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  var dot = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  var mouseX = -100, mouseY = -100;
  var ringX = -100, ringY = -100;
  var isVisible = false;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isVisible = true;
    }
  });

  document.addEventListener('mouseleave', function() {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener('mouseenter', function() {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    isVisible = true;
  });

  document.addEventListener('mousedown', function() {
    dot.classList.add('is-clicking');
    ring.classList.add('is-clicking');
  });
  document.addEventListener('mouseup', function() {
    dot.classList.remove('is-clicking');
    ring.classList.remove('is-clicking');
  });

  var hoverTargets = 'a, button, input, textarea, select, .sw-dash-card, .v-card, .cert-card, .social-card, .video-filter-btn, .nav__link, .dot, [role="button"], .lightbox-trigger';

  document.addEventListener('mouseover', function(e) {
    if (e.target.closest(hoverTargets)) {
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');
    }
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest(hoverTargets)) {
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
    }
  });

  function animate() {
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animate);
  }
  animate();
}

// ----------------------------------------------------
// CREATIVE JOURNEY — AUTO-SCROLLING MARQUEE
// ----------------------------------------------------
function initJourneyMarquee() {
  const track = document.getElementById('journey-marquee');
  if (!track) return;
  
  const cards = track.querySelectorAll('.journey-card-dash');
  if (!cards.length) return;
  
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });
}

// ----------------------------------------------------
// SKILL PROGRESS BARS ANIMATION
// ----------------------------------------------------
function initSkillsObserver() {
  const skillsWrap = document.querySelector('.skills-dashboard-wrap');
  if (!skillsWrap) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill__fill');
        fills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          if (width) {
            fill.style.width = width;
          }
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(skillsWrap);
}

// ----------------------------------------------------
// PROJECTS SHOWCASE (EXPAND / COLLAPSE & CLICK)
// ----------------------------------------------------
function initProjectsSection() {
  const vCards = document.querySelectorAll('.v-card');
  const expandBtn = document.getElementById('project-expand-btn');
  const expandText = document.getElementById('expand-text');
  const expandIcon = document.getElementById('expand-icon');
  
  if (!vCards.length) return;
  
  let isExpanded = false;
  const INITIAL_LIMIT = 6;
  
  function updateProjectVisibility() {
    vCards.forEach((card, idx) => {
      if (!isExpanded && idx >= INITIAL_LIMIT) {
        card.style.display = 'none';
      } else {
        card.style.display = 'flex';
      }
    });
    
    if (expandBtn) {
      if (isExpanded) {
        expandText.textContent = 'Show Less';
        expandIcon.className = 'ri-arrow-up-s-line';
      } else {
        expandText.textContent = `Show All ${vCards.length} Projects`;
        expandIcon.className = 'ri-arrow-down-s-line';
      }
    }
  }
  
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      updateProjectVisibility();
    });
  }
  
  updateProjectVisibility();

  // Clickable cards
  document.querySelectorAll('.v-card[data-url], .crown-card[data-url], .cert-card[data-url]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const url = card.getAttribute('data-url');
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
}

// ----------------------------------------------------
// ACHIEVEMENTS CATEGORY FILTER
// ----------------------------------------------------
function initAchievementsFilter() {
  const filterBtns = document.querySelectorAll('.video-filter-btn');
  const socialCards = document.querySelectorAll('.social-card');

  if (!filterBtns.length || !socialCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      socialCards.forEach(card => {
        const category = card.dataset.category;
        const matches = (filter === 'all' || category === filter);

        if (matches) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ----------------------------------------------------
// WHATSAPP CONTACT FORM
// ----------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const WHATSAPP_NUMBER = '21656646677';

  const nameInput = document.getElementById('wa-name');
  const companyInput = document.getElementById('wa-company');
  const serviceSelect = document.getElementById('wa-service');
  const budgetSelect = document.getElementById('wa-budget');
  const briefInput = document.getElementById('wa-brief');

  function buildMessage() {
    const name = nameInput ? nameInput.value.trim() : '';
    const company = companyInput ? companyInput.value.trim() : '';
    const service = serviceSelect ? serviceSelect.value : '';
    const budget = budgetSelect ? budgetSelect.value : '';
    const brief = briefInput ? briefInput.value.trim() : '';

    let lines = [];
    lines.push('Hello Yessine!');
    lines.push('');
    let intro = 'My name is *' + (name || '___') + '*';
    if (company) intro += ' from *' + company + '*';
    intro += '.';
    lines.push(intro);
    lines.push('');
    lines.push('Project / Role interest: *' + (service || '___') + '*');
    if (budget) lines.push('Timeline / Budget: *' + budget + '*');
    lines.push('');
    lines.push('Message / Details:');
    lines.push(brief || '___');
    lines.push('');
    lines.push('Looking forward to connecting!');

    return lines.join('\n');
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var msg = buildMessage();
    var encoded = encodeURIComponent(msg);
    var waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encoded;

    window.open(waUrl, '_blank');

    var btn = document.getElementById('wa-submit-btn');
    if (btn) {
      var origHTML = btn.innerHTML;
      btn.innerHTML = '<i class="ri-checkbox-circle-fill"></i> <span>Message Sent to WhatsApp!</span>';
      btn.style.background = 'linear-gradient(135deg, #00BFA5, #00E5FF)';

      setTimeout(function() {
        btn.innerHTML = origHTML;
        btn.style.background = '';
      }, 3000);
    }
  });
}

// ----------------------------------------------------
// LIGHTBOX MODAL FOR IMAGES
// ----------------------------------------------------
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  
  if (!lightbox || !lightboxImg) return;
  
  document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;

    const trigger = e.target.closest('.lightbox-trigger');
    if (trigger) {
      const innerImg = trigger.querySelector('img') || (trigger.tagName === 'IMG' ? trigger : null);
      const imgUrl = innerImg ? innerImg.src : trigger.dataset.img;
      const imgAlt = (innerImg ? innerImg.alt : null) || 'Enlarged View';
      
      if (imgUrl) {
        lightboxImg.src = imgUrl;
        lightboxImg.alt = imgAlt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox')) {
      closeLightbox();
    }
  });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// ----------------------------------------------------
// FOOTER CURRENT YEAR
// ----------------------------------------------------
function initFooterYear() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

// ----------------------------------------------------
// BILINGUAL TRANSLATION SYSTEM (EN / FR)
// ----------------------------------------------------
const translations = {
  en: {
    nav_home: "Cover",
    nav_about: "Specialties",
    nav_resume: "Journey & Stack",
    nav_projects: "Projects",
    nav_certifications: "Credentials",
    nav_social: "Achievements",
    nav_contact: "Connect",
    hero_title: "Computer Engineering Graduate",
    hero_bio: "Software Engineer specializing in designing agentic AI systems, intelligent workflow automation, and enterprise AI solutions.",
    hero_view_resume: "View Resume",
    hero_contact_me: "Contact Me",
    hero_scroll: "Scroll Down",
    about_title: "SPECIALTIES & EXPERTISE",
    about_subtitle: "Bridging artificial intelligence, full-stack architecture, and autonomous automation",
    about_journey_badge: "The Journey",
    about_journey_text: "I'm a fresh <b>Computer Engineering Graduate</b> holding a <b>National Engineering Diploma</b> from the <b>National Engineering School of Sfax (ENIS)</b>. My core academic and personal focus lies in <b>AI/ML, automation, and full-stack development</b>. I love exploring new technologies and building intelligent systems that make a lasting impact.",
    about_view_pdf: "View PDF",
    about_download_cv: "Download CV",
    journey_title: "PROFESSIONAL JOURNEY & STACK",
    journey_subtitle: "Milestones in software engineering, agentic AI development, and technical stack mastery",
    projects_badge: "10+ FEATURED ENGINEERING PROJECTS",
    projects_title: "ENGINEERING PROJECTS",
    projects_subtitle: "Agentic AI architectures, full-stack platforms, MLOps workflows, and smart systems",
    certs_title: "CERTIFICATIONS & CREDENTIALS",
    certs_subtitle: "Industry-standard certifications validating agentic AI architecture and cloud identity capabilities",
    social_title: "SOCIAL & ACHIEVEMENTS",
    social_subtitle: "Leadership roles, national hackathons, CTF victories, and media management achievements",
    connect_badge: "Direct Message",
    connect_headline: "Let's Build<br>Something <span class=\"text-gradient\">Intelligent</span>",
    connect_sub: "Interested in collaborating on AI agents, automation pipelines, or full-stack software development? Fill out the brief or reach out directly.",
    form_name_label: "Your Name *",
    form_company_label: "Company / Organization",
    form_service_label: "Interest / Service *",
    form_budget_label: "Timeline / Scope",
    form_brief_label: "Project Brief / Message *",
    form_name_ph: "e.g. Ahmed Ben Ali",
    form_company_ph: "e.g. Inetum, Tech Corp, Freelance",
    form_brief_ph: "Describe your project, role, or opportunity...",
    form_send_wa: "Send via WhatsApp",
    footer_rights: "© 2026 Yessine Fakhfakh. All Rights Reserved."
  },
  fr: {
    nav_home: "Accueil",
    nav_about: "Spécialités",
    nav_resume: "Parcours & Stack",
    nav_projects: "Projets",
    nav_certifications: "Certifications",
    nav_social: "Réalisations",
    nav_contact: "Contact",
    hero_title: "Ingénieur en Génie Informatique",
    hero_bio: "Ingénieur logiciel spécialisé dans la conception de systèmes d'IA agentique, l'automatisation intelligente des workflows et les solutions d'IA d'entreprise.",
    hero_view_resume: "Voir le CV",
    hero_contact_me: "Me Contacter",
    hero_scroll: "Défiler vers le bas",
    about_title: "SPÉCIALITÉS & EXPERTISE",
    about_subtitle: "À la croisée de l'intelligence artificielle, de l'architecture full-stack et de l'automatisation autonome",
    about_journey_badge: "Mon Parcours",
    about_journey_text: "Je suis un jeune <b>Ingénieur en Génie Informatique</b> diplômé de l'<b>École Nationale d'Ingénieurs de Sfax (ENIS)</b>. Mes axes de prédilection sont l'<b>IA/ML, l'automatisation et le développement full-stack</b>. Passionné par l'innovation, je conçois des systèmes intelligents à fort impact.",
    about_view_pdf: "Voir le PDF",
    about_download_cv: "Télécharger le CV",
    journey_title: "PARCOURS & COMPÉTENCES",
    journey_subtitle: "Étapes clés en génie logiciel, développement d'IA agentique et maîtrise technique",
    projects_badge: "10+ PROJETS D'INGÉNIERIE",
    projects_title: "PROJETS D'INGÉNIERIE",
    projects_subtitle: "Architectures d'IA agentique, plateformes full-stack, pipelines MLOps et systèmes intelligents",
    certs_title: "CERTIFICATIONS & TITRES",
    certs_subtitle: "Certifications officielles attestant des compétences en IA agentique et gestion des identités cloud",
    social_title: "RÉALISATIONS & LEADERSHIP",
    social_subtitle: "Rôles de leadership, hackathons nationaux, victoires en CTF et gestion média",
    connect_badge: "Message Direct",
    connect_headline: "Construisons Ensemble<br>Quelque Chose d'<span class=\"text-gradient\">Intelligent</span>",
    connect_sub: "Vous souhaitez collaborer sur des agents d'IA, des pipelines d'automatisation ou du développement logiciel ? Remplissez ce brief ou contactez-moi directement.",
    form_name_label: "Votre Nom *",
    form_company_label: "Entreprise / Organisation",
    form_service_label: "Intérêt / Service *",
    form_budget_label: "Délai / Envergure",
    form_brief_label: "Brief du Projet / Message *",
    form_name_ph: "ex. Ahmed Ben Ali",
    form_company_ph: "ex. Inetum, Tech Corp, Freelance",
    form_brief_ph: "Décrivez votre projet, opportunité ou mission...",
    form_send_wa: "Envoyer via WhatsApp",
    footer_rights: "© 2026 Yessine Fakhfakh. Tous droits réservés."
  }
};

function updateLangPillUI(lang) {
  const langPill = document.getElementById('lang-toggle');
  const options = document.querySelectorAll('.lang-pill__option');
  
  options.forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
  
  if (langPill) {
    langPill.classList.toggle('fr-active', lang === 'fr');
    langPill.title = lang === 'fr' ? 'Traduire en Anglais' : 'Translate to French';
  }
}

function setLanguage(lang) {
  const currentDict = translations[lang] || translations.en;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (currentDict[key]) {
      el.innerHTML = currentDict[key];
    }
  });
  
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (currentDict[key]) {
      el.placeholder = currentDict[key];
    }
  });
  
  updateLangPillUI(lang);
  localStorage.setItem('lang', lang);
}

function initLanguageToggle() {
  const langPill = document.getElementById('lang-toggle');
  const savedLang = localStorage.getItem('lang') || 'en';
  
  setLanguage(savedLang);
  
  if (langPill) {
    const toggleFunc = () => {
      const currentLang = localStorage.getItem('lang') || 'en';
      const newLang = currentLang === 'en' ? 'fr' : 'en';
      setLanguage(newLang);
    };
    langPill.addEventListener('click', toggleFunc);
    langPill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFunc();
      }
    });
  }
}

// ----------------------------------------------------
// BOOTSTRAP
// ----------------------------------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}