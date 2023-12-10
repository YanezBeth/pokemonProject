import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer
  loadHeaderFooter();
});

// console.log(window.location.href);
// let redirect = getParam("redirect");

// if (redirect === null) {
//   redirect = "./index.html";
// }
// document.querySelector("#loginButton").addEventListener("click", (e) => {
//   const email = document.querySelector("#userEmail").value;
//   const password = document.querySelector("#userPassword").value;
//   console.log(email, password);
//   login({
//     email,
//     password
//   }, redirect);
// });

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("userName").value;
  localStorage.setItem("userName", username); // store username in local storage
  updateGreeting(username); // update greeting message
  // After successful login, redirect with message:
  window.location.href = "./index.html?message=Sign in successful!";
});

function updateGreeting(username) {
  const greetingElement = document.getElementById("nav-p");
  greetingElement.textContent = `Hello, ${username}`;
}

const storedUsername = localStorage.getItem("userName");
if (storedUsername) {
  updateGreeting(storedUsername);
}
