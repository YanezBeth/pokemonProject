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
