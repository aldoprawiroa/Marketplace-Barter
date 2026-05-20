/* ABDIL FAWASTA RASYADAN - AKUN & LOGIN */

var generatedOtp = "";
var pendingEmail = "";

document.addEventListener("DOMContentLoaded", function () {
  renderAccountStatus();

  document.getElementById("loginForm").addEventListener("submit", handleLoginSubmit);
  document.getElementById("otpForm").addEventListener("submit", handleOtpSubmit);
  document.getElementById("logoutButton").addEventListener("click", handleLogout);
});

function handleLoginSubmit(event) {
  event.preventDefault();

  var emailInput = document.getElementById("emailInput");
  var passwordInput = document.getElementById("passwordInput");
  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();

  if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    showMessage("accountMessage", "Email belum valid. Gunakan format seperti nama@email.com.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("accountMessage", "Password minimal 6 karakter.", "error");
    return;
  }

  pendingEmail = email;
  generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
  document.getElementById("otpForm").classList.remove("hidden");
  showMessage("accountMessage", "OTP simulasi kamu: " + generatedOtp, "info");
}

function handleOtpSubmit(event) {
  event.preventDefault();

  var otpInput = document.getElementById("otpInput").value.trim();

  if (otpInput !== generatedOtp) {
    showMessage("accountMessage", "OTP tidak sesuai. Periksa kembali kode yang ditampilkan.", "error");
    return;
  }

  setCurrentUser({
    name: DEFAULT_USER.name,
    email: pendingEmail
  });
  setLoggedIn(true);
  renderAccountStatus();
  showMessage("accountMessage", "Login berhasil. Kamu akan diarahkan ke katalog.", "success");

  setTimeout(function () {
    window.location.href = "index.html";
  }, 900);
}

function handleLogout() {
  setLoggedIn(false);
  renderAccountStatus();
  showMessage("accountMessage", "Logout berhasil. Status akun kembali menjadi belum login.", "success");
}

function renderAccountStatus() {
  var user = getCurrentUser();
  var loginStatus = document.getElementById("loginStatus");
  var balanceText = document.getElementById("balanceText");

  if (isLoggedIn()) {
    loginStatus.textContent = "Login sebagai " + user.name + " (" + user.email + ")";
  } else {
    loginStatus.textContent = "Belum login";
  }

  balanceText.textContent = "Saldo: " + formatRupiah(getBalance());
}
