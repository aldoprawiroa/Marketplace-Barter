document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userDisplay = document.getElementById("user-display");
  const btnAuth = document.getElementById("btn-open-auth");

  if (isLoggedIn === "true") {
    if (btnAuth) btnAuth.style.display = "none"; // Sembunyikan tombol daftar

    // Ambil saldo, jika belum ada set default 2.500.000
    let currentBalance = localStorage.getItem("swapBalance") || 2500000;
    localStorage.setItem("swapBalance", currentBalance);

    if (userDisplay) {
      userDisplay.innerText = `Halo, User! Saldo: Rp ${parseInt(currentBalance).toLocaleString("id-ID")}`;
    }
  }

  if (typeof loadCategories === "function") loadCategories();
});
