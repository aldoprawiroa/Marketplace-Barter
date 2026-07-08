/**
 * landing.js — SwapSpace V2 Landing Page
 * Handles navigation, dummy data rendering, and interactions.
 */

(function () {
  'use strict';

  /* ====================================================================
     DATA
     ==================================================================== */

  const FEATURES = [
    {
      icon: '&#x1F6E1;',
      color: 'blue',
      title: 'Safe Exchange',
      description: 'Every swap is protected with our verification system. Trade with confidence knowing your items are secure.'
    },
    {
      icon: '&#x1F9E9;',
      color: 'green',
      title: 'Smart Matching',
      description: 'Our algorithm suggests the best matches for your items based on preferences, location, and fair value.'
    },
    {
      icon: '&#x2714;',
      color: 'amber',
      title: 'Verified Users',
      description: 'All users go through verification. Know who you are trading with every single time.'
    },
    {
      icon: '&#x26A1;',
      color: 'purple',
      title: 'Fast Communication',
      description: 'Built-in chat and notifications keep you connected with your swap partners in real time.'
    }
  ];

  const CATEGORIES = [
    { icon: '&#x1F4F1;', name: 'Electronics' },
    { icon: '&#x1F455;', name: 'Fashion' },
    { icon: '&#x1F4DA;', name: 'Books' },
    { icon: '&#x1F3AE;', name: 'Gaming' },
    { icon: '&#x1FA91;', name: 'Furniture' },
    { icon: '&#x26BD;', name: 'Sports' }
  ];

  const FEATURED_ITEMS = [
    {
      image: '&#x1F4F1;',
      name: 'iPhone 14 Pro Max',
      category: 'Electronics',
      condition: 'Like New',
      score: '95',
      owner: 'Aldo',
      initials: 'AP'
    },
    {
      image: '&#x1F4DA;',
      name: 'Clean Code by Robert C. Martin',
      category: 'Books',
      condition: 'Good',
      score: '88',
      owner: 'Sari',
      initials: 'SR'
    },
    {
      image: '&#x1F3AE;',
      name: 'Nintendo Switch OLED',
      category: 'Gaming',
      condition: 'Like New',
      score: '92',
      owner: 'Budi',
      initials: 'BD'
    },
    {
      image: '&#x1F455;',
      name: 'Vintage Denim Jacket',
      category: 'Fashion',
      condition: 'Good',
      score: '85',
      owner: 'Rina',
      initials: 'RN'
    },
    {
      image: '&#x1FA91;',
      name: 'IKEA Standing Desk',
      category: 'Furniture',
      condition: 'Excellent',
      score: '90',
      owner: 'Dimas',
      initials: 'DM'
    },
    {
      image: '&#x26BD;',
      name: 'Adidas Predator Boots',
      category: 'Sports',
      condition: 'Like New',
      score: '87',
      owner: 'Farel',
      initials: 'FR'
    }
  ];

  const STEPS = [
    {
      number: '1',
      icon: '&#x1F4F7;',
      title: 'Upload Item',
      description: 'Take a photo, add a description, and list your item in seconds.'
    },
    {
      number: '2',
      icon: '&#x1F50D;',
      title: 'Find Match',
      description: 'Browse the marketplace or let our smart matching find the perfect swap for you.'
    },
    {
      number: '3',
      icon: '&#x1F91D;',
      title: 'Complete Swap',
      description: 'Agree on the exchange, meet safely, and complete your swap with confidence.'
    }
  ];

  const STATISTICS = [
    { value: '2,450+', label: 'Happy Users' },
    { value: '8,120', label: 'Items Listed' },
    { value: '3,800', label: 'Successful Swaps' },
    { value: '12', label: 'Cities' }
  ];

  const TESTIMONIALS = [
    {
      text: 'SwapSpace completely changed how I trade my stuff. It\'s safe, easy, and I\'ve met amazing people through it!',
      name: 'Sarah Putri',
      role: 'University Student',
      initials: 'SP'
    },
    {
      text: 'I swapped my old laptop for a camera I\'ve always wanted. The matching system is incredibly accurate.',
      name: 'Rizky Ananda',
      role: 'Photographer',
      initials: 'RA'
    },
    {
      text: 'As a collector, SwapSpace is a game changer. I found rare items I couldn\'t find anywhere else.',
      name: 'Dian Kusuma',
      role: 'Collector',
      initials: 'DK'
    }
  ];

  /* ====================================================================
     DOM CACHE
     ==================================================================== */

  const DOM = {
    nav: document.getElementById('landing-nav'),
    menuToggle: document.getElementById('nav-menu-toggle'),
    mobileOverlay: document.getElementById('mobile-nav-overlay'),
    mobilePanel: document.getElementById('mobile-nav-panel'),
    mobileClose: document.getElementById('mobile-nav-close'),
    featuresGrid: document.getElementById('features-grid'),
    categoriesGrid: document.getElementById('categories-grid'),
    featuredGrid: document.getElementById('featured-grid'),
    stepsGrid: document.getElementById('steps-grid'),
    statsGrid: document.getElementById('stats-grid'),
    testimonialsGrid: document.getElementById('testimonials-grid')
  };

  /* ====================================================================
     RENDER FUNCTIONS
     ==================================================================== */

  function renderFeatures() {
    if (!DOM.featuresGrid) return;
    DOM.featuresGrid.innerHTML = FEATURES.map(function (f) {
      return '<div class="feature-card">' +
        '<div class="feature-icon ' + f.color + '">' + f.icon + '</div>' +
        '<h3>' + f.title + '</h3>' +
        '<p>' + f.description + '</p>' +
        '</div>';
    }).join('');
  }

  function renderCategories() {
    if (!DOM.categoriesGrid) return;
    DOM.categoriesGrid.innerHTML = CATEGORIES.map(function (c) {
      return '<a href="marketplace.html" class="category-card">' +
        '<div class="category-icon">' + c.icon + '</div>' +
        '<span>' + c.name + '</span>' +
        '</a>';
    }).join('');
  }

  function renderFeaturedItems() {
    if (!DOM.featuredGrid) return;
    DOM.featuredGrid.innerHTML = FEATURED_ITEMS.map(function (item) {
      return '<div class="item-card">' +
        '<div class="item-card-image">' +
          '<span class="item-card-badge">Score ' + item.score + '</span>' +
          item.image +
        '</div>' +
        '<div class="item-card-body">' +
          '<div class="item-card-category">' + item.category + '</div>' +
          '<div class="item-card-title">' + item.name + '</div>' +
          '<div class="item-card-meta">' +
            '<span class="item-card-condition">' + item.condition + '</span>' +
            '<span class="item-card-owner">' +
              '<span class="item-card-avatar">' + item.initials + '</span>' +
              item.owner +
            '</span>' +
          '</div>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  function renderSteps() {
    if (!DOM.stepsGrid) return;
    DOM.stepsGrid.innerHTML = STEPS.map(function (s) {
      return '<div class="step-card">' +
        '<div class="step-number">' + s.number + '</div>' +
        '<div class="step-icon">' + s.icon + '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.description + '</p>' +
        '</div>';
    }).join('');
  }

  function renderStatistics() {
    if (!DOM.statsGrid) return;
    DOM.statsGrid.innerHTML = STATISTICS.map(function (s) {
      return '<div class="stat-card">' +
        '<div class="stat-value">' + s.value + '</div>' +
        '<div class="stat-label">' + s.label + '</div>' +
        '</div>';
    }).join('');
  }

  function renderTestimonials() {
    if (!DOM.testimonialsGrid) return;
    DOM.testimonialsGrid.innerHTML = TESTIMONIALS.map(function (t) {
      return '<div class="testimonial-card">' +
        '<div class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
        '<p class="testimonial-text">"' + t.text + '"</p>' +
        '<div class="testimonial-author">' +
          '<div class="testimonial-avatar">' + t.initials + '</div>' +
          '<div>' +
            '<div class="testimonial-name">' + t.name + '</div>' +
            '<div class="testimonial-role">' + t.role + '</div>' +
          '</div>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  /* ====================================================================
     NAVIGATION
     ==================================================================== */

  function handleNavScroll() {
    if (!DOM.nav) return;
    if (window.scrollY > 20) {
      DOM.nav.classList.add('scrolled');
    } else {
      DOM.nav.classList.remove('scrolled');
    }
  }

  function openMobileNav() {
    if (DOM.mobileOverlay) DOM.mobileOverlay.classList.add('active');
    if (DOM.mobilePanel) DOM.mobilePanel.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (DOM.mobileOverlay) DOM.mobileOverlay.classList.remove('active');
    if (DOM.mobilePanel) DOM.mobilePanel.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ====================================================================
     EVENTS
     ==================================================================== */

  function bindEvents() {
    window.addEventListener('scroll', handleNavScroll);

    if (DOM.menuToggle) {
      DOM.menuToggle.addEventListener('click', openMobileNav);
    }
    if (DOM.mobileClose) {
      DOM.mobileClose.addEventListener('click', closeMobileNav);
    }
    if (DOM.mobileOverlay) {
      DOM.mobileOverlay.addEventListener('click', closeMobileNav);
    }
  }

  /* ====================================================================
     INITIALIZE
     ==================================================================== */

  function init() {
    renderFeatures();
    renderCategories();
    renderFeaturedItems();
    renderSteps();
    renderStatistics();
    renderTestimonials();
    bindEvents();
    handleNavScroll();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
