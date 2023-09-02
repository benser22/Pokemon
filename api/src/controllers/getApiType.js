const axios = require("axios");
const { Type } = require("../db");
const typeImageUrls = require("../utils/typeImageUrls");

const getApiType = async (req, res) => {
  try {
    // Consultar si ya tienes los tipos en la base de datos

    const existingTypes = await Type.findAll();
    if (existingTypes.length > 2) { // pongo más de 2 porque el test me dejaba la tabla con 1 sola
      // Si ya tienes los tipos en la base de datos, devuélvelos
      return res.status(200).json(existingTypes);
      // Sale del controlador para evitar continuar con la llamada a la API
    }

    // Si no tienes los tipos en la base de datos, consulta la API
    const typeApi = await axios.get("https://pokeapi.co/api/v2/type/");
    const types = typeApi.data.results;

    for (const typeData of types) {
      const typeName = typeData.name;
      const typeUrl = typeImageUrls[typeName];

      await Type.findOrCreate({
        where: { name: typeName },
        defaults: { name: typeName, image_type: typeUrl },
      });
    }

    const updatedTypes = await Type.findAll();

    res.status(200).json(updatedTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getApiType;
