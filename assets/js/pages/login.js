const DEMO_EMAIL = "demo@swapspace.id";
const DEMO_PASSWORD = "demo123";
const STORAGE_KEYS_LOCAL = {
  email: "swapspace_login_email",
  remember: "swapspace_login_remember",
};

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const rememberInput = document.getElementById("rememberInput");
const loginButton = document.getElementById("loginButton");
const demoButton = document.getElementById("demoButton");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePassword(value) {
  return value.trim().length >= 6;
}

function updateValidation() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value;
  let valid = true;

  if (!emailValue) {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!validateEmail(emailValue)) {
    emailError.textContent = "Enter a valid email address.";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  if (!passwordValue) {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (!validatePassword(passwordValue)) {
    passwordError.textContent = "Password must be at least 6 characters.";
    valid = false;
  } else {
    passwordError.textContent = "";
  }

  loginButton.disabled = !valid;
}

function loadLoginState() {
  const savedEmail = localStorage.getItem(STORAGE_KEYS_LOCAL.email);
  const savedRemember = localStorage.getItem(STORAGE_KEYS_LOCAL.remember) === "true";

  if (savedEmail) {
    emailInput.value = savedEmail;
  }
  rememberInput.checked = savedRemember;
  updateValidation();
}

function saveLoginState() {
  if (rememberInput.checked) {
    localStorage.setItem(STORAGE_KEYS_LOCAL.email, emailInput.value.trim());
    localStorage.setItem(STORAGE_KEYS_LOCAL.remember, "true");
  } else {
    localStorage.removeItem(STORAGE_KEYS_LOCAL.email);
    localStorage.removeItem(STORAGE_KEYS_LOCAL.remember);
  }
}

function handleLogin(event) {
  event.preventDefault();
  updateValidation();

  if (loginButton.disabled) {
    return;
  }

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value;

  if (emailValue === DEMO_EMAIL && passwordValue === DEMO_PASSWORD) {
    setLoggedIn(true);
    saveLoginState();
    window.location.href = "../pages/dashboard.html";
    return;
  }

  if (validateEmail(emailValue) && validatePassword(passwordValue)) {
    setLoggedIn(true);
    saveLoginState();
    window.location.href = "../pages/dashboard.html";
  }
}

function handleDemoLogin() {
  emailInput.value = DEMO_EMAIL;
  passwordInput.value = DEMO_PASSWORD;
  rememberInput.checked = true;
  updateValidation();
}

function initLoginPage() {
  loadLoginState();
  emailInput.addEventListener("input", updateValidation);
  passwordInput.addEventListener("input", updateValidation);
  rememberInput.addEventListener("change", saveLoginState);
  loginForm.addEventListener("submit", handleLogin);
  demoButton.addEventListener("click", handleDemoLogin);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLoginPage);
} else {
  initLoginPage();
}
