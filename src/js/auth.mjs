/* LOGIN Page, Get username from local storage */
export function loginUser() {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Validate login credentials
    const valid = await validateLogin(event.target.elements);
    if (valid) {
      const username = document.getElementById("userName").value;
      localStorage.setItem("userName", username); // store username in local storage
      updateGreeting(username); // update greeting message
    }
  });
}

/* Registration page */
export function registerUser() {
  const registerForm = document.getElementById("registerUser");
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Validate registration data
    const valid = await validateRegistration(event.target.elements);
    if (valid) {
      const firstName = document.getElementById("userFirstName").value;
      localStorage.setItem("userName", firstName); // store username in local storage
      updateGreeting(firstName); // update greeting message
    }
  });
}

//async function validateLogin() {
async function validateLogin(elements) {
  const username = elements.userName.value;
  const password = elements.userPassword.value;

  let valid = true;

  // Check fields aren't empty
  if (username.length === 0 || password.length === 0) {
    valid = false;
  } else {
      document.getElementById("form-contain").style.display = "none";
      document.getElementById("message").style.display = "inline-block";
    return valid;
  }
}

//async function validateRegistration() {
async function validateRegistration(elements) {
  const firstName = elements.userFirstName.value;
  const lastName = elements.userLastName.value;
  const email = elements.userEmail.value;
  const password = elements.userPassword.value;

  let valid = true;

  // Check fields aren't empty
  if (firstName.length === 0 || lastName.length === 0 || !email.includes("@") || password.length === 0) {
    valid = false;
  } else {
    document.getElementById("form-contain").style.display = "none";
    document.getElementById("message").style.display = "inline-block";
    return valid;
  }
}

export function updateGreeting(username) {
  const navElement = document.querySelector("[id='nav-p']");
  navElement.textContent = `I choose you, ${username}!`;
}





//import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
//import { jwtDecode } from "jwt-decode";
//import { loginRequest } from "./displayPokemon.mjs";

// const tokenKey = "so-token";

// function isTokenValid(token) {
//   // check to make sure a token was actually passed in.
//   if (token) {
//     // decode the token
//     const decoded = jwtDecode(token);
//     // get the current date
//     let currentDate = new Date();
//     // JWT exp is in seconds, the time from our current date will be milliseconds.
//     if (decoded.exp * 1000 < currentDate.getTime()) {
//       //token expiration has passed
//       console.log("Token expired.");
//       return false;
//     } else {
//       // token not expired
//       console.log("Valid token");
//       return true;
//     }
//     //no token...automatically return false.
//   } else return false;
// }

// //import and call this function on any page we want protected.
// // if there is a valid token it will be returned, otherwise we will redirect to the login page.
// export function checkLogin() {
//   // get the token from localStorage
//   const token = getLocalStorage(tokenKey);
//   // use the isTokenValid function to check the validity of the token
//   const valid = isTokenValid(token);
//   // if the token is NOT valid
//   if (!valid) {
//     //remove stored token
//     localStorage.removeItem(tokenKey);
//     // redirect to login while sending the current URL along as a parameter
//     // grab the current location from the browser
//     const location = window.location;
//     // check out what location contains
//     console.log(location);
//     // redirect by updating window.location =
//     window.location = `/login/index.html?redirect=${location.pathname}`;
//   } else return token; //if they are logged in then just return the token.
// }

// export async function login(creds, redirect = "/") {
//     console.log(creds);
//   try {
//     const token = await loginRequest(creds);
//     console.log(token);
//     setLocalStorage(tokenKey, token);
//     console.log(redirect);
//     window.location = redirect;
//   } catch (err) {
//     alertMessage(err.message.message);
//   }
// }
