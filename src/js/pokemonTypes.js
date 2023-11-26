import { getParam } from "./utils.mjs";
import { displayTypes } from "./pokemonTypes.mjs";

const category = getParam("category");

// Call the function to fetch and create HTML structure for Pokémon types
document.addEventListener("DOMContentLoaded", async () => {
  await displayTypes();
});
