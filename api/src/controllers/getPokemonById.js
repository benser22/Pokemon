const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const formatData = require("../utils/formatData");
const { Pokemon } = require("../db"); // Importa tu modelo Pokemon

async function getPokById(req, res) {
  const { id } = req.params;
  try {
    let pokemonData;

    // Intenta obtener los datos del Pokémon desde la PokeAPI.
    try {
      const response = await axios.get(URL + id);
      const apiPokemonData = response.data;

      // Formatea los datos del Pokémon desde la API utilizando la función formatData.
      pokemonData = formatData(apiPokemonData);
    } catch (apiError) {
      // Si no se encuentra en la PokeAPI, intenta buscar en la base de datos.
      try {
        // Busca el pokémon en la base de datos utilizando el modelo Pokemon.
        const dbResult = await Pokemon.findByPk(id);

        if (!dbResult) {
          return res.status(404).json({ message: "Pokémon not found." });
        }

        // Asigna los datos del pokémon encontrado en la base de datos tal como están.
        pokemonData = dbResult.dataValues;
      } catch (dbError) {
        return res.status(500).json({ message: dbError.message });
      }
    }

    // Responde con los datos del Pokémon ya formateados.
    return res.status(200).json(pokemonData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getPokById;
