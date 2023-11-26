import pokemon from "pokemontcgsdk";
import { loadHeaderFooter } from "./utils.mjs";

const apiKey = import.meta.env.VITE_API_KEY;

pokemon.configure({ apiKey });

// // Fetch all Pokémon types from Pokemon TCG API
// async function fetchPokemonTypes() {
//   try {
//     return await pokemon.type.all();
//   } catch (error) {
//     console.error("Error fetching Pokémon types:", error);
//     throw error; // Re-throw the error to handle it elsewhere if needed
//   }
// }

// // Create list of pokemon types
// function createPokemonTypesList(types) {
//   const typesList = document.createElement("ul");

//   types.forEach((type) => {
//     const typeItem = document.createElement("li");

//     // Create a link for each type
//     const typeLink = document.createElement("a");
//     typeLink.textContent = type;
//     typeLink.href = `/type/${type}`; // Update the URL as needed

//     // Append the link to the list item
//     typeItem.appendChild(typeLink);

//     // Append the list item to the list
//     typesList.appendChild(typeItem);
//   });

//   return typesList;
// }
// // Add list on home index page
// async function fetchPokemonTypeLinks() {
//   try {
//     const types = await fetchPokemonTypes();
//     const typesContainer = document.getElementById("pokemonTypes");
//     const typesList = createPokemonTypesList(types);

//     // Add a click event listener to each type link
//     typesList.querySelectorAll("a").forEach((typeLink) => {
//       typeLink.addEventListener("click", (event) => {
//         event.preventDefault();
//         const selectedType = typeLink.textContent;
//         // Navigate to a new page or section with Pokémon of the selected type
//         // Example: window.location.href = `/type/${selectedType}`;
//         console.log(`Selected type: ${selectedType}`);
//       });
//     });

//     typesContainer.appendChild(typesList);
//   } catch (error) {
//     console.error("Error handling Pokémon types:", error);
//   }
// }

// // Call the function to fetch and create HTML structure for Pokémon types
// fetchPokemonTypes();

loadHeaderFooter();
