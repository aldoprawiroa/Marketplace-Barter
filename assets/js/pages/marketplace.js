const products = [
  {
    id: 1,
    name: 'UltraLite Laptop',
    category: 'Electronics',
    condition: 'Like New',
    swapScore: 94,
    owner: 'Maya',
    location: 'Bandung',
    description: 'Lightweight laptop with 16GB RAM and a bright OLED display for work and study.',
    specs: ['16GB RAM', '512GB SSD', '12-hour battery'],
    gallery: ['💻', '📱', '⌨️'],
    createdAt: 20260701,
    featured: true,
    wishlist: false
  },
  {
    id: 2,
    name: 'Vintage Denim Jacket',
    category: 'Fashion',
    condition: 'Good',
    swapScore: 88,
    owner: 'Ari',
    location: 'Jakarta',
    description: 'A timeless denim jacket with a clean fit and durable stitching.',
    specs: ['Classic fit', '100% cotton', 'Mid-wash'],
    gallery: ['🧥', '👕', '🧵'],
    createdAt: 20260626,
    featured: false,
    wishlist: false
  },
  {
    id: 3,
    name: 'Studio Ghibli Box Set',
    category: 'Books',
    condition: 'New',
    swapScore: 91,
    owner: 'Nadia',
    location: 'Yogyakarta',
    description: 'Collector-friendly edition of beloved animation classics.',
    specs: ['Hardcover', 'Signed poster', 'Bonus booklet'],
    gallery: ['📚', '🎞️', '✨'],
    createdAt: 20260621,
    featured: true,
    wishlist: false
  },
  {
    id: 4,
    name: 'PS5 Controller Bundle',
    category: 'Gaming',
    condition: 'Good',
    swapScore: 90,
    owner: 'Rian',
    location: 'Surabaya',
    description: 'Comfortable controller bundle with charging dock and braided cable.',
    specs: ['DualSense', 'Charge dock', 'Fast charging'],
    gallery: ['🎮', '🔋', '🎲'],
    createdAt: 20260615,
    featured: false,
    wishlist: false
  },
  {
    id: 5,
    name: 'Scandinavian Side Table',
    category: 'Furniture',
    condition: 'Like New',
    swapScore: 87,
    owner: 'Lina',
    location: 'Semarang',
    description: 'Minimal side table with rounded edges and oak finish.',
    specs: ['Oak finish', 'Compact size', 'Assembly included'],
    gallery: ['🪑', '🪵', '🛋️'],
    createdAt: 20260612,
    featured: false,
    wishlist: false
  },
  {
    id: 6,
    name: 'Trail Running Shoes',
    category: 'Sports',
    condition: 'Fair',
    swapScore: 82,
    owner: 'Bimo',
    location: 'Medan',
    description: 'Responsive trail shoes ready for weekend hikes and city runs.',
    specs: ['Size 42', 'Lightweight', 'Grip outsole'],
    gallery: ['👟', '🏞️', '⚡'],
    createdAt: 20260528,
    featured: false,
    wishlist: false
  },
  {
    id: 7,
    name: 'Smart Blender',
    category: 'Electronics',
    condition: 'New',
    swapScore: 92,
    owner: 'Dina',
    location: 'Bali',
    description: 'High-speed blender with preset recipes and a self-cleaning mode.',
    specs: ['1200W', 'Stainless blade', 'Preset cycles'],
    gallery: ['🥤', '⚙️', '🧪'],
    createdAt: 20260520,
    featured: true,
    wishlist: false
  },
  {
    id: 8,
    name: 'Minimalist Desk Lamp',
    category: 'Furniture',
    condition: 'Good',
    swapScore: 85,
    owner: 'Hana',
    location: 'Depok',
    description: 'Warm LED desk lamp suitable for studying and reading.',
    specs: ['Adjustable arm', 'Touch dimmer', 'USB-C powered'],
    gallery: ['💡', '🪑', '📖'],
    createdAt: 20260518,
    featured: false,
    wishlist: false
  },
  {
    id: 9,
    name: 'Retro Camera',
    category: 'Electronics',
    condition: 'Like New',
    swapScore: 89,
    owner: 'Fajar',
    location: 'Solo',
    description: 'Compact camera with a retro feel and crisp manual controls.',
    specs: ['35mm lens', 'Manual focus', 'Film-ready'],
    gallery: ['📷', '🎞️', '📸'],
    createdAt: 20260430,
    featured: false,
    wishlist: false
  },
  {
    id: 10,
    name: 'Chess Set Collector Edition',
    category: 'Gaming',
    condition: 'New',
    swapScore: 86,
    owner: 'Tasya',
    location: 'Palembang',
    description: 'A luxurious chess set with marble board and brass pieces.',
    specs: ['Marble board', 'Brass pieces', 'Storage box'],
    gallery: ['♟️', '🧠', '🎲'],
    createdAt: 20260422,
    featured: false,
    wishlist: false
  },
  {
    id: 11,
    name: 'Travel Backpack',
    category: 'Others',
    condition: 'Good',
    swapScore: 84,
    owner: 'Kiki',
    location: 'Malang',
    description: 'Water-resistant travel backpack with smart organizer pockets.',
    specs: ['55L', 'Laptop sleeve', 'USB charging port'],
    gallery: ['🎒', '🧳', '🗺️'],
    createdAt: 20260418,
    featured: false,
    wishlist: false
  },
  {
    id: 12,
    name: 'Indoor Plant Starter Kit',
    category: 'Others',
    condition: 'New',
    swapScore: 83,
    owner: 'Sari',
    location: 'Bekasi',
    description: 'Everything needed to start a cosy indoor plant corner.',
    specs: ['3 plant pots', 'Soil mix', 'Care guide'],
    gallery: ['🌿', '🪴', '🧺'],
    createdAt: 20260410,
    featured: true,
    wishlist: false
  }
];

