import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer
  loadHeaderFooter();
});

const regBtn = document.getElementById("regbtn");
regBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const firstName = document.getElementById("userFirstName").value;
  //   const lastName = document.getElementById("userLastName").value;
  //   const email = document.getElementById("userEmail").value;
  //   const password = document.getElementById("userPassword").value;
  updateGreeting(firstName);
  // Redirect with message
  window.location.href = "./index.html?message=Registration successful!";
});

function updateGreeting(firstName) {
  const greetingElement = document.getElementById("nav-p");
  greetingElement.textContent = `Welcome, ${firstName}`;
}

const storedUsername = localStorage.getItem("userName");
if (storedUsername) {
  updateGreeting(storedUsername);
}
