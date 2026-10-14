// Get the form and message elements.
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");
const togglePassword = document.getElementById("togglePassword");

let submitted = false;

// Get the form controls.
const studentId = document.getElementById("studentId");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const dob = document.getElementById("dob");
const program = document.getElementById("program");
const yearLevel = document.getElementById("yearLevel");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const address = document.getElementById("address");
const agreement = document.getElementById("agreement");
const male = document.getElementById("male");
const female = document.getElementById("female");
const otherGender = document.getElementById("otherGender");

// Display an individual error and apply or remove its CSS class.
function showError(name, message) {
  const container = document.getElementById(name + "Field");
  const errorMessage = document.getElementById(name + "Error");

  errorMessage.textContent = message;

  if (message !== "") {
    container.classList.add("error");
  } else {
    container.classList.remove("error");
  }
}

function clearSuccess() {
  successMessage.textContent = "";
}

// Validate one field.
function validateField(name) {
  let message = "";

  if (name === "gender") {
    if (!male.checked && !female.checked && !otherGender.checked) {
      message = "Please select your gender.";
    }
  } else {
    const input = document.getElementById(name);

    // Read custom data-* attributes using dataset.
    const label = input.dataset.label;
    const required = input.dataset.required;
    const value = input.value.trim();

    if (name === "agreement") {
      if (required === "true" && !input.checked) {
        message = "Please confirm that your information is correct.";
      }
    } else if (required === "true" && value === "") {
      message = "Please enter or select your " + label + ".";
    } else if (
      name === "studentId" &&
      !/^\d{4}-\d{4}$/.test(value)
    ) {
      message =
        "Use the Student ID format YYYY-NNNN, for example 2026-0001.";
    } else if (
      name === "fullName" &&
      !/[A-Za-z]/.test(value)
    ) {
      message = "Enter a full name containing letters.";
    } else if (name === "email") {
      // Clear the old custom message before checking validity.
      input.setCustomValidity("");
      input.value = value;

      if (!input.validity.valid) {
        message = "Please enter a valid email address.";
      }
    } else if (
      name === "phone" &&
      !/^09\d{9}$/.test(value)
    ) {
      message =
        "Enter 11 digits beginning with 09, for example 09123456789.";
    } else if (
      name === "password" &&
      value.length < 8
    ) {
      message = "Use a password with at least 8 characters.";
    } else if (
      name === "confirmPassword" &&
      value !== password.value.trim()
    ) {
      message = "Passwords do not match. Enter the same password.";
    }

    input.setCustomValidity(message);
  }

  showError(name, message);
  return message === "";
}

// Check every field so all error messages appear.
function validateAll() {
  let valid = true;

  if (!validateField("studentId")) valid = false;
  if (!validateField("fullName")) valid = false;
  if (!validateField("email")) valid = false;
  if (!validateField("phone")) valid = false;
  if (!validateField("dob")) valid = false;
  if (!validateField("gender")) valid = false;
  if (!validateField("program")) valid = false;
  if (!validateField("yearLevel")) valid = false;
  if (!validateField("password")) valid = false;
  if (!validateField("confirmPassword")) valid = false;
  if (!validateField("address")) valid = false;
  if (!validateField("agreement")) valid = false;

  return valid;
}

// Handle submission using the event object.
form.addEventListener("submit", function(event) {
  // Stop the browser from navigating away during validation.
  event.preventDefault();
  submitted = true;

  // Remove extra spaces.
  studentId.value = studentId.value.trim();
  fullName.value = fullName.value.trim();
  email.value = email.value.trim();
  phone.value = phone.value.trim();
  password.value = password.value.trim();
  confirmPassword.value = confirmPassword.value.trim();
  address.value = address.value.trim();

  if (validateAll()) {
    successMessage.textContent =
      "Registration successful! Your information passed validation.";
  } else {
    clearSuccess();
  }
});

// Correct errors dynamically using event.target.
function handleCorrection(event) {
  clearSuccess();

  if (submitted) {
    validateField(event.target.name);

    if (event.target.name === "password") {
      validateField("confirmPassword");
    }
  }
}

studentId.addEventListener("input", handleCorrection);
fullName.addEventListener("input", handleCorrection);
email.addEventListener("input", handleCorrection);
phone.addEventListener("input", handleCorrection);
dob.addEventListener("change", handleCorrection);
program.addEventListener("change", handleCorrection);
yearLevel.addEventListener("change", handleCorrection);
password.addEventListener("input", handleCorrection);
confirmPassword.addEventListener("input", handleCorrection);
address.addEventListener("input", handleCorrection);
agreement.addEventListener("change", handleCorrection);
male.addEventListener("change", handleCorrection);
female.addEventListener("change", handleCorrection);
otherGender.addEventListener("change", handleCorrection);

// Toggle a CSS class and change the password type attributes.
togglePassword.addEventListener("click", function() {
  togglePassword.classList.toggle("is-visible");

  if (password.type === "password") {
    password.type = "text";
    confirmPassword.type = "text";
    togglePassword.textContent = "Hide passwords";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
    togglePassword.textContent = "Show passwords";
  }
});

// Native reset clears the entered values.
form.addEventListener("reset", function() {
  submitted = false;
  clearSuccess();

  // Clear validation errors.
  studentId.setCustomValidity("");
  showError("studentId", "");

  fullName.setCustomValidity("");
  showError("fullName", "");

  email.setCustomValidity("");
  showError("email", "");

  phone.setCustomValidity("");
  showError("phone", "");

  dob.setCustomValidity("");
  showError("dob", "");

  program.setCustomValidity("");
  showError("program", "");

  yearLevel.setCustomValidity("");
  showError("yearLevel", "");

  password.setCustomValidity("");
  showError("password", "");

  confirmPassword.setCustomValidity("");
  showError("confirmPassword", "");

  address.setCustomValidity("");
  showError("address", "");

  agreement.setCustomValidity("");
  showError("agreement", "");

  showError("gender", "");

  // Restore the original password visibility.
  togglePassword.classList.remove("is-visible");
  togglePassword.textContent = "Show passwords";
  password.type = "password";
  confirmPassword.type = "password";
});