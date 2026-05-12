const MARKETPLACE_ITEMS = [
  {
    id: "B01",
    name: "Kamera Sony A6000",
    category: "Elektronik",
    price: 3200000,
    condition: "Bekas sangat baik",
    location: "Bandung",
    owner: "Nadia Putri",
    status: "Tersedia",
    date: "2026-05-02",
    description: "Body mulus, shutter count rendah, termasuk lensa kit 16-50mm, strap, baterai, dan charger.",
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "B02",
    name: "Sepeda Lipat United Trifold",
    category: "Olahraga",
    price: 2800000,
    condition: "Siap pakai",
    location: "Jakarta Selatan",
    owner: "Rizky Maulana",
    status: "Tersedia",
    date: "2026-05-04",
    description: "Rangka kokoh, rem responsif, cocok untuk komuter kampus dan perjalanan pendek.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "B03",
    name: "Jaket Kulit Lokal Premium",
    category: "Fashion",
    price: 850000,
    condition: "Kondisi 90 persen",
    location: "Yogyakarta",
    owner: "Damar Wicaksono",
    status: "Diproses",
    date: "2026-04-28",
    description: "Ukuran L, warna hitam, resleting normal, ada sedikit bekas pemakaian di bagian lengan.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "B04",
    name: "Keyboard Mechanical Keychron K2",
    category: "Elektronik",
    price: 1150000,
    condition: "Lengkap box",
    location: "Surabaya",
    owner: "Fajar Nugroho",
    status: "Tersedia",
    date: "2026-05-06",
    description: "Switch brown, layout 75 persen, koneksi Bluetooth dan kabel berjalan normal.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "B05",
    name: "Rak Buku Minimalis 4 Susun",
    category: "Peralatan Rumah",
    price: 420000,
    condition: "Bekas terawat",
    location: "Depok",
    owner: "Salsa Kirana",
    status: "Tersedia",
    date: "2026-05-08",
    description: "Kayu particle board tebal, stabil, cocok untuk kamar kos atau ruang kerja kecil.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "B06",
    name: "Paket Buku UI/UX Research",
    category: "Buku",
    price: 350000,
    condition: "Ada catatan kecil",
    location: "Malang",
    owner: "Anisa Rahma",
    status: "Tersedia",
    date: "2026-05-10",
    description: "Tiga buku riset desain dan product discovery, cocok untuk referensi tugas akhir.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"
  }
];

const STARTER_MY_ITEMS = [
  {
    id: "M01",
    name: "Headphone Gaming Rexus Vonix",
    category: "Elektronik",
    price: 550000,
    condition: "Normal, lengkap kabel",
    location: "Bekasi",
    owner: "Akun Demo",
    status: "Tersedia",
    description: "Suara jernih, mikrofon aktif, earpad sudah diganti dua bulan lalu.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "M02",
    name: "Jam Tangan Casio MTP",
    category: "Fashion",
    price: 1000000,
    condition: "Fungsi normal",
    location: "Bekasi",
    owner: "Akun Demo",
    status: "Tersedia",
    description: "Minus gores halus di clasp, mesin dan tanggal berjalan baik.",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "M03",
    name: "Sepatu Sneakers Putih",
    category: "Fashion",
    price: 375000,
    condition: "Ukuran 42",
    location: "Bekasi",
    owner: "Akun Demo",
    status: "Tersedia",
    description: "Sol masih tebal, cocok untuk kuliah harian, sudah dicuci bersih.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "M04",
    name: "Tas Ransel Laptop 15 Inci",
    category: "Aksesoris",
    price: 300000,
    condition: "Bekas rapi",
    location: "Bekasi",
    owner: "Akun Demo",
    status: "Tersedia",
    description: "Kompartemen laptop aman, resleting lancar, ada rain cover bawaan.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
  }
];

const STARTER_TRANSACTIONS = [
  {
    id: "TRX-20260508-01",
    date: "2026-05-08T09:30:00.000Z",
    status: "Menunggu Balasan",
    statusType: "pending",
    itemSayaName: "Jam Tangan Casio MTP",
    itemTujuanName: "Kamera Sony A6000",
    partner: "Nadia Putri",
    itemSayaPrice: 1000000,
    itemTujuanPrice: 3200000,
    adjustment: 2213500,
    note: "Penawaran sedang menunggu persetujuan pemilik barang."
  },
  {
    id: "TRX-20260429-02",
    date: "2026-04-29T15:00:00.000Z",
    status: "Berhasil Swap",
    statusType: "success",
    itemSayaName: "Tas Ransel Laptop 15 Inci",
    itemTujuanName: "Paket Buku UI/UX Research",
    partner: "Anisa Rahma",
    itemSayaPrice: 300000,
    itemTujuanPrice: 350000,
    adjustment: 63500,
    note: "Barang diterima kedua pihak melalui simulasi SwapSafe."
  }
];

