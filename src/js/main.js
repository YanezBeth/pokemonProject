import pokemon from "pokemontcgsdk";
import { loadHeaderFooter } from "./utils.mjs";


const apiKey = import.meta.env.VITE_API_KEY;

pokemon.configure({
  apiKey,
});

document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer
  loadHeaderFooter();
});

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("message");

if (message) {
  // Display the message
  const messageElement = document.getElementById("nav-p");
  messageElement.textContent = message;
}