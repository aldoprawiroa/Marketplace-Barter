const inventoryItems = [
  {
    id: 1,
    name: 'Vintage Camera',
    category: 'Photography',
    condition: 'Excellent',
    status: 'Available',
    swapScore: 93,
    createdDate: 'Jun 12, 2026',
    description: 'Classic body with premium lens compatibility.',
    preference: 'Camera gear or audio gear',
    hidden: false
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    category: 'Tech',
    condition: 'Good',
    status: 'In Swap',
    swapScore: 87,
    createdDate: 'May 28, 2026',
    description: 'Tactile switches and a compact aluminum frame.',
    preference: 'Desk accessories',
    hidden: false
  },
  {
    id: 3,
    name: 'Ceramic Lamp',
    category: 'Home',
    condition: 'Like New',
    status: 'Available',
    swapScore: 84,
    createdDate: 'Jun 03, 2026',
    description: 'Soft ambient glow for cozy interiors.',
    preference: 'Decor pieces',
    hidden: false
  },
  {
    id: 4,
    name: 'Running Shoes',
    category: 'Fashion',
    condition: 'Very Good',
    status: 'Completed',
    swapScore: 81,
    createdDate: 'Apr 15, 2026',
    description: 'Lightweight and barely worn.',
    preference: 'Sport gear',
    hidden: false
  },
  {
    id: 5,
    name: 'Leather Backpack',
    category: 'Travel',
    condition: 'Excellent',
    status: 'Available',
    swapScore: 89,
    createdDate: 'Jun 08, 2026',
    description: 'Minimalist design with expandable storage.',
    preference: 'Travel accessories',
    hidden: false
  },
  {
    id: 6,
    name: 'Studio Headphones',
    category: 'Audio',
    condition: 'Good',
    status: 'In Swap',
    swapScore: 90,
    createdDate: 'May 20, 2026',
    description: 'Balanced sound profile with noise isolation.',
    preference: 'Audio gear',
    hidden: false
  },
  {
    id: 7,
    name: 'Desk Plant',
    category: 'Lifestyle',
    condition: 'Excellent',
    status: 'Available',
    swapScore: 78,
    createdDate: 'Jun 01, 2026',
    description: 'Indoor plant with a sculptural ceramic pot.',
    preference: 'Home decor',
    hidden: false
  },
  {
    id: 8,
    name: 'Bluetooth Speaker',
    category: 'Audio',
    condition: 'Like New',
    status: 'Completed',
    swapScore: 86,
    createdDate: 'Apr 30, 2026',
    description: 'Portable and rich in bass.',
    preference: 'Audio accessories',
    hidden: false
  }
];

let activeFilter = 'all';
let searchQuery = '';
let selectedItemId = null;
let isEditing = false;

function initializeInventory() {
  bindInventoryEvents();
  renderInventory();
}

function bindInventoryEvents() {
  document.getElementById('open-upload-modal').addEventListener('click', () => openUploadModal());
  document.getElementById('close-upload-modal').addEventListener('click', closeUploadModal);
  document.getElementById('cancel-upload').addEventListener('click', closeUploadModal);
  document.getElementById('close-delete-modal').addEventListener('click', closeDeleteModal);
  document.getElementById('cancel-delete').addEventListener('click', closeDeleteModal);
  document.getElementById('confirm-delete').addEventListener('click', confirmDelete);
  document.getElementById('upload-form').addEventListener('submit', handleUploadSubmit);
  document.getElementById('inventory-search').addEventListener('input', (event) => {
    searchQuery = event.target.value.trim().toLowerCase();
    renderInventory();
  });
  document.getElementById('inventory-filter').addEventListener('change', (event) => {
    activeFilter = event.target.value;
    renderInventory();
  });

  document.getElementById('upload-modal').addEventListener('click', (event) => {
    if (event.target.id === 'upload-modal') {
      closeUploadModal();
    }
  });

  document.getElementById('delete-modal').addEventListener('click', (event) => {
    if (event.target.id === 'delete-modal') {
      closeDeleteModal();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.card-menu')) {
      closeMenus();
    }
  });
}

function renderInventory() {
  const filteredItems = inventoryItems.filter((item) => {
    if (item.hidden) {
      return false;
    }

    const searchableText = `${item.name} ${item.category} ${item.condition} ${item.description}`.toLowerCase();
    const matchesSearch = !searchQuery || searchableText.includes(searchQuery);
    const matchesFilter = activeFilter === 'all' || item.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  updateStats();

  const grid = document.getElementById('inventory-grid');
  const emptyState = document.getElementById('empty-state');

  if (!filteredItems.length) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  grid.innerHTML = filteredItems.map(createInventoryCard).join('');

  grid.querySelectorAll('.menu-toggle').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const panel = document.getElementById(`menu-${button.dataset.itemId}`);
      closeMenus();
      panel.classList.toggle('hidden');
    });
  });

  grid.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const { action, itemId } = button.dataset;
      handleInventoryAction(action, Number(itemId));
    });
  });
}

