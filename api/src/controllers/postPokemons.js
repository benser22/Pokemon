const { Pokemon, Type } = require("../db");

const postPokemons = async (req, res) => {

  try {
    let { img } = req.body;
    if (img === "default") img = "https://i.ibb.co/m0smdZW/default.png";

    const { name, hp, attack, defense, speed, height, weight, types, created } =
      req.body;

    // Creo el pokemon en la base de datos
    const newPokemon = await Pokemon.create({
      name,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      created,
    });

    // Relaciono el Pokémon con sus tipos
    const selectedTypes = await Type.findAll({
      where: {
        name: types,
      },
    });

    // Agrego la relación a la tabla intermedia "pokemon_type"
    await newPokemon.addTypes(selectedTypes);

    const dataValues = {
      id: newPokemon.id,
      name,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      created,
      types
    }

    res.status(201).json(dataValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the pokemon" });
  }
};

module.exports = postPokemons;
