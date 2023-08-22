const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const formatData = require("../utils/formatData")

async function getPokById(req, res) {
  const { id } = req.params;
  try {
    const response = await axios.get(URL + id);
    const pokemonData = response.data;
    const formattedData = formatData(pokemonData);
    console.log(formattedData);
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getPokById;