const { Pokemon, Type, Favorite } = require("../db");

const postPokemons = async (req, res) => {
  try {
    let {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      created,
      img,
    } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    let lowerCaseName = name.toLowerCase();

    //? verifico que no haya un poke en la bdd con el mismo nombre*/
    let existingPokemon = await Pokemon.findOne({
      where: { name: lowerCaseName },
    });

    if (existingPokemon) {
      return res
        .status(409)
        .json({ message: "A Pokémon with this name already exists." });
    }

    if (img === "default") img = "https://i.ibb.co/m0smdZW/default.png";
    
    let lastPokemon = await Pokemon.findOne({
      order: [["id", "DESC"]],
    });

    // Obtengo el último ID de la tabla Favorites
    let lastFavorite = await Favorite.findOne({
      order: [["id", "DESC"]],
    });

    // Calculo el nuevo ID sumándole 1 al mayor ID entre ambas tablas, inicializado en 5000
    let newId = Math.max(lastPokemon ? lastPokemon.id : 4999, lastFavorite ? lastFavorite.id : 4999) + 1;

    let newPokemon = await Pokemon.create({
      id: newId,
      name: lowerCaseName,
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

    // me quedo con los registros enteros de los tipos que coincidan con los types que me llegaron por body
    let selectedTypes = await Type.findAll({
      where: {
        name: types,
      },
    });


    for (const type of types) {
      const selectedType = selectedTypes.find((myType) => myType.name === type);
      if (selectedType) {
        await newPokemon.addType(selectedType); // Hace la relación en la tabla intermedia de mi nuevo Pokémon con cada uno de los tipos correspondientes
      }
    }

    const dataValues = {
      id: newId,
      name: lowerCaseName,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      created,
      types,
    };

    res.status(201).json(dataValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the pokemon" });
  }
};

module.exports = postPokemons;
