import {
  getParam
} from "./utils.mjs";
import {
  allPokemonByType
} from "./pokemonTypes.mjs";

import pokemon from "pokemontcgsdk";

const apiKey =
  import.meta.env.VITE_API_KEY;
pokemon.configure({
  apiKey
});

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

    pokemonList.forEach((pokes) => {
      const pokemonItem = document.createElement("li");
      pokemonItem.textContent = pokes.name;
      const image = document.createElement("img");
      image.src = pokemon.images.large;
      pokemonItem.appendChild(image);

      pokemonByTypeList.appendChild(pokemonItem);
    });

    pokemonByTypeContainer.appendChild(pokemonByTypeList);
  } catch (error) {
    console.error(`Error displaying Pokémon type ${type}:`, error);
  }
}
