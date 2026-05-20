/* IBRAHIM - UPLOAD & INVENTARIS */

var selectedImageData = "";

document.addEventListener("DOMContentLoaded", function () {
  renderInventoryList();

  document.getElementById("itemImage").addEventListener("change", handleImagePreview);
  document.getElementById("uploadForm").addEventListener("submit", handleUploadSubmit);
});

function handleImagePreview(event) {
  var file = event.target.files[0];
  var imagePreview = document.getElementById("imagePreview");

  selectedImageData = "";

  if (!file) {
    imagePreview.textContent = "Preview gambar akan muncul di sini.";
    return;
  }

  if (!file.type.match(/^image\//)) {
    event.target.value = "";
    imagePreview.textContent = "Preview gambar akan muncul di sini.";
    showMessage("uploadMessage", "File harus berupa gambar.", "error");
    return;
  }

  var reader = new FileReader();
  reader.onload = function (readerEvent) {
    selectedImageData = readerEvent.target.result;
    imagePreview.innerHTML = '<img src="' + selectedImageData + '" alt="Preview barang">';
  };
  reader.readAsDataURL(file);
}

function handleUploadSubmit(event) {
  event.preventDefault();

  var name = document.getElementById("itemName").value.trim();
  var category = document.getElementById("itemCategory").value;
  var price = Number(document.getElementById("itemPrice").value);
  var condition = document.getElementById("itemCondition").value.trim();
  var location = document.getElementById("itemLocation").value.trim();
  var description = document.getElementById("itemDescription").value.trim();
  var imageFile = document.getElementById("itemImage").files[0];

  if (!name || !category || !price || !condition || !location || !description || !imageFile) {
    showMessage("uploadMessage", "Semua field wajib diisi sebelum menyimpan barang.", "error");
    return;
  }

  if (price < 10000) {
    showMessage("uploadMessage", "Estimasi harga minimal Rp10.000.", "error");
    return;
  }

  if (!imageFile.type.match(/^image\//)) {
    showMessage("uploadMessage", "File foto harus berupa gambar.", "error");
    return;
  }

  var item = {
    id: createId("user-item"),
    name: name,
    category: category,
    price: price,
    condition: condition,
    location: location,
    description: description,
    imageData: selectedImageData
  };

  addUserItem(item);
  document.getElementById("uploadForm").reset();
  document.getElementById("imagePreview").textContent = "Preview gambar akan muncul di sini.";
  selectedImageData = "";
  renderInventoryList();
  showMessage("uploadMessage", "Barang berhasil disimpan ke inventaris.", "success");
}

function renderInventoryList() {
  var inventoryList = document.getElementById("inventoryList");
  var items = getUserItems();

  inventoryList.innerHTML = "";

  if (items.length === 0) {
    inventoryList.innerHTML = '<div class="empty-state">Inventaris masih kosong.</div>';
    return;
  }

  items.forEach(function (item) {
    var card = document.createElement("article");
    card.className = "inventory-item";
    card.innerHTML = [
      "<h3>" + escapeHTML(item.name) + "</h3>",
      "<p>" + escapeHTML(item.category) + " - " + escapeHTML(item.condition) + "</p>",
      "<p>" + escapeHTML(item.location) + "</p>",
      "<strong>" + formatRupiah(item.price) + "</strong>",
      "<p>" + escapeHTML(item.description) + "</p>"
    ].join("");
    inventoryList.appendChild(card);
  });
}
