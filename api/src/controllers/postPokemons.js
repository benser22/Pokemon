const { Pokemon, Type } = require("../db");

const postPokemons = async (req, res) => {

  try {
    let { img } = req.body;
    if (img === "default") img = "https://i.ibb.co/k4nd0M0/pika.png";

    const { name, hp, attack, defense, speed, height, weight, types, created } =
      req.body;

    const lowerCaseTypes = types.map((type) => type.toLowerCase());

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
      lowerCaseTypes,
      created,
    });

    // Relaciono el Pokémon con sus tipos
    const selectedTypes = await Type.findAll({
      where: {
        name: lowerCaseTypes,
      },
    });

    // Agrego la relación a la tabla intermedia "pokemon_type"
    await newPokemon.addTypes(selectedTypes);

    // Agrego el campo "types" al objeto newPokemon
    newPokemon.dataValues.types = selectedTypes.map((type) => type.name);
    res.status(201).json(newPokemon.dataValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the pokemon" });
  }
};

module.exports = postPokemons;
