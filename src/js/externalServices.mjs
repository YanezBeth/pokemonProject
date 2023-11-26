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

async function displayPokemonByType(type) {
  try {
    const pokemonList = await allPokemonByType(type);
    const pokemonByTypeContainer = document.getElementById("pokemon-by-type");
    const pokemonByTypeList = document.createElement("ul");
    pokemonByTypeList.id = "pokemon-by-type-list";

    pokemonList.forEach((pokemon) => {
      const pokemonItem = document.createElement("li");

      // Display the image if available
      if (pokemon.images && pokemon.images.large) {
        const image = document.createElement("img");
        image.src = pokemon.images.small;
        image.alt = pokemon.name;
        pokemonItem.appendChild(image);
      }

      // Display the name
      const name = document.createElement("h3");
      name.textContent = pokemon.name;
      pokemonItem.appendChild(name);

      // Add other details or properties you want to display

      pokemonByTypeList.appendChild(pokemonItem);
    });

    pokemonByTypeContainer.appendChild(pokemonByTypeList);
  } catch (error) {
    console.error(`Error displaying Pokémon type ${type}:`, error);
  }
}
