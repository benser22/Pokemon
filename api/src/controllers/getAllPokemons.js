const axios = require("axios");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 100;

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${LIMIT}`);
    const pokemons = response.data.results;

    // Fetch additional details for each pokemon to get their types and image URLs
    const pokemonsWithDetails = await Promise.all(
      pokemons.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        const types = detailsResponse.data.types.map((type) => type.type.name);
        const imageUrl = detailsResponse.data.sprites.other['official-artwork'].front_default; // Obtener la ruta de la imagen
        const id = pokemon.url.match(/\/(\d+)\/$/)[1];

        return {
          id: Number(id),
          ...pokemon,
          types: types,
          img: imageUrl,
        };
      })
    );

    const responseData = {
      results: pokemonsWithDetails,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Couldn't get pokemon list" });
  }
};

module.exports = getAllPokemons;
