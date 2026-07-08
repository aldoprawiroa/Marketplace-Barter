const notifications = [
  { id: 1, type: 'Swap Request', title: 'New swap request received', description: 'Alicia wants to exchange a lamp for your desk set.', time: '5 min ago', unread: true },
  { id: 2, type: 'Swap Accepted', title: 'Your swap was accepted', description: 'The request for the vintage camera is now approved.', time: '22 min ago', unread: true },
  { id: 3, type: 'Swap Rejected', title: 'Swap request declined', description: 'The backpack exchange could not be completed this time.', time: '1 hr ago', unread: false },
  { id: 4, type: 'Wishlist Update', title: 'Wishlist item became available', description: 'A matching item for your wishlist is now live.', time: '2 hr ago', unread: false },
  { id: 5, type: 'New Item', title: 'Fresh listing added', description: 'A new speaker listing just arrived in your area.', time: '4 hr ago', unread: true },
  { id: 6, type: 'System', title: 'Profile verified', description: 'Your profile is now verified for premium swaps.', time: 'Yesterday', unread: false }
];

const list = document.getElementById('notificationList');
const filterSelect = document.getElementById('notificationFilter');
const markAllButton = document.getElementById('markAllRead');
const summaryText = document.getElementById('summaryText');

function renderNotifications() {
  const filter = filterSelect.value;
  const visible = notifications.filter((item) => filter === 'All' || item.type === filter);
  list.innerHTML = visible.map((item) => `
    <article class="item ${item.unread ? 'unread' : ''}">
      <div class="icon">${item.type.charAt(0)}</div>
      <div class="content">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
      <div class="time-badge">
        <span class="badge ${item.unread ? 'unread' : 'read'}">${item.unread ? 'Unread' : 'Read'}</span>
        <span>${item.time}</span>
      </div>
    </article>
  `).join('');

  const unreadCount = notifications.filter((item) => item.unread).length;
  summaryText.textContent = `${unreadCount} unread • ${notifications.length} total`;
}

list.addEventListener('click', (event) => {
  const item = event.target.closest('.item');
  if (!item) return;
  const index = notifications.findIndex((entry) => entry.title === item.querySelector('h4').textContent);
  if (index >= 0) {
    notifications[index].unread = false;
    renderNotifications();
  }
});

filterSelect.addEventListener('change', renderNotifications);
markAllButton.addEventListener('click', () => {
  notifications.forEach((entry) => {
    entry.unread = false;
  });
  renderNotifications();
});

renderNotifications();
