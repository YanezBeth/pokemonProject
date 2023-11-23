import pokemon from "pokemontcgsdk";

const baseURL = import.meta.env.VITE_POKE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

pokemon.configure({ apiKey });

// Function to fetch and display all Pokémon types
async function fetchAndDisplayPokemonTypes() {
  try {
    // Set API key in the header per Pokemon TGC instructions
    pokemon.configure({ apiKey });

    const types = await pokemon.type.all();
    //console.log("Types response:", types);

    // Display the types in rows of 4 within .main-right
    const typesContainer = document.getElementById("pokemonTypes");
    const typesList = document.createElement("ul");
    let row = document.createElement("li");

    for (let i = 0; i < types.length; i++) {
      const typeItem = document.createElement("li");
      typeItem.textContent = types[i];

      if (i % 4 === 0) {
        if (row) {
          typesList.appendChild(row);
        }

        row = document.createElement("li");
      }

      row.appendChild(typeItem);
    }

    if (row) {
      typesList.appendChild(row);
    }

    typesContainer.appendChild(typesList);
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
  }
}

// Call the function to fetch and display Pokémon types
fetchAndDisplayPokemonTypes();
