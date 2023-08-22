const axios = require("axios");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 100;

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${LIMIT}`);
    const pokemons = response.data.results;
    const pokemonsWithDetails = await Promise.all(
      pokemons.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        const types = detailsResponse.data.types.map((pok) => pok.type.name);
        const imageUrl = detailsResponse.data.sprites.other['official-artwork'].front_default; // Obtener la ruta de la imagen
        // const imageUrl = detailsResponse.data.sprites.other.home.front_default; // Obtener la ruta de la imagen
        const id = detailsResponse.data.id;
        const name = detailsResponse.data.name
        const imgShiny = detailsResponse.data.sprites.other.home.front_shiny;

        return {
          id: id,
          name: name,
          types: types,
          img: imageUrl,
          imgShiny
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
