import pokemon from "pokemontcgsdk";

const baseURL = import.meta.env.POKE_URL;
const apiKEY = import.meta.env.API_KEY;

pokemon.configure({ apiKey: apiKEY });

// Function to fetch and display card data
function fetchAndDisplayCards() {
  // Example: Fetch a single card by ID
  pokemon.card
    .find("base1-4")
    .then((card) => {
      console.log(card.name); // Log the card name
      // Now, you can display the card information on your webpage
      // Example: Display in a card format
      const cardElement = document.createElement("div");
      cardElement.innerHTML = `
        <div>
          <h2>${card.name}</h2>
          <p>Set: ${card.set.name}</p>
          <!-- Add more details as needed -->
        </div>
      `;
      document.body.appendChild(cardElement);
    })
    .catch((error) => {
      console.error("Error fetching card:", error);
    });
}

// Call the function to fetch and display cards
//fetchAndDisplayCards();

// Function to fetch and display 1 card data per type of pokemon
async function getRandomPokemonByType() {
  const types = await pokemon.type.all();
  const randomPokemonByType = {};

  for (const type of types) {
    const cardsOfType = await pokemon.card.where({
      q: `types:${type.name}`,
      pageSize: 1,
      orderBy: "random",
    });

    if (cardsOfType.data.length > 0) {
      randomPokemonByType[type.name] = cardsOfType.data[0];
    }
  }

  return randomPokemonByType;
}

async function displayRandomPokemonOnHomePage() {
  const homepageContainer = document.getElementById("homepage-container");
  const randomPokemon = await getRandomPokemonByType();

  for (const [type, pokemonData] of Object.entries(randomPokemon)) {
    const cardElement = document.createElement("div");
    cardElement.innerHTML = `
      <div>
        <h2>${type}</h2>
        <img src="${pokemonData.images.small}" alt="${pokemonData.name}">
        <p>${pokemonData.name}</p>
        <a href="/type/${type}">View All ${type} Pokémon</a>
      </div>
    `;
    homepageContainer.appendChild(cardElement);
  }
}

window.onload = () => {
  displayRandomPokemonOnHomePage();
};
