/* ALDO PRAWIRO AKBAR - KATALOG & SEARCH */

// State sederhana untuk katalog
var catalogState = {
  searchText: "",
  category: "all",
};

// Jalankan setelah HTML selesai dibaca browser
document.addEventListener("DOMContentLoaded", function () {
  renderCategoryOptions();
  renderCatalog();

  document
    .getElementById("searchInput")
    .addEventListener("input", function (event) {
      catalogState.searchText = event.target.value.toLowerCase();
      renderCatalog();
    });

  document
    .getElementById("categoryFilter")
    .addEventListener("change", function (event) {
      catalogState.category = event.target.value;
      renderCatalog();
    });
});

// Membuat pilihan kategori dari data barang
function renderCategoryOptions() {
  var categoryFilter = document.getElementById("categoryFilter");
  var items = getMarketplaceItems();
  var categories = [];

  // Kosongkan dulu agar option tidak dobel
  categoryFilter.innerHTML = '<option value="all">Semua kategori</option>';

  items.forEach(function (item) {
    if (categories.indexOf(item.category) === -1) {
      categories.push(item.category);
    }
  });

  categories.forEach(function (category) {
    var option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Mengambil data barang yang cocok dengan search dan filter
function getFilteredCatalogItems() {
  var items = getMarketplaceItems();
  var keyword = catalogState.searchText.trim().toLowerCase();

  return items.filter(function (item) {
    var name = item.name.toLowerCase();
    var category = item.category.toLowerCase();
    var location = item.location.toLowerCase();

    var matchSearch =
      keyword === "" ||
      name.indexOf(keyword) !== -1 ||
      category.indexOf(keyword) !== -1 ||
      location.indexOf(keyword) !== -1;

    var matchCategory =
      catalogState.category === "all" ||
      item.category === catalogState.category;

    return matchSearch && matchCategory;
  });
}

// Menampilkan semua card barang katalog
function renderCatalog() {
  var catalogList = document.getElementById("catalogList");
  var catalogMessage = document.getElementById("catalogMessage");
  var items = getFilteredCatalogItems();

  updateCatalogSummary();

  catalogList.innerHTML = "";
  catalogMessage.textContent = "";

  if (
    catalogState.searchText.trim() !== "" &&
    catalogState.category !== "all"
  ) {
    catalogMessage.textContent =
      "Hasil pencarian: " +
      catalogState.searchText +
      " | Kategori: " +
      catalogState.category;
  } else if (catalogState.searchText.trim() !== "") {
    catalogMessage.textContent =
      "Hasil pencarian untuk: " + catalogState.searchText;
  } else if (catalogState.category !== "all") {
    catalogMessage.textContent =
      "Menampilkan kategori: " + catalogState.category;
  }

  if (items.length === 0) {
    catalogList.innerHTML =
      '<div class="empty-state">Barang tidak ditemukan. Coba gunakan kata kunci atau kategori lain.</div>';
    return;
  }

  items.forEach(function (item) {
    var card = createCatalogCard(item);
    catalogList.appendChild(card);
  });
}

// Membuat satu card barang
function createCatalogCard(item) {
  var card = document.createElement("article");
  var isAvailable = item.status === "Tersedia";
  var statusClass = isAvailable ? "available" : "process";
  var buttonText = isAvailable ? "Ajukan Swap" : "Sedang Diproses";

  card.className = "item-card";

  card.innerHTML =
    '<div class="item-card-header">' +
    "<h3>" +
    escapeHTML(item.name) +
    "</h3>" +
    '<span class="catalog-status ' +
    statusClass +
    '">' +
    escapeHTML(item.status) +
    "</span>" +
    "</div>" +
    '<div class="item-meta">' +
    "<span>Kategori: " +
    escapeHTML(item.category) +
    "</span>" +
    "<span>Kondisi: " +
    escapeHTML(item.condition) +
    "</span>" +
    "<span>Lokasi: " +
    escapeHTML(item.location) +
    "</span>" +
    "</div>" +
    '<div class="item-price">' +
    formatRupiah(item.price) +
    "</div>" +
    '<p class="item-description">' +
    escapeHTML(item.description) +
    "</p>" +
    '<button class="catalog-swap-button" type="button"' +
    (isAvailable ? "" : " disabled") +
    ">" +
    buttonText +
    "</button>";

  if (isAvailable) {
    card.querySelector("button").addEventListener("click", function () {
      handleSwapClick(item);
    });
  }

  return card;
}
// Mengupdate angka ringkasan katalog
function updateCatalogSummary() {
  var items = getMarketplaceItems();
  var availableCount = 0;
  var categories = [];

  items.forEach(function (item) {
    if (item.status === "Tersedia") {
      availableCount++;
    }

    if (categories.indexOf(item.category) === -1) {
      categories.push(item.category);
    }
  });

  document.getElementById("totalItems").textContent = items.length;
  document.getElementById("availableItems").textContent = availableCount;
  document.getElementById("totalCategories").textContent = categories.length;
}

// Ketika tombol Ajukan Swap diklik
function handleSwapClick(item) {
  saveSelectedItem(item);

  if (!isLoggedIn()) {
    showMessage(
      "catalogMessage",
      "Silakan login terlebih dahulu sebelum mengajukan swap.",
      "info",
    );

    setTimeout(function () {
      window.location.href = "login.html";
    }, 700);

    return;
  }

  window.location.href = "swap.html";
}
