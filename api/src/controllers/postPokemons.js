const { Pokemon, Type } = require("../db");

const postPokemons = async (req, res) => {
  try {
    const { name, img, hp, attack, defense, speed, height, weight, types } =
      req.body;

      // me aseguro de que el type sea minuscula, aunque esto podria eliminarlo si lo fuerzo en el front luego...
    const lowerCaseTypes = types.map(type => type.toLowerCase());
    
    // Crear el Pokémon en la base de datos
    const newPokemon = await Pokemon.create({
      name,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      lowerCaseTypes
    });


    // Relacionar el Pokémon con sus tipos
    const selectedTypes = await Type.findAll({
      where: {
        name: lowerCaseTypes,
      },
    });

    // Agregar la relación a la tabla intermedia "pokemon_type"
    await newPokemon.addTypes(selectedTypes);

    res.status(201).json(newPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el Pokémon." });
  }
};

module.exports = postPokemons;