const state = {
  search: '',
  category: 'All',
  condition: 'All',
  sort: 'newest',
  page: 1,
  perPage: 6
};

const wishlistState = JSON.parse(localStorage.getItem('swapspaceWishlist') || '{}');
products.forEach((product) => {
  product.wishlist = Boolean(wishlistState[product.id]);
});

const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const categoryChips = document.getElementById('category-chips');
const conditionOptions = document.getElementById('condition-options');
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');
const productGrid = document.getElementById('product-grid');
const pagination = document.getElementById('pagination');
const resultsSummary = document.getElementById('results-summary');

const categories = ['All', ...new Set(products.map((product) => product.category))];
const conditions = ['All', 'New', 'Like New', 'Good', 'Fair'];

function renderCategories() {
  categoryChips.innerHTML = categories
    .map((category) => `<button class="category-chip ${state.category === category ? 'active' : ''}" data-category="${category}">${category}</button>`)
    .join('');
}

function renderConditions() {
  conditionOptions.innerHTML = conditions
    .map((condition) => `<button class="filter-chip ${state.condition === condition ? 'active' : ''}" data-condition="${condition}">${condition}</button>`)
    .join('');
}

function getFilteredProducts() {
  const filtered = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.description} ${product.owner}`.toLowerCase().includes(state.search.toLowerCase());
    const matchesCategory = state.category === 'All' || product.category === state.category;
    const matchesCondition = state.condition === 'All' || product.condition === state.condition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const sorted = [...filtered].sort((left, right) => {
    if (state.sort === 'score') return right.swapScore - left.swapScore;
    if (state.sort === 'az') return left.name.localeCompare(right.name);
    if (state.sort === 'popular') return right.swapScore - left.swapScore;
    return right.createdAt - left.createdAt;
  });

  return sorted;
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / state.perPage));
  if (state.page > totalPages) state.page = totalPages;

  const start = (state.page - 1) * state.perPage;
  const visibleProducts = filteredProducts.slice(start, start + state.perPage);

  resultsSummary.textContent = `Showing ${visibleProducts.length} of ${filteredProducts.length} items`;

  if (!visibleProducts.length) {
    productGrid.innerHTML = '<div class="panel empty-state">No items match your current filters.</div>';
    pagination.innerHTML = '';
    return;
  }

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">${product.gallery[0]}</div>
          <div class="product-content">
            <div class="badge-row">
              <span class="badge badge-category">${product.category}</span>
              <span class="badge badge-condition">${product.condition}</span>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <span class="swap-score">SwapScore ${product.swapScore}</span>
            <div class="product-meta">
              <span>${product.owner}</span>
              <span>${product.location}</span>
            </div>
            <div class="card-footer">
              <div class="owner-details">
                <strong>${product.owner}</strong>
                <span>${product.location}</span>
              </div>
              <div class="actions">
                <button class="wishlist-btn ${product.wishlist ? 'active' : ''}" data-id="${product.id}" type="button" aria-label="Toggle wishlist">${product.wishlist ? '♥' : '♡'}</button>
                <a class="button secondary" href="detail.html?id=${product.id}">View detail</a>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  pagination.innerHTML = pages
    .map((page) => `<button class="${state.page === page ? 'active' : ''}" data-page="${page}" type="button">${page}</button>`)
    .join('');
}

function persistWishlist() {
  const payload = Object.fromEntries(products.filter((product) => product.wishlist).map((product) => [product.id, true]));
  localStorage.setItem('swapspaceWishlist', JSON.stringify(payload));
}

function updateView() {
  renderCategories();
  renderConditions();
  renderProducts();
}

searchInput.addEventListener('input', (event) => {
  state.search = event.target.value;
  state.page = 1;
  updateView();
});

sortSelect.addEventListener('change', (event) => {
  state.sort = event.target.value;
  state.page = 1;
  updateView();
});

categoryChips.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  state.page = 1;
  updateView();
});

conditionOptions.addEventListener('click', (event) => {
  const button = event.target.closest('[data-condition]');
  if (!button) return;
  state.condition = button.dataset.condition;
  state.page = 1;
  updateView();
});

filterToggle.addEventListener('click', () => {
  filterPanel.hidden = !filterPanel.hidden;
});

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-id]');
  if (!button) return;

  const productId = Number(button.dataset.id);
  const product = products.find((entry) => entry.id === productId);
  if (!product) return;

  product.wishlist = !product.wishlist;
  button.classList.toggle('active', product.wishlist);
  button.textContent = product.wishlist ? '♥' : '♡';
  persistWishlist();
});

pagination.addEventListener('click', (event) => {
  const button = event.target.closest('[data-page]');
  if (!button) return;
  state.page = Number(button.dataset.page);
  updateView();
});

updateView();
