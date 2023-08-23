const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const formatData = require("../utils/formatData");
const { Pokemon } = require("../db"); // Importa tu modelo Pokemon

async function getPokByName(req, res) {
  let name = req.query.name;
  name = name.toLowerCase();
  try {
    let pokemonData;
    // Intenta obtener los datos del Pokémon desde la PokeAPI.
    try {
      const response = await axios.get(URL + name.toLowerCase());
      pokemonData = response.data;
      const formattedData = formatData(pokemonData);
      return res.status(200).json(formattedData);
    } catch (apiError) {
      // Si no se encuentra en la PokeAPI, intenta buscar en la base de datos.
      try {
        // Busca el pokémon en la base de datos utilizando el modelo Pokemon.
        const dbResult = await Pokemon.findOne({
          where: { name: name },
        });
        if (!dbResult) {
          return res.status(404).json({ message: "Pokémon not found." });
        }
        
        // Asigna los datos del pokémon encontrado.
        pokemonData = dbResult.dataValues;
      } catch (dbError) {
        return res.status(500).json({ message: dbError.message });
      }
    }

    return res.status(200).json(pokemonData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getPokByName;
