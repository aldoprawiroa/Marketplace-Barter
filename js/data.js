/* STORAGE KEYS - DO NOT EDIT WITHOUT COORDINATION */
const STORAGE_KEYS = {
  loggedIn: "swapspace_logged_in",
  user: "swapspace_user",
  balance: "swapspace_balance",
  selectedItem: "swapspace_selected_item",
  userItems: "swapspace_user_items",
  transactions: "swapspace_transactions",
};

const DEFAULT_BALANCE = 2500000;

/* DEFAULT USER - ABDIL ONLY */
const DEFAULT_USER = {
  name: "Mahasiswa Demo",
  email: "demo@swapspace.local",
};

/* MARKETPLACE ITEMS - ALDO ONLY */
const MARKETPLACE_ITEMS = [
  {
    id: "item-001",
    name: "Kamera Mirrorless Bekas",
    category: "Elektronik",
    price: 3200000,
    condition: "Bekas mulus",
    location: "Semarang",
    status: "Tersedia",
    description:
      "Kamera masih normal dan cocok untuk dokumentasi tugas atau acara kampus.",
  },
  {
    id: "item-002",
    name: "Sepeda Lipat",
    category: "Olahraga",
    price: 1800000,
    condition: "Bekas terawat",
    location: "Semarang",
    status: "Tersedia",
    description:
      "Sepeda lipat ringan untuk perjalanan ke kampus atau sekitar kos.",
  },
  {
    id: "item-003",
    name: "Jaket Kulit Lokal",
    category: "Fashion",
    price: 650000,
    condition: "Bekas rapi",
    location: "Bandung",
    status: "Diproses",
    description:
      "Jaket ukuran L, warna masih bagus, cocok untuk dipakai harian.",
  },
  {
    id: "item-004",
    name: "Rak Buku Minimalis",
    category: "Perabot",
    price: 450000,
    condition: "Bekas rapi",
    location: "Semarang",
    status: "Tersedia",
    description:
      "Rak buku empat tingkat untuk kamar kos, ruang belajar, atau ruang tamu.",
  },
  {
    id: "item-005",
    name: "Meja Belajar Kayu",
    category: "Perabot",
    price: 550000,
    condition: "Bekas normal",
    location: "Yogyakarta",
    status: "Tersedia",
    description:
      "Meja belajar sederhana, masih kuat, cocok untuk belajar dan mengerjakan tugas.",
  },
  {
    id: "item-006",
    name: "Headset Gaming",
    category: "Elektronik",
    price: 350000,
    condition: "Bekas normal",
    location: "Semarang",
    status: "Tersedia",
    description:
      "Headset dengan mikrofon, cocok untuk meeting online, game, dan kelas daring.",
  },
  {
    id: "item-007",
    name: "Buku Pemrograman Web",
    category: "Buku",
    price: 120000,
    condition: "Bekas bersih",
    location: "Solo",
    status: "Tersedia",
    description:
      "Buku dasar HTML, CSS, dan JavaScript untuk belajar web dari awal.",
  },
  {
    id: "item-008",
    name: "Tas Laptop Hitam",
    category: "Aksesoris",
    price: 250000,
    condition: "Bekas bersih",
    location: "Semarang",
    status: "Diproses",
    description: "Tas laptop ukuran 14 inci dengan beberapa ruang penyimpanan.",
  },
  {
    id: "item-009",
    name: "Mouse Wireless",
    category: "Elektronik",
    price: 150000,
    condition: "Bekas normal",
    location: "Demak",
    status: "Tersedia",
    description:
      "Mouse wireless ringan, tombol masih normal, cocok untuk laptop harian.",
  },
  {
    id: "item-010",
    name: "Lampu Meja Belajar",
    category: "Perabot",
    price: 90000,
    condition: "Bekas normal",
    location: "Semarang",
    status: "Tersedia",
    description: "Lampu meja kecil untuk belajar malam hari di kamar kos.",
  },
];

