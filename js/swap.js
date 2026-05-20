/* FAIZ ABDAN NIRWANA - SWAP & CHECKOUT */

var selectedTargetItem = null;
var selectedOfferedItem = null;
var checkoutValues = null;

document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    showMessage("swapMessage", "Silakan login terlebih dahulu untuk membuka checkout swap.", "info");
    setTimeout(function () {
      window.location.href = "login.html";
    }, 800);
    return;
  }

  selectedTargetItem = getSelectedItem();
  renderSelectedItem();
  renderUserItemOptions();
  updateCheckoutSummary();

  document.getElementById("submitSwapButton").addEventListener("click", handleSubmitSwap);
});

function renderSelectedItem() {
  var selectedItemBox = document.getElementById("selectedItemBox");

  if (!selectedTargetItem) {
    selectedItemBox.innerHTML = '<div class="empty-state">Belum ada barang tujuan. Pilih barang dari katalog terlebih dahulu.</div>';
    return;
  }

  selectedItemBox.innerHTML = [
    '<article class="inventory-item">',
    "<h3>" + escapeHTML(selectedTargetItem.name) + "</h3>",
    "<p>" + escapeHTML(selectedTargetItem.category) + " - " + escapeHTML(selectedTargetItem.condition) + "</p>",
    "<p>" + escapeHTML(selectedTargetItem.location) + "</p>",
    "<strong>" + formatRupiah(selectedTargetItem.price) + "</strong>",
    "<p>" + escapeHTML(selectedTargetItem.description) + "</p>",
    "</article>"
  ].join("");
}

function renderUserItemOptions() {
  var userItemOptions = document.getElementById("userItemOptions");
  var userItems = getUserItems();

  userItemOptions.innerHTML = "";

  if (userItems.length === 0) {
    userItemOptions.innerHTML = '<div class="empty-state">Inventaris kosong. Upload barang terlebih dahulu.</div>';
    return;
  }

  userItems.forEach(function (item) {
    var label = document.createElement("label");
    label.className = "radio-option";
    label.innerHTML = [
      '<input type="radio" name="offeredItem" value="' + escapeHTML(item.id) + '">',
      "<span>",
      "<strong>" + escapeHTML(item.name) + "</strong><br>",
      escapeHTML(item.category) + " - " + escapeHTML(item.condition) + "<br>",
      formatRupiah(item.price),
      "</span>"
    ].join("");

    label.querySelector("input").addEventListener("change", function () {
      selectedOfferedItem = item;
      updateCheckoutSummary();
    });

    userItemOptions.appendChild(label);
  });
}

function calculateCheckout() {
  if (!selectedTargetItem || !selectedOfferedItem) {
    return null;
  }

  var difference = selectedTargetItem.price - selectedOfferedItem.price;
  var serviceFee = 10000;
  var shippingFee = 15000;
  var totalPayment = Math.max(difference, 0) + serviceFee + shippingFee;

  return {
    difference: difference,
    serviceFee: serviceFee,
    shippingFee: shippingFee,
    totalPayment: totalPayment
  };
}

function updateCheckoutSummary() {
  var checkoutSummary = document.getElementById("checkoutSummary");
  var submitButton = document.getElementById("submitSwapButton");
  var balance = getBalance();

  checkoutValues = calculateCheckout();
  submitButton.disabled = true;

  if (!selectedTargetItem) {
    checkoutSummary.innerHTML = '<div class="empty-state">Pilih barang dari katalog untuk membuat ringkasan checkout.</div>';
    return;
  }

  if (!selectedOfferedItem) {
    checkoutSummary.innerHTML = '<div class="empty-state">Pilih satu barang penawaran untuk menghitung total pembayaran.</div>';
    return;
  }

  var canPay = balance >= checkoutValues.totalPayment;

  checkoutSummary.innerHTML = [
    createCheckoutRow("Barang tujuan", selectedTargetItem.name),
    createCheckoutRow("Barang penawaran", selectedOfferedItem.name),
    createCheckoutRow("Selisih harga", formatRupiah(Math.max(checkoutValues.difference, 0))),
    createCheckoutRow("Biaya layanan", formatRupiah(checkoutValues.serviceFee)),
    createCheckoutRow("Ongkir simulasi", formatRupiah(checkoutValues.shippingFee)),
    createCheckoutRow("Total pembayaran", formatRupiah(checkoutValues.totalPayment)),
    createCheckoutRow("Saldo kamu", formatRupiah(balance))
  ].join("");

  if (!canPay) {
    showMessage("swapMessage", "Saldo tidak cukup untuk menyelesaikan pengajuan swap ini.", "error");
    return;
  }

  submitButton.disabled = false;
}

function createCheckoutRow(label, value) {
  return '<div class="checkout-row"><span>' + escapeHTML(label) + '</span><strong>' + escapeHTML(value) + "</strong></div>";
}

function handleSubmitSwap() {
  if (!selectedTargetItem || !selectedOfferedItem || !checkoutValues) {
    showMessage("swapMessage", "Data swap belum lengkap.", "error");
    return;
  }

  if (getBalance() < checkoutValues.totalPayment) {
    showMessage("swapMessage", "Saldo tidak cukup untuk mengajukan swap.", "error");
    updateCheckoutSummary();
    return;
  }

  var transaction = {
    id: createId("trx"),
    targetItemName: selectedTargetItem.name,
    offeredItemName: selectedOfferedItem.name,
    totalPayment: checkoutValues.totalPayment,
    status: "Pending",
    date: new Date().toLocaleDateString("id-ID")
  };

  setBalance(getBalance() - checkoutValues.totalPayment);
  addTransaction(transaction);
  localStorage.removeItem(STORAGE_KEYS.selectedItem);
  showMessage("swapMessage", "Pengajuan swap berhasil dibuat.", "success");

  setTimeout(function () {
    window.location.href = "track.html";
  }, 800);
}
