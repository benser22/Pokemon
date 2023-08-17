const axios = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon?limit=12";

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get(URL);
    const pokemons = response.data.results;
    const nextUrl = response.data.next;
    const prevUrl = response.data.previous;

    const responseData = {
      next: nextUrl,
      previous: prevUrl,
      results: pokemons
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Couldn't get pokemon list" });
  }
};

module.exports = getAllPokemons;
