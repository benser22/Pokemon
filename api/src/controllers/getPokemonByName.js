const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const formatData = require("../utils/formatData")

async function getPokByName(req, res) {
  const { name } = req.query;
  try {
    const response = await axios.get(URL + name.toLowerCase());
    const pokemonData = response.data;
    const formattedData = formatData(pokemonData);
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getPokByName;
