document.addEventListener("DOMContentLoaded", () => {
  const pokemonListElement = document.getElementById("pokemonList");

  // Fetch Pokemon data from JSON file
  fetch("pokemonData.json")
    .then((response) => response.json())
    .then((data) => {
      // Render Pokemon cards
      data.forEach((pokemon) => {
        const card = createPokemonCard(pokemon);
        pokemonListElement.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching Pokemon data:", error));

  // Function to create a Pokemon card
  function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("card");

    const nameElement = document.createElement("h2");
    nameElement.textContent = pokemon.name;

    const typeElement = document.createElement("p");
    typeElement.textContent = `Type: ${pokemon.type}`;

    const imageElement = document.createElement("img");
    imageElement.src = pokemon.image;
    imageElement.alt = pokemon.name;

    card.appendChild(nameElement);
    card.appendChild(typeElement);
    card.appendChild(imageElement);

    return card;
  }
});