/* USER ITEMS - IBRAHIM ONLY */
const DEFAULT_USER_ITEMS = [
  {
    id: "user-item-001",
    name: "Keyboard Mechanical",
    category: "Elektronik",
    price: 750000,
    condition: "Bekas normal, switch biru",
    location: "Tangerang",
    description:
      "Keyboard mechanical 87 tombol, cocok untuk mengetik tugas dan coding.",
  },
  {
    id: "user-item-002",
    name: "Tas Laptop",
    category: "Aksesoris",
    price: 300000,
    condition: "Bekas bersih",
    location: "Jakarta Timur",
    description: "Tas laptop 14 inci dengan banyak kompartemen dan rain cover.",
  },
];

/* CORE STORAGE HELPERS - DO NOT EDIT WITHOUT COORDINATION */
function readData(key, fallback) {
  var rawValue = localStorage.getItem(key);

  if (rawValue === null) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return fallback;
  }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initializeDemoData() {
  if (localStorage.getItem(STORAGE_KEYS.user) === null) {
    saveData(STORAGE_KEYS.user, DEFAULT_USER);
  }

  if (localStorage.getItem(STORAGE_KEYS.balance) === null) {
    saveData(STORAGE_KEYS.balance, DEFAULT_BALANCE);
  }

  if (localStorage.getItem(STORAGE_KEYS.userItems) === null) {
    saveData(STORAGE_KEYS.userItems, DEFAULT_USER_ITEMS);
  }

  if (localStorage.getItem(STORAGE_KEYS.transactions) === null) {
    saveData(STORAGE_KEYS.transactions, []);
  }

  if (localStorage.getItem(STORAGE_KEYS.loggedIn) === null) {
    saveData(STORAGE_KEYS.loggedIn, false);
  }
}

/* ACCOUNT HELPERS - ABDIL ONLY */
function isLoggedIn() {
  return readData(STORAGE_KEYS.loggedIn, false) === true;
}

function setLoggedIn(value) {
  saveData(STORAGE_KEYS.loggedIn, Boolean(value));
}

function getCurrentUser() {
  return readData(STORAGE_KEYS.user, DEFAULT_USER);
}

function setCurrentUser(user) {
  saveData(STORAGE_KEYS.user, user);
}

/* BALANCE HELPERS - FAIZ ONLY */
function getBalance() {
  return Number(readData(STORAGE_KEYS.balance, DEFAULT_BALANCE)) || 0;
}

function setBalance(value) {
  saveData(STORAGE_KEYS.balance, Number(value) || 0);
}

/* CATALOG HELPERS - ALDO ONLY */
function getMarketplaceItems() {
  return MARKETPLACE_ITEMS;
}

function saveSelectedItem(item) {
  saveData(STORAGE_KEYS.selectedItem, item);
}

function getSelectedItem() {
  return readData(STORAGE_KEYS.selectedItem, null);
}

/* USER ITEM HELPERS - IBRAHIM ONLY */
function getUserItems() {
  return readData(STORAGE_KEYS.userItems, DEFAULT_USER_ITEMS);
}

function saveUserItems(items) {
  saveData(STORAGE_KEYS.userItems, items);
}

function addUserItem(item) {
  var items = getUserItems();
  items.push(item);
  saveUserItems(items);
}

/* TRANSACTION HELPERS - FAIZ & INDRA ONLY */
function getTransactions() {
  return readData(STORAGE_KEYS.transactions, []);
}

function saveTransactions(transactions) {
  saveData(STORAGE_KEYS.transactions, transactions);
}

function addTransaction(transaction) {
  var transactions = getTransactions();
  transactions.unshift(transaction);
  saveTransactions(transactions);
}

/* RESET DEMO - INDRA ONLY */
function resetDemoData() {
  saveData(STORAGE_KEYS.loggedIn, false);
  saveData(STORAGE_KEYS.user, DEFAULT_USER);
  saveData(STORAGE_KEYS.balance, DEFAULT_BALANCE);
  localStorage.removeItem(STORAGE_KEYS.selectedItem);
  saveData(STORAGE_KEYS.userItems, DEFAULT_USER_ITEMS);
  saveData(STORAGE_KEYS.transactions, []);
}

initializeDemoData();
