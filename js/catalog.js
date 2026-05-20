/* ALDO PRAWIRO AKBAR - KATALOG & SEARCH */

var catalogState = {
  searchText: "",
  category: "all"
};

document.addEventListener("DOMContentLoaded", function () {
  renderCategoryOptions();
  renderCatalog();

  document.getElementById("searchInput").addEventListener("input", function (event) {
    catalogState.searchText = event.target.value.toLowerCase();
    renderCatalog();
  });

  document.getElementById("categoryFilter").addEventListener("change", function (event) {
    catalogState.category = event.target.value;
    renderCatalog();
  });
});

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

function getFilteredCatalogItems() {
  return getMarketplaceItems().filter(function (item) {
    var text = [
      item.name,
      item.category,
      item.location
    ].join(" ").toLowerCase();
    var matchesSearch = text.indexOf(catalogState.searchText) !== -1;
    var matchesCategory = catalogState.category === "all" || item.category === catalogState.category;

    return matchesSearch && matchesCategory;
  });
}

function renderCatalog() {
  var catalogList = document.getElementById("catalogList");
  var filteredItems = getFilteredCatalogItems();

  updateCatalogSummary();
  catalogList.innerHTML = "";

  if (filteredItems.length === 0) {
    catalogList.innerHTML = '<div class="empty-state">Barang tidak ditemukan. Coba kata kunci atau kategori lain.</div>';
    return;
  }

  filteredItems.forEach(function (item) {
    var card = document.createElement("article");
    var isAvailable = item.status === "Tersedia";
    var statusClass = isAvailable ? "available" : "process";

    card.className = "item-card";
    card.innerHTML = [
      "<h3>" + escapeHTML(item.name) + "</h3>",
      '<span class="badge ' + statusClass + '">' + escapeHTML(item.status) + "</span>",
      '<div class="item-meta">',
      "<span>" + escapeHTML(item.category) + "</span>",
      "<span>" + escapeHTML(item.condition) + "</span>",
      "<span>" + escapeHTML(item.location) + "</span>",
      "</div>",
      '<div class="item-price">' + formatRupiah(item.price) + "</div>",
      '<p class="item-description">' + escapeHTML(item.description) + "</p>",
      '<button class="button primary" type="button" ' + (isAvailable ? "" : "disabled") + ">Ajukan Swap</button>"
    ].join("");

    if (isAvailable) {
      card.querySelector("button").addEventListener("click", function () {
        handleSwapClick(item);
      });
    }

    catalogList.appendChild(card);
  });
}

function updateCatalogSummary() {
  var items = getMarketplaceItems();
  var availableCount = items.filter(function (item) {
    return item.status === "Tersedia";
  }).length;
  var categories = [];

  items.forEach(function (item) {
    if (categories.indexOf(item.category) === -1) {
      categories.push(item.category);
    }
  });

  document.getElementById("totalItems").textContent = items.length;
  document.getElementById("availableItems").textContent = availableCount;
  document.getElementById("totalCategories").textContent = categories.length;
}

function handleSwapClick(item) {
  saveSelectedItem(item);

  if (!isLoggedIn()) {
    showMessage("catalogMessage", "Silakan login terlebih dahulu sebelum mengajukan swap.", "info");
    setTimeout(function () {
      window.location.href = "login.html";
    }, 700);
    return;
  }

  window.location.href = "swap.html";
}
