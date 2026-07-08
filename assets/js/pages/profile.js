const profileName = document.getElementById("profileName");
const profileLocation = document.getElementById("profileLocation");
const profileJoined = document.getElementById("profileJoined");
const profileBio = document.getElementById("profileBio");
const profileEmail = document.getElementById("profileEmail");
const profileInterests = document.getElementById("profileInterests");
const profilePreferences = document.getElementById("profilePreferences");
const profileContact = document.getElementById("profileContact");
const itemsCount = document.getElementById("itemsCount");
const swapsCount = document.getElementById("swapsCount");
const ratingValue = document.getElementById("ratingValue");
const wishlistCount = document.getElementById("wishlistCount");
const logoutButton = document.getElementById("logoutButton");
const changePasswordButton = document.getElementById("changePasswordButton");

function renderProfile() {
  requireLogin();
  const user = getCurrentUser() || {};

  profileName.textContent = user.name || "SwapSpace User";
  profileEmail.textContent = user.email || "user@example.com";
  profileContact.textContent = user.email || "user@example.com";
  profileBio.textContent = user.bio || "A friendly member of the SwapSpace community who loves clean swaps and transparent exchanges.";
  profileLocation.textContent = user.location || "Jakarta, Indonesia";
  profileJoined.textContent = user.joined || "Joined January 2025";
  profileInterests.textContent = user.interests || "Lifestyle, Music, Tech";
  profilePreferences.textContent = user.preferences || "Clean items, campus-safe swaps";

  const items = user.inventory || [];
  itemsCount.textContent = items.length;
  swapsCount.textContent = user.completedSwaps || 12;
  ratingValue.textContent = (user.rating || 4.8).toFixed(1);
  wishlistCount.textContent = (user.wishlistCount || 8).toString();
}

function handleLogout() {
  setLoggedIn(false);
  window.location.href = "login.html";
}

function initProfilePage() {
  renderProfile();
  logoutButton.addEventListener("click", handleLogout);
  changePasswordButton.addEventListener("click", function () {
    alert("Change password feature is not yet available in this demo.");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProfilePage);
} else {
  initProfilePage();
}
