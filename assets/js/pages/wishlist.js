const wishlistItems = [
  { id: 1, name: 'Vintage Camera', category: 'Electronics', owner: 'Rina', score: 96, badge: 'Trending' },
  { id: 2, name: 'Desk Lamp', category: 'Home', owner: 'Adit', score: 91, badge: 'Popular' },
  { id: 3, name: 'Running Shoes', category: 'Sports', owner: 'Nadia', score: 94, badge: 'Hot' },
  { id: 4, name: 'Portable Speaker', category: 'Audio', owner: 'Lala', score: 92, badge: 'New' },
  { id: 5, name: 'Bookshelf', category: 'Furniture', owner: 'Dian', score: 88, badge: 'Classic' },
  { id: 6, name: 'Backpack', category: 'Travel', owner: 'Joko', score: 90, badge: 'Popular' },
  { id: 7, name: 'Coffee Maker', category: 'Home', owner: 'Mila', score: 89, badge: 'Fresh' },
  { id: 8, name: 'Monitor Stand', category: 'Office', owner: 'Sari', score: 95, badge: 'Trending' }
];

const searchInput = document.getElementById('wishlistSearch');
const categoryFilter = document.getElementById('categoryFilter');
const grid = document.getElementById('wishlistGrid');
const recommendedList = document.getElementById('recommendedList');

function renderWishlist() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const filtered = wishlistItems.filter((item) => {
    const matchesQuery = `${item.name} ${item.owner} ${item.category}`.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  grid.innerHTML = filtered.map((item) => `
    <article class="card">
      <div class="placeholder">${item.name}</div>
      <h4>${item.name}</h4>
      <p class="meta">${item.category}</p>
      <p class="meta">Owner: ${item.owner}</p>
      <span class="score">SwapScore ${item.score}</span>
      <div class="actions">
        <button class="btn btn-ghost" data-remove="${item.id}">Remove</button>
        <button class="btn btn-primary">View Detail</button>
      </div>
    </article>
  `).join('');

  recommendedList.innerHTML = wishlistItems.slice(0, 3).map((item) => `
    <div class="item">
      <div>
        <strong>${item.name}</strong>
        <div class="meta">${item.category} • ${item.owner}</div>
      </div>
      <span class="score">${item.score}</span>
    </div>
  `).join('');
}

grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  const id = Number(button.getAttribute('data-remove'));
  const itemIndex = wishlistItems.findIndex((item) => item.id === id);
  if (itemIndex >= 0) {
    wishlistItems.splice(itemIndex, 1);
    renderWishlist();
  }
});

searchInput.addEventListener('input', renderWishlist);
categoryFilter.addEventListener('change', renderWishlist);
renderWishlist();
