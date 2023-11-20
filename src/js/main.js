import pokemon from "pokemontcgsdk";

const baseURL = import.meta.env.VITE_POKE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

pokemon.configure({ apiKey });

// Function to fetch and display all Pokémon types
async function fetchAndDisplayPokemonTypes() {
  try {
    // Set the API key in the headers
    pokemon.configure({ apiKey });

    const types = await pokemon.type.all();
    console.log("Types response:", types);

    // Display the types on the webpage
    const typesContainer = document.getElementById("pokemonTypes");
    typesContainer.innerHTML = "<h2>All Pokémon Types</h2>";

    const typesList = document.createElement("ul");
    types.forEach((type) => {
      // <-- Corrected this line
      const typeItem = document.createElement("li");
      typeItem.textContent = type;
      typesList.appendChild(typeItem);
    });

    typesContainer.appendChild(typesList);
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
  }
}

// Call the function to fetch and display Pokémon types
fetchAndDisplayPokemonTypes();
