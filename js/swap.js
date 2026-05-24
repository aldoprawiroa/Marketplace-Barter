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
  
  if (!selectedTargetItem) {
    showMessage("swapMessage", "Pilih barang dari katalog terlebih dahulu. Mengalihkan...", "info");
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1500);
    return;
  }
  
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
    '</article>'
  ].join("");
}

function renderUserItemOptions() {
  var userItemOptionsBox = document.getElementById("userItemOptions");
  var userItems = getUserItems();

  if (!userItems || userItems.length === 0) {
    userItemOptionsBox.innerHTML = '<div class="empty-state">Kamu belum memiliki barang. Silakan <a href="upload.html">upload barang</a> terlebih dahulu.</div>';
    return;
  }

  var optionsHTML = [];
  userItems.forEach(function (item) {
    optionsHTML.push(
      '<label class="radio-card">',
      '<input type="radio" name="offeredItem" value="' + escapeHTML(item.id) + '">',
      '<div class="radio-content">',
      '<strong>' + escapeHTML(item.name) + '</strong>',
      '<p>' + formatRupiah(item.price) + '</p>',
      '</div>',
      '</label>'
    );
  });

  userItemOptionsBox.innerHTML = optionsHTML.join("");

  var radioButtons = userItemOptionsBox.querySelectorAll('input[name="offeredItem"]');
  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("change", function (event) {
      var selectedId = event.target.value;
      selectedOfferedItem = userItems.find(function(item) {
        return item.id === selectedId;
      });
      updateCheckoutSummary();
    });
  }
}

function updateCheckoutSummary() {
  var summaryBox = document.getElementById("checkoutSummary");
  var submitButton = document.getElementById("submitSwapButton");

  if (!selectedTargetItem || !selectedOfferedItem) {
    summaryBox.innerHTML = '<div class="empty-state">Pilih barang penawaran kamu untuk melihat ringkasan.</div>';
    submitButton.disabled = true;
    return;
  }

  var priceDifference = selectedTargetItem.price - selectedOfferedItem.price;
  var finalDifference = Math.max(priceDifference, 0);
  
  var serviceFee = 10000;
  var shippingFee = 15000;
  var totalPayment = finalDifference + serviceFee + shippingFee;
  var balance = getBalance();
  var canPay = balance >= totalPayment;

  checkoutValues = {
    totalPayment: totalPayment
  };

  summaryBox.innerHTML = [
    createCheckoutRow("Selisih harga", formatRupiah(finalDifference)),
    createCheckoutRow("Biaya layanan", formatRupiah(serviceFee)),
    createCheckoutRow("Ongkos kirim", formatRupiah(shippingFee)),
    createCheckoutRow("Total pembayaran", formatRupiah(checkoutValues.totalPayment)),
    createCheckoutRow("Saldo kamu", formatRupiah(balance))
  ].join("");

  if (!canPay) {
    showMessage("swapMessage", "Saldo tidak cukup untuk menyelesaikan pengajuan swap ini.", "error");
    submitButton.disabled = true;
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
  
  var currentUserItems = getUserItems();
  var updatedUserItems = currentUserItems.filter(function(item) {
    return item.id !== selectedOfferedItem.id;
  });
  saveUserItems(updatedUserItems);

  localStorage.removeItem(STORAGE_KEYS.selectedItem);

  showMessage("swapMessage", "Pengajuan swap berhasil! Mengalihkan ke tracking...", "success");
  
  setTimeout(function () {
    window.location.href = "track.html";
  }, 1500);
}