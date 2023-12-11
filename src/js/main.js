import pokemon from "pokemontcgsdk";
import { loadHeaderFooter } from "./utils.mjs";
import { updateGreeting } from "./auth.mjs";

const apiKey = import.meta.env.VITE_API_KEY;

pokemon.configure({
  apiKey,
});

document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer
  loadHeaderFooter();

  // Update greeting with username if stored in local storage
  const storedUsername = localStorage.getItem("userName");
  if (storedUsername) {
    updateGreeting(storedUsername);
  }
});

/* Randomize Fireflies */
document.addEventListener("DOMContentLoaded", function () {
  const fireflies = document.querySelectorAll(".fireflies li");

  fireflies.forEach((firefly) => {
    // Set random starting positions within the entire height of the page
    const randomTop = Math.floor(Math.random() * window.innerHeight);
    const randomLeft = Math.floor(Math.random() * window.innerWidth);

    firefly.style.top = `${randomTop}px`;
    firefly.style.left = `${randomLeft}px`;
  });
});
