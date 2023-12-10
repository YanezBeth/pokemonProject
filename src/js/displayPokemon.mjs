import {
  getParam
} from "./utils.mjs";
import {
  allPokemonByType
} from "./pokemonTypes.mjs";

const baseURL =
  import.meta.env.VITE_POKE_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.ok) {
    return jsonResponse;
  } else {
    console.log(jsonResponse);
    throw {
      name: "servicesError",
      message: jsonResponse
    };
  }
}

export async function loginRequest(user) {
  console.log(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  console.log(response);
  return response.accessToken;
}

document.addEventListener("DOMContentLoaded", async () => {
  const category = getParam("category");
  if (category) {
    await displayPokemonByType(category);
  }
});

/* Display all the pokemon of a specific type on src\pokemonByType\index.html */
async function displayPokemonByType(type, page = 1, perPage = 10) {
  // Fetch Pokémon of the selected type
  const pokemonByType = await allPokemonByType(type);

  // Calculate total number of pages
  const totalPages = Math.ceil(pokemonByType.length / perPage);

  // Generate HTML for Pokémon list
  let pokemonListHtml = `<h2>Pokémon of type: ${type}</h2>`;
  pokemonByType.forEach((pokemon) => {
    pokemonListHtml += `<div class="pokemon-card">
      <img src="${pokemon.images.large}" alt="${pokemon.name}">
      <h3>${pokemon.name}</h3>
      <p>Type: ${pokemon.types.join(", ")}</p>
    </div>`;
  });

  // Generate pagination buttons if there are multiple pages
  if (totalPages > 1) {
    pokemonListHtml += `<div id="pagination" class="pagination-container">`;
    for (let i = 1; i <= totalPages; i++) {
        pokemonListHtml += `<a href="#" onclick="handlePagination('${type}', ${i})" ${i === page ? 'class="active"' : ''}>${i}</a>`;
    }
    pokemonListHtml += `</div>`;
}
  // Display the generated HTML
  document.getElementById("pokemon-by-type").innerHTML = pokemonListHtml;
}

function handlePagination(type, newPage) {
  const perPage = 10; // Adjust as needed
  const currentPage = newPage; // Update currentPage based on your logic

  // Construct the URL with the new page
  const url = baseURL`/cards?page=${currentPage}&pageSize=${perPage}&q=type:'${type}'`;

  // Perform any logic you need with the URL (e.g., fetching data from the API)
  // For now, let's log the URL
  console.log(url);

  // You can also update the URL in the address bar if needed
  // window.location.href = url;

  // Call your display function with the new page
  displayPokemonByType(type, currentPage, perPage);
}


/* Display all the pokemon of a specific type on src\pokemonByType\index.html */
// async function displayPokemonByType(type, page = 1, perPage = 10) {
//   try {
//     // Fetch Pokémon of the selected type with pagination
//     const pokemonByType = await allPokemonByType(type, page, perPage);

//     // Generate HTML for Pokémon list
//     let pokemonListHtml = `<h2>Pokémon of type: ${type}</h2>`;
//     pokemonByType.forEach((pokemon) => {
//       pokemonListHtml += `<div class="pokemon-card">
//         <img src="${pokemon.images.large}" alt="${pokemon.name}">
//         <h3>${pokemon.name}</h3>
//         <p>Type: ${pokemon.types.join(", ")}</p>
//       </div>`;
//     });

//     // Display the generated HTML
//     document.getElementById("pokemon-by-type").innerHTML = pokemonListHtml;

//     // Generate and append pagination buttons
//     const totalPages = Math.ceil(pokemonByType.length / perPage);
//     const paginationButtons = generatePaginationButtons(type, totalPages, page);
//     document.getElementById("pagination").innerHTML = paginationButtons;
//   } catch (error) {
//     console.error(`Error displaying Pokémon of type ${type} (Page ${page}):`, error);
//   }
// }

// function generatePaginationButtons(type, totalPages, currentPage) {
//   let paginationHtml = `<div id="pagination" class="pagination-container">`;
//   for (let i = 1; i <= totalPages; i++) {
//     paginationHtml += `<a href="#" onclick="handlePagination('${type}', ${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</a>`;
//   }
//   paginationHtml += `</div>`;
//   return paginationHtml;
// }

// // Function to handle pagination clicks
// function handlePagination(type, newPage) {
//   const perPage = 10; // Adjust as needed
//   displayPokemonByType(type, newPage, perPage);
// }

// Function to display all Pokémon of a specific type with pagination
// async function displayPokemonByType(type, page = 1, perPage = 10) {
//   try {
//     // Fetch Pokémon of the selected type with pagination
//     const pokemonByType = await allPokemonByType(type, page, perPage);

//     // Generate HTML for Pokémon list
//     let pokemonListHtml = `<h2>Pokémon of type: ${type}</h2>`;
//     pokemonByType.forEach((pokemon) => {
//       pokemonListHtml += `<div class="pokemon-card">
//         <img src="${pokemon.images.large}" alt="${pokemon.name}">
//         <h3>${pokemon.name}</h3>
//         <p>Type: ${pokemon.types.join(", ")}</p>
//       </div>`;
//     });

//     // Display the generated HTML
//     document.getElementById("pokemon-by-type").innerHTML = pokemonListHtml;

//     // Generate and append pagination buttons
//     const totalPages = Math.ceil(pokemonByType.length / perPage);
//     const paginationButtons = generatePaginationButtons(type, totalPages, page);
//     document.getElementById("pagination").innerHTML = paginationButtons;
//   } catch (error) {
//     console.error(`Error displaying Pokémon of type ${type} (Page ${page}):`, error);
//   }
// }

// function generatePaginationButtons(type, totalPages, currentPage) {
//   let paginationHtml = `<div id="pagination" class="pagination-container">`;
//   for (let i = 1; i <= totalPages; i++) {
//     paginationHtml += `<a href="#" onclick="handlePagination('${type}', ${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</a>`;
//   }
//   paginationHtml += `</div>`;
//   return paginationHtml;
// }

// // Function to handle pagination clicks
// function handlePagination(type, newPage) {
//   const perPage = 10; // Adjust as needed
//   displayPokemonByType(type, newPage, perPage);
// }
