import {
  getParam
} from "./utils.mjs";
import {
  allPokemonByType
} from "./pokemonTypes.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const category = getParam("category");
  if (category) {
    await displayPokemonByType(category);
  }
});

// display all the pokemon of a specific type
async function displayPokemonByType(type) {
  try {
    const pokemonList = await allPokemonByType(type);
    const pokemonByTypeContainer = document.getElementById("pokemon-by-type");
    const pokemonByTypeList = document.createElement("ul");
    pokemonByTypeList.id = "pokemon-by-type-list";

    const itemsPerPage = 9;
    let currentPage = 1;

    let pokemonListToDisplay = pokemonList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    for (const pokemon of pokemonListToDisplay) {
      const pokemonItem = document.createElement("li");

      // Display the image if available
      if (pokemon.images && pokemon.images.small) {
        const image = document.createElement("img");
        image.src = pokemon.images.small;
        image.alt = pokemon.name;
        pokemonItem.appendChild(image);
      }

      // Display the name
      const name = document.createElement("h3");
      name.textContent = pokemon.name;
      pokemonItem.appendChild(name);

      pokemonByTypeList.appendChild(pokemonItem);
    }

    pokemonByTypeContainer.appendChild(pokemonByTypeList);

    // Generate pagination links
    generatePaginationLinks(pokemonList.length, itemsPerPage, currentPage);
  } catch (error) {
    console.error(`Error displaying Pokémon type ${type}:`, error);
  }
}


async function generatePaginationLinks(totalPokemon, itemsPerPage, currentPage, type) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalPokemon / itemsPerPage);
  let updatedPage = currentPage; // Create a new variable for updated page

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;

    if (i === updatedPage) {
      pageLink.classList.add("active");
    }

    pageLink.addEventListener("click", () => {
      updatedPage = i; // Update the new variable value

      // Get the current type parameter from the URL
      const currentType = getParam("category");

      // Construct the URL with updated page number and type
      const updatedURL = `http://localhost:5173/pokemonByType/index.html?category=${currentType}&currentPage=${updatedPage}`;

      // Redirect to the updated URL
      window.location.href = updatedURL;

      // Explicitly pass the updated 'updatedPage' value to displayPokemonByType
      displayPokemonByType(currentType, updatedPage);
    });

    paginationContainer.appendChild(pageLink);
  }
}
