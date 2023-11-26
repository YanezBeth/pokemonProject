import pokemon from "pokemontcgsdk";
const apiKey =
  import.meta.env.VITE_API_KEY;
pokemon.configure({
  apiKey
});

// Fetch all Pokémon types from Pokemon TCG API
export async function fetchPokemonTypes() {
  try {
    return await pokemon.type.all();
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
    throw error;
  }
}

// Create list of pokemon types
export function typesListNLink(types) {
  const typesList = document.createElement("ul");
  types.forEach((type) => {
    const typeItem = document.createElement("li");
    // Create a link for each type
    const typeLink = document.createElement("a");
    typeLink.textContent = type;
    typeLink.href = `/type/${type}`;
    // Add the link to the list of pokemon
    typeItem.appendChild(typeLink);
    // Add the type to the list
    typesList.appendChild(typeItem);
  });
  return typesList;
}

// Add list on home index page with working links to each category/type 
export async function displayTypes() {
  try {
    const types = await fetchPokemonTypes();
    console.log(`Selected type: ${types}`);
    const typesContainer = document.getElementById("pokemonTypes");
    const typesList = typesListNLink(types);
    // Add a click event listener to each types link
    typesList.querySelectorAll("a").forEach((typeLink) => {
      typeLink.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedType = typeLink.textContent;
        // Go to pokemonByType/index.html and display all associated pokemon of that type
        window.location.href = `/pokemonByType/index.html?category=${selectedType}`;
        console.log(`Selected type: ${selectedType}`);
      });
    });
    typesContainer.appendChild(typesList);
  } catch (error) {
    console.error("Error displaying Pokémon types:", error);
  }
}

// export async function allPokemonByType(type) {
//     try {
//       // Fetch Pokémon cards based on type
//       const response = await pokemon.card.where({ types: type });
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching Pokémon of type ${type}:`, error);
//       throw error;
//     }
//   }

// Function to fetch all Pokémon of a specific type
export async function allPokemonByType(type) {
  try {
    // Use the where method to filter cards by type
    const result = await pokemon.card.where({
      q: `types:${type}`
    });

    // Return the data property from the result
    return result.data;
  } catch (error) {
    console.error(`Error fetching Pokémon of type ${type}:`, error);
    throw error;
  }
}
