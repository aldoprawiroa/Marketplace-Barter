const detailProducts = [
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
    ownerInitial: 'M',
    rating: '4.9',
    completedSwaps: 36,
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
    ownerInitial: 'A',
    rating: '4.8',
    completedSwaps: 21,
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
    ownerInitial: 'N',
    rating: '5.0',
    completedSwaps: 14,
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
    ownerInitial: 'R',
    rating: '4.7',
    completedSwaps: 18,
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
    ownerInitial: 'L',
    rating: '4.8',
    completedSwaps: 12,
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
    ownerInitial: 'B',
    rating: '4.6',
    completedSwaps: 9,
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
    ownerInitial: 'D',
    rating: '4.9',
    completedSwaps: 28,
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
    ownerInitial: 'H',
    rating: '4.7',
    completedSwaps: 17,
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
    ownerInitial: 'F',
    rating: '4.8',
    completedSwaps: 20,
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
    ownerInitial: 'T',
    rating: '4.9',
    completedSwaps: 11,
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
    ownerInitial: 'K',
    rating: '4.6',
    completedSwaps: 15,
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
    ownerInitial: 'S',
    rating: '4.9',
    completedSwaps: 13,
    wishlist: false
  }
];

const params = new URLSearchParams(window.location.search);
const itemId = Number(params.get('id')) || detailProducts[0].id;
const product = detailProducts.find((entry) => entry.id === itemId) || detailProducts[0];

const wishlistState = JSON.parse(localStorage.getItem('swapspaceWishlist') || '{}');
detailProducts.forEach((entry) => {
  entry.wishlist = Boolean(wishlistState[entry.id]);
});

const breadcrumbName = document.getElementById('breadcrumb-name');
const productImage = document.getElementById('product-image');
const thumbRow = document.getElementById('thumb-row');
const productTitle = document.getElementById('product-title');
const productScore = document.getElementById('product-score');
const productCategory = document.getElementById('product-category');
const productCondition = document.getElementById('product-condition');
const productOwner = document.getElementById('product-owner');
const productLocation = document.getElementById('product-location');
const productDescription = document.getElementById('product-description');
const specList = document.getElementById('spec-list');
const swapButton = document.getElementById('swap-button');
const wishlistButton = document.getElementById('wishlist-button');
const ownerAvatar = document.getElementById('owner-avatar');
const ownerName = document.getElementById('owner-name');
const ownerRating = document.getElementById('owner-rating');
const ownerSwaps = document.getElementById('owner-swaps');
const similarGrid = document.getElementById('similar-grid');

function renderProduct() {
  breadcrumbName.textContent = product.name;
  productTitle.textContent = product.name;
  productScore.textContent = `SwapScore ${product.swapScore}`;
  productCategory.textContent = product.category;
  productCondition.textContent = product.condition;
  productOwner.textContent = `Owned by ${product.owner}`;
  productLocation.textContent = product.location;
  productDescription.textContent = product.description;
  specList.innerHTML = product.specs.map((spec) => `<li>${spec}</li>`).join('');
  ownerAvatar.textContent = product.ownerInitial;
  ownerName.textContent = product.owner;
  ownerRating.textContent = `⭐ ${product.rating} rating`;
  ownerSwaps.textContent = product.completedSwaps;

  productImage.textContent = product.gallery[0];
  thumbRow.innerHTML = product.gallery.map((entry, index) => `<button class="thumb ${index === 0 ? 'active' : ''}" type="button">${entry}</button>`).join('');

  wishlistButton.textContent = product.wishlist ? '♥ Added to wishlist' : '♡ Add to wishlist';
  swapButton.textContent = swapButton.dataset.sent ? 'Swap request sent' : 'Request swap';

  const similarItems = detailProducts.filter((entry) => entry.category === product.category && entry.id !== product.id).slice(0, 4);
  similarGrid.innerHTML = similarItems
    .map(
      (entry) => `
        <article class="similar-card">
          <div class="swap-score">SwapScore ${entry.swapScore}</div>
          <h3>${entry.name}</h3>
          <p>${entry.location}</p>
          <a class="button secondary" href="detail.html?id=${entry.id}">View item</a>
        </article>
      `
    )
    .join('');
}

function persistWishlist() {
  const payload = Object.fromEntries(detailProducts.filter((entry) => entry.wishlist).map((entry) => [entry.id, true]));
  localStorage.setItem('swapspaceWishlist', JSON.stringify(payload));
}

thumbRow.addEventListener('click', (event) => {
  const button = event.target.closest('.thumb');
  if (!button) return;
  productImage.textContent = button.textContent.trim();
  Array.from(thumbRow.children).forEach((thumb) => thumb.classList.toggle('active', thumb === button));
});

swapButton.addEventListener('click', () => {
  swapButton.dataset.sent = 'true';
  swapButton.textContent = 'Swap request sent';
  swapButton.classList.add('is-sent');
});

wishlistButton.addEventListener('click', () => {
  product.wishlist = !product.wishlist;
  wishlistButton.textContent = product.wishlist ? '♥ Added to wishlist' : '♡ Add to wishlist';
  persistWishlist();
});

renderProduct();
