const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const formatData = require("../utils/formatData");
const { Pokemon, Type } = require("../db"); // Importa tu modelo Pokemon

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
        // Busca el pokémon en la base de datos utilizando el modelo Pokemon. Include es un objeto que se pasa como segundo argumento a la función findByPk. El objeto include indica a Sequelize que debe incluir la relación con el modelo "Type" en el resultado de la consulta.
        const dbResult = await Pokemon.findByPk(id, {
          include: Type,
        });
     
        if (!dbResult) {
          return res.status(404).json({ message: "Pokémon not found." });
        }
        
        // Obtén los nombres de los tipos desde el resultado
        const mytypes = dbResult.types.map((type) => type.dataValues.name)

        // Asigna los datos del pokémon encontrado junto con los nombres de los tipos
        const pokemonData = {
          ...dbResult.dataValues,
          types: mytypes,
        };
        
        return res.status(200).json(pokemonData);
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