function createInventoryCard(item) {
  return `
    <article class="inventory-card">
      <div class="item-image">Image Placeholder</div>
      <div class="card-topline">
        <div>
          <h3>${item.name}</h3>
          <p class="item-category">${item.category}</p>
        </div>
        <div class="card-menu">
          <button class="menu-toggle" data-item-id="${item.id}" type="button" aria-label="Open actions">⋯</button>
          <div class="menu-panel hidden" id="menu-${item.id}">
            <button type="button" data-action="view" data-item-id="${item.id}">View</button>
            <button type="button" data-action="edit" data-item-id="${item.id}">Edit</button>
            <button type="button" data-action="delete" data-item-id="${item.id}">Delete</button>
            <button type="button" data-action="hide" data-item-id="${item.id}">Hide</button>
          </div>
        </div>
      </div>
      <div class="meta-row">
        <span>${item.condition}</span>
        <span class="status-badge status-${item.status.toLowerCase().replace(/\s+/g, '-')}">${item.status}</span>
      </div>
      <div class="meta-row">
        <span>SwapScore ${item.swapScore}</span>
        <span>${item.createdDate}</span>
      </div>
      <div class="item-footer">
        <span class="text-link">${item.preference}</span>
        <a class="text-link" href="swap.html">Open swap</a>
      </div>
    </article>
  `;
}

function updateStats() {
  const visibleItems = inventoryItems.filter((item) => !item.hidden);
  document.querySelector('[data-stat="total"]').textContent = visibleItems.length;
  document.querySelector('[data-stat="available"]').textContent = visibleItems.filter((item) => item.status === 'Available').length;
  document.querySelector('[data-stat="swap"]').textContent = visibleItems.filter((item) => item.status === 'In Swap').length;
  document.querySelector('[data-stat="completed"]').textContent = visibleItems.filter((item) => item.status === 'Completed').length;
}

function closeMenus() {
  document.querySelectorAll('.menu-panel').forEach((panel) => panel.classList.add('hidden'));
}

function handleInventoryAction(action, itemId) {
  const item = inventoryItems.find((entry) => entry.id === itemId);

  if (!item) {
    return;
  }

  if (action === 'view') {
    window.alert(`${item.name}\nCategory: ${item.category}\nCondition: ${item.condition}\nPreference: ${item.preference}`);
  }

  if (action === 'edit') {
    openUploadModal(item);
  }

  if (action === 'delete') {
    selectedItemId = itemId;
    openDeleteModal();
  }

  if (action === 'hide') {
    item.hidden = true;
    renderInventory();
  }
}

function openUploadModal(item = null) {
  const modal = document.getElementById('upload-modal');
  const form = document.getElementById('upload-form');
  const title = document.getElementById('upload-modal-title');

  isEditing = Boolean(item);
  if (item) {
    title.textContent = 'Edit Item';
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-condition').value = item.condition;
    document.getElementById('item-description').value = item.description;
    document.getElementById('item-preference').value = item.preference;
    selectedItemId = item.id;
  } else {
    title.textContent = 'Upload Item';
    form.reset();
  }

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeUploadModal() {
  document.getElementById('upload-modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.getElementById('upload-form').reset();
}

function handleUploadSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const payload = {
    name: document.getElementById('item-name').value.trim(),
    category: document.getElementById('item-category').value.trim(),
    condition: document.getElementById('item-condition').value.trim(),
    description: document.getElementById('item-description').value.trim(),
    preference: document.getElementById('item-preference').value.trim(),
    status: 'Available',
    swapScore: 85,
    createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  if (!payload.name || !payload.category || !payload.condition || !payload.description || !payload.preference) {
    return;
  }

  if (isEditing && selectedItemId) {
    const existingItem = inventoryItems.find((item) => item.id === selectedItemId);
    if (existingItem) {
      Object.assign(existingItem, payload);
      existingItem.id = selectedItemId;
    }
  } else {
    inventoryItems.unshift({
      id: Date.now(),
      hidden: false,
      ...payload
    });
  }

  form.reset();
  closeUploadModal();
  renderInventory();
}

function openDeleteModal() {
  document.getElementById('delete-modal').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeDeleteModal() {
  document.getElementById('delete-modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
  selectedItemId = null;
}

function confirmDelete() {
  if (selectedItemId) {
    const index = inventoryItems.findIndex((item) => item.id === selectedItemId);
    if (index >= 0) {
      inventoryItems.splice(index, 1);
    }
  }

  closeDeleteModal();
  renderInventory();
}

document.addEventListener('DOMContentLoaded', initializeInventory);
