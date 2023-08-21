const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0";

async function searchDuplicated(req, res) {
  const { name } = req.query;
  try {
    const response = await axios.get(URL);

    const { results } = response.data;

    // Buscar si hay un objeto en results con el mismo nombre
    const isDuplicated = results.some(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );

    res.status(200).json({ duplicated: isDuplicated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = searchDuplicated;
