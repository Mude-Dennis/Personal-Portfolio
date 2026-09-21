/* =========================================================
   DENNIS KYULE MULI — PORTFOLIO SCRIPT
   Vanilla JavaScript only. No dependencies.
   Handles: mobile menu, active nav highlighting,
   scroll-reveal animations, and the project detail modal.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');

  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  function openMenu() {
    mainNav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  function setActiveLink() {
    var scrollPos = window.scrollY + 130; // offset for sticky header
    var currentId = sections.length ? sections[0].id : null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var targetId = link.getAttribute('href').replace('#', '');
      if (targetId === currentId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
  }

  /* ---------- Scroll-reveal animations ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Project detail modal ---------- */
  var projectData = {
    'farmers-help': {
      category: 'AgriTech · Soil testing',
      title: 'Farmers Help',
      image: 'images/Dennis Kyule Muli with his Farmers Help team(Mksu Hackfest).png',
      description: 'Farmers Help is an agricultural technology initiative led by Dennis Kyule Muli, focused on helping farmers understand their soil through practical soil testing. The project explored the development of a portable soil laboratory using sensors, microcontrollers and testing techniques, aimed at giving farmers clearer, faster information about their land. (The concept used at Farmers Help was presented at Mksu Hackfest and came out first place in the Agri-Tech category).',
      tags: ['Arduino', 'ESP32', 'Soil sensors', 'RS485', 'Environmental sensing', 'Soil testing', 'Data processing']
    },
    'chargeagain': {
      category: 'Energy · Battery technology',
      title: 'ChargeAgain',
      image: 'images/Dennis Kyule Muli presenting Project ChargeAgain and winning an Award with his patner at Enactus National Expo 2025 .png',
      description: 'ChargeAgain explores ways of extending the usefulness of batteries and making energy storage more accessible. The project involved battery monitoring, battery management concepts, ESP32-based systems and a digital interface for tracking battery information in real time. It was an award-winning project(led by Dennis Kyule Muli) at the 2025 Enactus National Expo.',
      tags: ['ESP32', 'Battery management', 'Sensors', 'Firebase', 'Energy storage', 'Embedded systems']
    },
  
'recykroute': {
  category: 'Waste Management · Innovation · Field Research',
  title: 'Recykroute',
  image: 'images/Dennis Kyule Muli presenting project Recykroute and enganging with stakeholdes in the field.png',
  description: 'A waste management project developed through the Timbuktoo platform, supported by UNDP. The project involved extensive field research across Machakos County, engaging county officials, waste collectors, aggregators, property managers, caretakers and other stakeholders to understand waste management challenges and test practical approaches through an experimental pilot.',
  tags: ['Waste Management', 'Field Research', 'Stakeholder Engagement', 'Machakos County', 'Pilot Testing']
},

    'bornelabs': {
      category: 'Innovation · Entrepreneurship',
      title: 'BorneLabs',
      image: 'images/BornelabsLogo.png',
      description: 'BorneLabs is an innovation community focused on exploration, technology and practical problem solving. It represents the entrepreneurial and innovation side of my work — a space for testing ideas and building alongside other people who like making things.',
      tags: ['Innovation', 'Community building', 'Product thinking']
    }
  };

  var modalOverlay = document.getElementById('modalOverlay');
  var modalImage = document.getElementById('modalImage');
  var modalCategory = document.getElementById('modalCategory');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var modalTags = document.getElementById('modalTags');
  var modalClose = document.getElementById('modalClose');
  var lastFocusedEl = null;

  function openModal(projectKey) {
    var data = projectData[projectKey];
    if (!data || !modalOverlay) return;

    modalImage.src = data.image;
    modalImage.alt = data.title + ' project image';
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    modalTags.innerHTML = '';
    data.tags.forEach(function (tag) {
      var li = document.createElement('li');
      li.textContent = tag;
      modalTags.appendChild(li);
    });

    lastFocusedEl = document.activeElement;
    modalOverlay.hidden = false;
    requestAnimationFrame(function () {
      modalOverlay.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      modalOverlay.hidden = true;
    }, 260);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll('[data-open-project]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-open-project'));
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay && !modalOverlay.hidden) {
      closeModal();
    }
  });

});
