/* SHARED UTILS - DO NOT EDIT UNLESS THERE IS A BUG */

function formatRupiah(value) {
  var numberValue = Number(value) || 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(numberValue);
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showMessage(elementId, message, type) {
  var messageType = type || "success";
  var element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  element.textContent = message;
  element.className = "message show " + messageType;
}

function createId(prefix) {
  var safePrefix = prefix || "id";
  return safePrefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}