const DEFAULT_USER = {
  name: "Raka Mahendra",
  email: "raka@student.example",
  phone: "0812-3456-7890",
  campus: "Universitas Nusantara",
  joinedAt: "2026-03-12",
  balance: 2500000
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80";

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getData(key, defaultValue) {
  try {
    const savedData = localStorage.getItem(key);
    if (savedData === null) return defaultValue;
    return JSON.parse(savedData);
  } catch (error) {
    return defaultValue;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (typeof showToast === "function") {
      showToast("Data gagal disimpan. Kapasitas penyimpanan browser mungkin penuh.", "error");
    }
    return false;
  }
}

function getTextData(key, defaultValue) {
  const savedValue = localStorage.getItem(key);
  if (savedValue === null) return defaultValue;
  return savedValue;
}

function saveTextData(key, value) {
  try {
    localStorage.setItem(key, String(value));
    return true;
  } catch (error) {
    if (typeof showToast === "function") {
      showToast("Data gagal disimpan. Coba reset data demo.", "error");
    }
    return false;
  }
}

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9]/g, "")) || 0;
}

function makeItem(item, fallbackId) {
  return {
    id: item.id || fallbackId,
    name: item.name || item.nama || "Barang Tanpa Nama",
    category: item.category || item.kategori || "Lain-lain",
    price: parsePrice(item.price || item.harga),
    condition: item.condition || item.kondisi || "Kondisi belum ditulis",
    location: item.location || item.lokasi || "Lokasi demo",
    owner: item.owner || item.pemilik || "Akun Demo",
    status: item.status || "Tersedia",
    date: item.date || new Date().toISOString().slice(0, 10),
    description: item.description || item.deskripsi || "Deskripsi barang belum tersedia.",
    image: item.image || FALLBACK_IMAGE
  };
}

function formatCurrency(value) {
  return "Rp " + parsePrice(value).toLocaleString("id-ID");
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "Tanggal demo";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function getStatusClass(status, statusType) {
  if (statusType === "success" || status === "Tersedia" || status === "Selesai" || status === "Berhasil Swap") {
    return "status-success";
  }
  if (statusType === "failed" || status === "Gagal") {
    return "status-failed";
  }
  if (statusType === "pending" || status === "Diproses" || status === "Menunggu Balasan") {
    return "status-pending";
  }
  return "";
}

function getUser() {
  const user = getData("swapUser", DEFAULT_USER);
  return {
    name: user.name || DEFAULT_USER.name,
    email: user.email || DEFAULT_USER.email,
    phone: user.phone || DEFAULT_USER.phone,
    campus: user.campus || DEFAULT_USER.campus,
    joinedAt: user.joinedAt || DEFAULT_USER.joinedAt,
    balance: parsePrice(user.balance || DEFAULT_USER.balance)
  };
}

function saveUser(user) {
  const newUser = {
    name: user.name || DEFAULT_USER.name,
    email: user.email || DEFAULT_USER.email,
    phone: user.phone || DEFAULT_USER.phone,
    campus: user.campus || DEFAULT_USER.campus,
    joinedAt: user.joinedAt || DEFAULT_USER.joinedAt,
    balance: parsePrice(user.balance || DEFAULT_USER.balance)
  };
  saveData("swapUser", newUser);
}

function isLoggedIn() {
  return getTextData("isLoggedIn", "false") === "true";
}

function setLoggedIn(value) {
  saveTextData("isLoggedIn", value ? "true" : "false");
}

function getBalance() {
  const storedBalance = getTextData("swapBalance", "");
  if (storedBalance === "") {
    saveBalance(DEFAULT_USER.balance);
    return DEFAULT_USER.balance;
  }
  return parsePrice(storedBalance);
}

function saveBalance(value) {
  saveTextData("swapBalance", parsePrice(value));
}

function getMarketplaceItems() {
  const result = [];
  for (let i = 0; i < MARKETPLACE_ITEMS.length; i++) {
    result.push(makeItem(MARKETPLACE_ITEMS[i], "B" + (i + 1)));
  }
  return result;
}

function getUploadedItems() {
  const savedItems = getData("barang_swappoint", []);
  const result = [];
  for (let i = 0; i < savedItems.length; i++) {
    result.push(makeItem(savedItems[i], "UP-" + (i + 1)));
  }
  return result;
}

function saveUploadedItem(item) {
  const uploadedItems = getUploadedItems();
  const newItem = makeItem(item, "UP-" + Date.now());
  uploadedItems.unshift(newItem);
  if (!saveData("barang_swappoint", uploadedItems)) return null;
  return newItem;
}

function getMyItems() {
  const uploadedItems = getUploadedItems();
  const starterItems = [];

  for (let i = 0; i < STARTER_MY_ITEMS.length; i++) {
    starterItems.push(makeItem(STARTER_MY_ITEMS[i], "M" + (i + 1)));
  }

  return uploadedItems.concat(starterItems);
}

function getTransactions() {
  const savedTransactions = getData("swapTransactions", null);
  if (savedTransactions) return savedTransactions;
  return STARTER_TRANSACTIONS.slice();
}

function saveTransactions(transactions) {
  saveData("swapTransactions", transactions);
}

function addTransaction(transaction) {
  const transactions = getTransactions();
  transactions.unshift(transaction);
  saveTransactions(transactions);
}

function resetDemoData() {
  localStorage.removeItem("itemSwap");
  localStorage.removeItem("itemTujuan");
  localStorage.removeItem("pendingSwapItem");
  localStorage.removeItem("barang_swappoint");
  localStorage.removeItem("swapTransactions");
  saveUser(DEFAULT_USER);
  saveBalance(DEFAULT_USER.balance);
  setLoggedIn(false);
}
