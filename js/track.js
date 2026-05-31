/* INDRA NUR WAHYU SAPUTRA - TRACKING & PROFIL */

document.addEventListener("DOMContentLoaded", function () {
  renderTrackingPage();

  document.getElementById("transactionFilter").addEventListener("change", renderTransactionList);
  document.getElementById("resetDemoButton").addEventListener("click", handleResetDemo);
});

function renderTrackingPage() {
  renderProfileSummary();
  renderTransactionList();
}

function renderProfileSummary() {
  var user = getCurrentUser();
  var userItems = getUserItems();
  var transactions = getTransactions();

  document.getElementById("profileName").textContent = user.name;
  document.getElementById("profileBalance").textContent = formatRupiah(getBalance());
  document.getElementById("profileItemCount").textContent = userItems.length;
  document.getElementById("profileTransactionCount").textContent = transactions.length;
}

function renderTransactionList() {
  var transactionList = document.getElementById("transactionList");
  var filterValue = document.getElementById("transactionFilter").value;
  var transactions = getTransactions();

  if (filterValue !== "all") {
    transactions = transactions.filter(function (transaction) {
      return transaction.status === filterValue;
    });
  }

  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = '<div class="empty-state">Belum ada transaksi dengan status ini.</div>';
    return;
  }

  transactions.forEach(function (transaction) {
    var statusClass = getStatusClass(transaction.status);
    var card = document.createElement("article");
    card.className = "transaction-card";
    card.innerHTML = [
      "<h3>" + escapeHTML(transaction.targetItemName) + "</h3>",
      '<span class="badge ' + statusClass + '">' + escapeHTML(transaction.status) + "</span>",
      "<p>Ditukar dengan: " + escapeHTML(transaction.offeredItemName) + "</p>",
      "<p>Total pembayaran: <strong>" + formatRupiah(transaction.totalPayment) + "</strong></p>",
      "<p>Tanggal: " + escapeHTML(transaction.date) + "</p>",
      "<p>ID Transaksi: " + escapeHTML(transaction.id) + "</p>"
    ].join("");
    transactionList.appendChild(card);
  });
}

function getStatusClass(status) {
  if (status === "Berhasil") {
    return "success";
  }

  if (status === "Gagal") {
    return "failed";
  }

  return "pending";
}

function handleResetDemo() {
  var confirmed = confirm("Reset seluruh data demo SwapSpace?");

  if (!confirmed) {
    return;
  }

  resetDemoData();
  document.getElementById("transactionFilter").value = "all";
  renderTrackingPage();
}
