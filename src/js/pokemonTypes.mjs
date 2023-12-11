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

/* Get the 1st found associated image for 
each type to display on HOME page */
async function typeImage(type) {
  try {
    const pokemonImageMap = {
      "Colorless": "Altaria",
      "Darkness": "Drapion",
      "Dragon": "Dragonair",
      "Fairy": "Sylveon",
      "Fighting": "Lucario",
      "Fire": "Arcanine",
      "Grass": "Bulbasaur",
      "Lightning": "Pikachu",
      "Metal": "Dialga",
      "Psychic": "Mew",
      "Water": "Blastoise",
    };

    if (!(type in pokemonImageMap)) {
      throw new Error(`Invalid type: ${type}`);
    }

    const pokemonName = pokemonImageMap[type];

    const pokemonData = await pokemon.card.where({
      q: `name:${pokemonName}`
    });

    if (pokemonData.data.length === 0) {
      throw new Error(`Pokemon not found: ${pokemonName}`);
    }

    return pokemonData.data[0].images.large;
  } catch (error) {
    console.error(`Error fetching image for type ${type}:`, error);
    throw error;
  }
}

// Create a list of pokemon types with images for the Home page
export async function typesListNLink(types) {
  // Create an unordered list of types
  const typesList = document.createElement("ul");

  /* Took too long when it was getting images singularily, 
  get all type images concurrently with a promise */
  const imgPromises = types.map(async (type) => {
    const typeImg = await typeImage(type);
    //console.log(type);
    return {
      type,
      img: typeImg
    };
  });

  const typeImages = await Promise.all(imgPromises);

  for (const {
      type,
      img
    } of typeImages) {
    // Add each type to the li element, carousel, as an item
    // For carousel
    /* This line doesn't work: 
    const typeItem = document.createElement("li id='card-type'");
    The id or class must be set in a seperate step because 
    the createElement function only accepts the tag name as an arg */
    const typeItem = document.createElement("li");
    // add the class "fade" to each li element
    typeItem.classList.add("fade");
    // Create a link for each type by passing in the type
    const typeLink = document.createElement("a");
    typeLink.textContent = type;
    typeLink.href = `/type/${type}`;

    // Create image element
    const typeImageElement = document.createElement("img");
    typeImageElement.src = img;
    typeImageElement.alt = `${type} Type`;

    // Append the image to card-types
    typeLink.appendChild(typeImageElement);

    // Append the link to card-types
    typeItem.appendChild(typeLink);

    // Add the type item to card-types
    typesList.appendChild(typeItem).classList.add("card-type");
    //console.log(typeLink);
    //console.log("card-type");
  }
  //console.log(typesList);
  return typesList;
}

/* Add list on HOME "src/index.html" page with 
working links to each category/type and associated image */
export async function displayTypes() {
  try {
    const types = await fetchPokemonTypes();
    const typesContainer = document.getElementById("pokemon-types");
    const typesList = await typesListNLink(types);

    // Add a click event listener to each types link
    typesList.querySelectorAll("a").forEach((typeLink) => {
      typeLink.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedType = typeLink.textContent;

        // Go to pokemonByType/index.html and display all associated pokemon of that type
        window.location.href = `/pokemonByType/index.html?category=${selectedType}`;
        //console.log(`Selected type: ${selectedType}`);
      });
    });

    typesContainer.appendChild(typesList);

    //console.log(typesContainer);

  } catch (error) {
    console.error("Error displaying Pokémon types:", error);
  }
}

// Function to fetch all Pokémon of a specific type
//added pagination parameters to be passed in as well
export async function allPokemonByType(type) {
  try {
    // Use the where method to filter cards by type
    const result = await pokemon.card.where({
      q: `types:${type}`
    });

    // Return only the relevant data for the current page
    return result.data;
  } catch (error) {
    console.error(`Error fetching Pokémon of type ${type}:`, error);
    throw error;
  }
}




// async function fetchPokemonByType(type, page = 1, perPage = 10) {
//   try {
//     // Use the where method to filter cards by type
//     const result = await pokemon.card.where({
//       q: `types:${type}`,
//       page,
//       pageSize: perPage,
//     });

//     // Return only the relevant data for the current page
//     const pokemonByType = result.data;

//     // Display the fetched Pokémon
//     await displayPokemonByType(type, page, perPage);

//     return pokemonByType;
//   } catch (error) {
//     console.error(`Error fetching Pokémon of type ${type}:`, error);
//     throw error;
//   }
// }
