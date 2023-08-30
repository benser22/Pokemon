const { Pokemon, Type } = require("../db");

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
    // Creo el pokemon en la base de datos con los datos del body
    // Obtengo el último id de la tabla Pokemon
    let lastPokemon = await Pokemon.findOne({
      order: [["id", "DESC"]],
    });

    // Calculo el nuevo id sumándole 1 al último id, y si es el primer registro lo inicializo en 5000 para no tener problemas con los id que vienen de la Api
    let newId = lastPokemon ? lastPokemon.id + 1 : 5000;

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

    // una vez que tengo los registros enteros, hago la relación en la tabla intermedia. Utilicé un for para recorrer el arreglo de type porque si hacía el addType del arreglo completo, perdía el orden en el que fueron agregagos desde el front
    types.forEach(async (type) => {
      const selectedType = selectedTypes.find((myType) => myType.name === type);
      if (selectedType) {
        await newPokemon.addType(selectedType); // hago la relacion en la tabla intermedia de mi nuevo pokemón con cada uno de los tipos correspondientes
      }
    });

    const dataValues = {
      id: newId,
      name,
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
