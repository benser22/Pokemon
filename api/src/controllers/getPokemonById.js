const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const formatData = require("../utils/formatData");
const { Pokemon, Type, pokemon_type, Favorite } = require("../db");

async function getPokById(req, res) {
  const { id } = req.params;
  if (!id) return;

  try {
    let pokemonData;

    // Intento obtener los datos del Pokémon desde la PokeAPI.
    try {
      const response = await axios.get(URL + id);
      const apiPokemonData = response.data;

      // Formateo los datos del Pokémon desde la API utilizando la función formatData.
      pokemonData = formatData(apiPokemonData);
    } catch (apiError) {
      // Si no se encuentra en la PokeAPI, intento buscar en la base de datos.
      try {
        const dbResult = await Pokemon.findByPk(id);

        if (!dbResult) {
          try {
            // utilizo findOne y no findByPK, porque en la lógica de mi modelo de Favorite, id no es primarykey...
            const favoriteResult = await Favorite.findOne({
              where: { id: id },
            });
            // Si se encuentra en la tabla "Favorite"...
            return res.status(200).json(favoriteResult);
          } catch (error) {
            // Si ocurre un error en la búsqueda en la tabla "Favorite"...
            return res.status(404).json({ message: "Pokémon not found." });
          }
        }

        // Busco los registros de la tabla intermedia pokemon_type relacionados con el Pokémon.
        const pokemonTypeRecords = await pokemon_type.findAll({
          where: { pokemonId: id },
        });

        //* Hasta aquí, en pokemonTypeRecords tengo los types del pokemon de mi bdd en forma ordenada
        // Obtengo los typeId de los registros encontrados.
        const typeIds = pokemonTypeRecords.map((record) => record.typeId);

        //* Utilice este enfoque porque el finAll, cuando lo mapeaba con los types que tenia, me cambiaba el orden, me llevaba el orden de los types de acuerdo a cómo lo encontraba en la tabla, es decir por id ascendente, y yo necesitaba para mi lógica conservar el orden con el que fueron creados los types
        // Busco todos los tipos en la tabla Types.
        const allTypes = await Type.findAll();

        // Creo un array de tipos con id y nombre.
        const typesArray = allTypes.map((type) => ({
          id: type.id,
          name: type.name,
        }));

        // Mapea los typeIds para obtener los nombres de los tipos en el orden deseado.
        const typeNames = typeIds.map((typeId) => {
          const type = typesArray.find((t) => t.id === typeId);
          return type ? type.name : null;
        });

        // Construyo el objeto con los datos del Pokémon incluyendo los nombres de los tipos.
        const pokemonData = {
          ...dbResult.dataValues,
          types: typeNames,
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
