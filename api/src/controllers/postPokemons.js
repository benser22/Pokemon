const { Pokemon, Type } = require("../db");

const postPokemons = async (req, res) => {

  try {
    
    const { name, hp, attack, defense, speed, height, weight, types, created, img } =
    req.body;
    const lowerCaseName = name.toLowerCase();
    if (img === "default") img = "https://i.ibb.co/m0smdZW/default.png";
      // Creo el pokemon en la base de datos con los datos del body
    const newPokemon = await Pokemon.create({
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
    const selectedTypes = await Type.findAll({
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
      types,
    };
    res.status(201).json(dataValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the pokemon" });
  }
};

module.exports = postPokemons;
