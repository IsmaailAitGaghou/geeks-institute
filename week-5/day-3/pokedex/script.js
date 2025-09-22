const infoContainer = document.querySelector('.info-container');
const circleButton = document.querySelector('#circle-button');
const pokedex = document.querySelector("#pokedex");
const pokeName = document.querySelector("#pokemon-name");
const pokeId = document.querySelector("#pokemon-id");
const pokeHeight = document.querySelector("#pokemon-height");
const pokeWeight = document.querySelector("#pokemon-weight");
const pokeType = document.querySelector("#pokemon-type");
const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");

let currentPokeId = 1;

const fetchPokemon = async (pokeId) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
}

const displayPokemon = async (pokeId) => {
    const pokemon = await fetchPokemon(pokeId);
    if (!pokemon) return;

    infoContainer.innerHTML = `
    <h1>${pokemon.name}</h1>
    <p>ID: ${pokemon.id}</p>
    <p>Height: ${pokemon.height } cm</p>
    <p>Weight: ${pokemon.weight } gr</p>
    <p>Type: ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
    `;
    const pokedexImage = document.createElement("img");
    pokedexImage.src = pokemon.sprites.front_default;
    pokedexImage.id = "pokedex";
    pokedexImage.alt = pokemon.name;
    infoContainer.insertBefore(pokedexImage, infoContainer.firstChild);
}


circleButton.addEventListener('click', () => {
    const randomId = Math.floor(Math.random() * 898) + 1; 
    infoContainer.innerHTML = `<p class="loading"><i class="fa-solid fa-spinner fa-spin-pulse"></i><span> Loading...</span></p>`;
    displayPokemon(randomId);
});


nextButton.addEventListener('click', () => {
    currentPokeId = currentPokeId > 1 ? currentPokeId + 1 : 1;
    displayPokemon(currentPokeId);
});

prevButton.addEventListener('click', () => {
    currentPokeId = currentPokeId > 1 ? currentPokeId - 1 : 898;
    displayPokemon(currentPokeId);
});