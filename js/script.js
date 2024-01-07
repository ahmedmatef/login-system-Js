"use strict";

var userNameInput = document.getElementById("userName");
var userEmailInput = document.getElementById("userEmail");
var userPassInput = document.getElementById("userPass");
var btnSignUp = document.getElementById("signup");
var allUsers = [];

// ******SIGNUP******
// Check if there are already users stored in localStorage
if (localStorage.getItem("allUsers") !== null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

// Function to handle sign-up
function SignUp() {
  // Check if inputs are valid and user does not already exist
  if (ifInputsValid() && isExist() === false) {
    // Create a new user object
    var usersInput = {
      name: userNameInput.value,
      email: userEmailInput.value,
      password: userPassInput.value,
    };
    // Add the user to the array
    allUsers.push(usersInput);
    // Update localStorage with the new array of users
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    // Show the sign-in form
    document
      .getElementById("SigninfromUp")
      .classList.replace("d-none", "d-block");
  } else {
    console.log("Invalid input. Please check your input fields.");
  }
}

// Function to check if all inputs are valid
function ifInputsValid() {
  return validateUserName() && validateUserEmail() && validateUserPass();
}

// Function to check if a user already exists
function isExist() {
  for (let i = 0; i < allUsers.length; i++) {
    if (
      allUsers[i].name.toLowerCase() === userNameInput.value.toLowerCase() ||
      allUsers[i].email.toLowerCase() === userEmailInput.value.toLowerCase()
    ) {
      // Show an alert if the user already exists
      document
        .getElementById("exist-alert")
        .classList.replace("d-none", "d-block");
      return true;
    }
  }
  // Hide the alert if the user does not exist
  document.getElementById("exist-alert").classList.replace("d-block", "d-none");
  return false;
}

// Function to validate the user name
function validateUserName() {
  var regex = /^(?=.*[A-Z])[A-Za-z]{1,20}$/;
  if (regex.test(userNameInput.value)) {
    userNameInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    userNameInput.classList.add("is-invalid");
    return false;
  }
}

// Function to validate the user email
function validateUserEmail() {
  var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (regex.test(userEmailInput.value)) {
    userEmailInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    userEmailInput.classList.add("is-invalid");
    return false;
  }
}

// Function to validate the user password
function validateUserPass() {
  var regex = /^.{6,}$/;
  if (regex.test(userPassInput.value)) {
    userPassInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    userPassInput.classList.add("is-invalid");
    return false;
  }
}

// ******SIGNIN******
var loginUserEmail = document.getElementById("emailInput");
var loginUserPass = document.getElementById("passInput");
var btnLogin = document.getElementById("loginbtn");
var USERName = JSON.parse(localStorage.getItem("usernameLog"));

// Function to handle login
function login() {
  for (let i = 0; i < allUsers.length; i++) {
    if (
      allUsers[i].email.toLowerCase() === loginUserEmail.value.toLowerCase() &&
      allUsers[i].password === loginUserPass.value
    ) {
      // Set the username for the logged-in user
      USERName = allUsers[i].name;
      localStorage.setItem("usernameLog", JSON.stringify(USERName));
      // Redirect to the home page
      window.location.href = "home.html";
      return true;
    }
  }
  // Show an error message if login fails
  document.getElementById("logError").classList.replace("d-none", "d-block");
}

// Function to display a welcome message for the logged-in user
function welcomeUser() {
  var homeWelcomeMessage = document.getElementById("welcomeUser");
  homeWelcomeMessage.innerHTML = `<h1 class="text-white">Welcome ${USERName}</h1>`;
}

// ****** LOGOUT ******
function logout() {
  localStorage.removeItem("usernameLog");
}
