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

  return items.filter(function (item) {
    var itemText = item.name + " " + item.category + " " + item.location;
    var itemTextLower = itemText.toLowerCase();

    var matchSearch = itemTextLower.indexOf(catalogState.searchText) !== -1;
    var matchCategory =
      catalogState.category === "all" ||
      item.category === catalogState.category;

    return matchSearch && matchCategory;
  });
}

// Menampilkan semua card barang katalog
function renderCatalog() {
  var catalogList = document.getElementById("catalogList");
  var items = getFilteredCatalogItems();

  updateCatalogSummary();

  catalogList.innerHTML = "";

  if (items.length === 0) {
    catalogList.innerHTML =
      '<div class="empty-state">Barang tidak ditemukan.</div>';
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

  card.className = "item-card";

  card.innerHTML =
    "<h3>" +
    escapeHTML(item.name) +
    "</h3>" +
    '<span class="badge ' +
    statusClass +
    '">' +
    escapeHTML(item.status) +
    "</span>" +
    '<div class="item-meta">' +
    "<span>" +
    escapeHTML(item.category) +
    "</span>" +
    "<span>" +
    escapeHTML(item.condition) +
    "</span>" +
    "<span>" +
    escapeHTML(item.location) +
    "</span>" +
    "</div>" +
    '<div class="item-price">' +
    formatRupiah(item.price) +
    "</div>" +
    '<p class="item-description">' +
    escapeHTML(item.description) +
    "</p>" +
    '<button class="button primary" type="button"' +
    (isAvailable ? "" : " disabled") +
    ">Ajukan Swap</button>";

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
