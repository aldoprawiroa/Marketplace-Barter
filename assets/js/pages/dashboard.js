/**
 * dashboard.js — SwapSpace V2 Dashboard
 * Handles data rendering, notifications, and interactions.
 */

(function () {
  'use strict';

  /* ====================================================================
     DATA
     ==================================================================== */

  const SUMMARY_CARDS = [
    {
      icon: '&#x1F4E6;',
      color: 'blue',
      value: '24',
      label: 'Items Listed',
      trend: '+3',
      trendDir: 'up'
    },
    {
      icon: '&#x1F91D;',
      color: 'green',
      value: '18',
      label: 'Successful Swaps',
      trend: '+2',
      trendDir: 'up'
    },
    {
      icon: '&#x23F3;',
      color: 'amber',
      value: '5',
      label: 'Pending Requests',
      trend: '-1',
      trendDir: 'down'
    },
    {
      icon: '&#x2764;',
      color: 'purple',
      value: '12',
      label: 'Wishlist',
      trend: '+4',
      trendDir: 'up'
    }
  ];

  const QUICK_ACTIONS = [
    { icon: '&#x1F4F7;', label: 'Upload Item', href: 'inventory.html' },
    { icon: '&#x1F50D;', label: 'Browse Marketplace', href: 'marketplace.html' },
    { icon: '&#x1F4CB;', label: 'Swap History', href: 'history.html' },
    { icon: '&#x1F464;', label: 'Profile', href: 'profile.html' }
  ];

  const RECENT_LISTINGS = [
    {
      icon: '&#x1F4F1;',
      name: 'iPhone 14 Pro Max',
      category: 'Electronics',
      status: 'active',
      statusLabel: 'Active'
    },
    {
      icon: '&#x1F4DA;',
      name: 'Clean Code — Robert C. Martin',
      category: 'Books',
      status: 'pending',
      statusLabel: 'Pending'
    },
    {
      icon: '&#x1F3AE;',
      name: 'Nintendo Switch OLED',
      category: 'Gaming',
      status: 'swapped',
      statusLabel: 'Swapped'
    },
    {
      icon: '&#x1F455;',
      name: 'Vintage Denim Jacket',
      category: 'Fashion',
      status: 'active',
      statusLabel: 'Active'
    }
  ];

  const NOTIFICATIONS = [
    {
      icon: 'info',
      text: '<strong>Sari</strong> sent you a swap request for your iPhone 14 Pro Max.',
      time: '2 minutes ago'
    },
    {
      icon: 'success',
      text: 'Your swap with <strong>Budi</strong> has been completed successfully!',
      time: '1 hour ago'
    },
    {
      icon: 'warning',
      text: 'Your listing for <strong>Vintage Denim Jacket</strong> is about to expire.',
      time: '3 hours ago'
    }
  ];

  const ACTIVITY_TIMELINE = [
    {
      type: 'swap',
      icon: '&#x1F504;',
      text: 'You completed a swap with <strong>Budi</strong> for Nintendo Switch OLED.',
      time: '1 hour ago'
    },
    {
      type: 'listing',
      icon: '&#x2795;',
      text: 'You listed <strong>Vintage Denim Jacket</strong> in Fashion category.',
      time: '3 hours ago'
    },
    {
      type: 'notification',
      icon: '&#x1F514;',
      text: '<strong>Rina</strong> added your Clean Code book to her wishlist.',
      time: '5 hours ago'
    },
    {
      type: 'swap',
      icon: '&#x1F4AC;',
      text: 'You received a swap request from <strong>Sari</strong>.',
      time: 'Yesterday'
    }
  ];

  const WISHLIST_ITEMS = [
    { icon: '&#x1F4F7;', name: 'Canon EOS R5', category: 'Electronics', status: 'active', statusLabel: 'Available' },
    { icon: '&#x1F3B8;', name: 'Fender Stratocaster', category: 'Music', status: 'pending', statusLabel: 'Reserved' },
    { icon: '&#x1F4DA;', name: 'Design Patterns — GoF', category: 'Books', status: 'active', statusLabel: 'Available' }
  ];

  /* ====================================================================
     DOM CACHE
     ==================================================================== */

  const DOM = {
    summaryCards: document.getElementById('summary-cards'),
    quickActions: document.getElementById('quick-actions'),
    recentListings: document.getElementById('recent-listings'),
    notificationsList: document.getElementById('notifications-list'),
    notificationCount: document.getElementById('notification-count'),
    clearNotifications: document.getElementById('clear-notifications'),
    activityTimeline: document.getElementById('activity-timeline'),
    wishlistPreview: document.getElementById('wishlist-preview'),
    navToggle: document.getElementById('dashboard-nav-toggle'),
    navLinks: document.getElementById('dashboard-nav-links')
  };

  /* ====================================================================
     RENDER FUNCTIONS
     ==================================================================== */

  function renderSummaryCards() {
    if (!DOM.summaryCards) return;
    DOM.summaryCards.innerHTML = SUMMARY_CARDS.map(function (card) {
      return '<div class="summary-card ' + card.color + '">' +
        '<div class="summary-card-header">' +
          '<div class="summary-card-icon">' + card.icon + '</div>' +
          '<span class="summary-card-trend ' + card.trendDir + '">' + card.trend + '</span>' +
        '</div>' +
        '<div class="summary-card-value">' + card.value + '</div>' +
        '<div class="summary-card-label">' + card.label + '</div>' +
        '</div>';
    }).join('');
  }

  function renderQuickActions() {
    if (!DOM.quickActions) return;
    DOM.quickActions.innerHTML = QUICK_ACTIONS.map(function (action) {
      return '<a href="' + action.href + '" class="quick-action-btn">' +
        '<div class="quick-action-icon">' + action.icon + '</div>' +
        '<span>' + action.label + '</span>' +
        '</a>';
    }).join('');
  }

  function renderRecentListings() {
    if (!DOM.recentListings) return;
    DOM.recentListings.innerHTML = RECENT_LISTINGS.map(function (item) {
      return '<div class="recent-listing-item">' +
        '<div class="listing-thumb">' + item.icon + '</div>' +
        '<div class="listing-info">' +
          '<div class="listing-name">' + item.name + '</div>' +
          '<div class="listing-category">' + item.category + '</div>' +
        '</div>' +
        '<span class="listing-status ' + item.status + '">' + item.statusLabel + '</span>' +
        '</div>';
    }).join('');
  }

  function renderNotifications() {
    if (!DOM.notificationsList) return;
    DOM.notificationsList.innerHTML = NOTIFICATIONS.map(function (notif, index) {
      return '<div class="notification-item" data-index="' + index + '">' +
        '<div class="notification-icon ' + notif.icon + '">' +
          (notif.icon === 'info' ? '&#x2139;' : notif.icon === 'success' ? '&#x2714;' : '&#x26A0;') +
        '</div>' +
        '<div class="notification-body">' +
          '<div class="notification-text">' + notif.text + '</div>' +
          '<div class="notification-time">' + notif.time + '</div>' +
        '</div>' +
        '<button class="notification-close" data-dismiss="' + index + '" aria-label="Dismiss">&times;</button>' +
        '</div>';
    }).join('');
  }

  function renderActivityTimeline() {
    if (!DOM.activityTimeline) return;
    DOM.activityTimeline.innerHTML = '<div class="timeline">' +
      ACTIVITY_TIMELINE.map(function (item) {
        return '<div class="timeline-item">' +
          '<div class="timeline-dot ' + item.type + '">' + item.icon + '</div>' +
          '<div class="timeline-content">' +
            '<div class="timeline-text">' + item.text + '</div>' +
            '<div class="timeline-time">' + item.time + '</div>' +
          '</div>' +
          '</div>';
      }).join('') +
      '</div>';
  }

  function renderWishlistPreview() {
    if (!DOM.wishlistPreview) return;
    DOM.wishlistPreview.innerHTML = WISHLIST_ITEMS.map(function (item) {
      return '<div class="recent-listing-item">' +
        '<div class="listing-thumb">' + item.icon + '</div>' +
        '<div class="listing-info">' +
          '<div class="listing-name">' + item.name + '</div>' +
          '<div class="listing-category">' + item.category + '</div>' +
        '</div>' +
        '<span class="listing-status ' + item.status + '">' + item.statusLabel + '</span>' +
        '</div>';
    }).join('');
  }

  /* ====================================================================
     INTERACTIONS
     ==================================================================== */

  function handleNotificationClose(e) {
    var btn = e.target.closest('[data-dismiss]');
    if (!btn) return;
    var item = btn.closest('.notification-item');
    if (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateX(20px)';
      item.style.transition = 'all 0.3s ease';
      setTimeout(function () {
        item.remove();
        updateNotificationCount();
      }, 300);
    }
  }

  function handleClearNotifications() {
    if (!DOM.notificationsList) return;
    DOM.notificationsList.innerHTML = '<div style="padding:1.5rem;text-align:center;color:var(--color-neutral-400);font-size:var(--font-size-sm);">No new notifications</div>';
    updateNotificationCount();
  }

  function updateNotificationCount() {
    if (!DOM.notificationCount) return;
    var items = document.querySelectorAll('.notification-item');
    var count = items.length;
    DOM.notificationCount.textContent = count;
    if (count === 0) {
      DOM.notificationCount.style.display = 'none';
    }
  }

  function handleNavToggle() {
    if (!DOM.navLinks) return;
    var isVisible = DOM.navLinks.style.display === 'flex';
    DOM.navLinks.style.display = isVisible ? 'none' : 'flex';
  }

  /* ====================================================================
     GREETING
     ==================================================================== */

  function updateGreeting() {
    var greetingEl = document.querySelector('.dashboard-greeting h1');
    if (!greetingEl) return;

    var hour = new Date().getHours();
    var greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';

    greetingEl.innerHTML = greeting + ', Aldo &#x1F44B;';
  }

  /* ====================================================================
     EVENTS
     ==================================================================== */

  function bindEvents() {
    if (DOM.notificationsList) {
      DOM.notificationsList.addEventListener('click', handleNotificationClose);
    }
    if (DOM.clearNotifications) {
      DOM.clearNotifications.addEventListener('click', handleClearNotifications);
    }
    if (DOM.navToggle) {
      DOM.navToggle.addEventListener('click', handleNavToggle);
    }
  }

  /* ====================================================================
     INITIALIZE
     ==================================================================== */

  function init() {
    updateGreeting();
    renderSummaryCards();
    renderQuickActions();
    renderRecentListings();
    renderNotifications();
    renderActivityTimeline();
    renderWishlistPreview();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
