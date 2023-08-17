const axios = require("axios");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 100;

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${LIMIT}`);
    const pokemons = response.data.results;

    // Fetch additional details for each pokemon to get their types
    const pokemonsWithTypes = await Promise.all(
      pokemons.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        const types = detailsResponse.data.types.map((type) => type.type.name);
        return {
          ...pokemon,
          types: types,
        };
      })
    );

    const nextUrl = response.data.next;
    const prevUrl = response.data.previous;

    const responseData = {
      next: nextUrl,
      previous: prevUrl,
      results: pokemonsWithTypes,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Couldn't get pokemon list" });
  }
};

module.exports = getAllPokemons;
