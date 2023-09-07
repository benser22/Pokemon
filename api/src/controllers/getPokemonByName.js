const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const formatData = require("../utils/formatData");
const { Pokemon, Type } = require("../db"); 

async function getPokByName(req, res) {
  let name = req.query.name.toLowerCase();
  if (!name) return;

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
          include: Type,  // Asegúrate de que esta relación esté configurada en tu modelo Pokemon
        });
        if (!dbResult) {
          return res.status(404).json({ message: "Pokémon not found." });
        }
        
        // Obtengo los nombres de los tipos desde el resultado
        const mytypes = dbResult.types.map((type) => type.dataValues.name)

        // Asigno los datos del pokémon encontrado junto con los nombres de los tipos
        const pokemonData = {
          ...dbResult.dataValues,
          types: mytypes,
        };
        
        return res.status(200).json(pokemonData);

      } catch (dbError) {
        return res.status(500).json({ message: dbError.message });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getPokByName;
