import { displayTypes } from "./pokemonTypes.mjs";

// Call the function to fetch and create HTML structure for Pokémon types
document.addEventListener("DOMContentLoaded", async () => {
  await displayTypes();
});
