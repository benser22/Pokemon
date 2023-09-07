const axios = require("axios");
const { Pokemon, Type } = require("../db");
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 100;

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${LIMIT}`);
    const pokemonsFromAPI = response.data.results;
    const dbPokemons = await Pokemon.findAll({ include: Type });
    // Al usar { include: Type } en findAll(), Sequelize realizará una consulta que traerá todos los registros de Pokémon junto con los tipos asociados a cada uno

    // destructuring de los pokemones que traigo de la API
    const pokemonsWithDetails = await Promise.all(
      pokemonsFromAPI.map(async (pokemonFromAPI) => {
        const detailsResponse = await axios.get(pokemonFromAPI.url);
        const id = detailsResponse.data.id;
        const name = detailsResponse.data.name;
        const imageUrl = detailsResponse.data.sprites.other.home.front_default;
        const imgShiny = detailsResponse.data.sprites.other.home.front_shiny;
        const height = detailsResponse.data.height;
        const weight = detailsResponse.data.weight;
        const extractedStats = detailsResponse.data.stats.map((stat) => ({
          [stat.stat.name]: stat.base_stat,
        }));
        const {hp} = extractedStats[0];
        const  {attack} = extractedStats[1];
        const {defense} = extractedStats[2];
        const {speed} =  extractedStats[5];

        const types = detailsResponse.data.types.map(
          (typeData) => typeData.type.name
        );

        return {
          id: id,
          name: name,
          types: types,
          img: imageUrl,
          imgShiny,
          isFavorite: false,
          created: false,
          height: height/10,
          weight: weight/10,
          hp, 
          attack,
          defense,
          speed
        };
      })
    );
    
    // destructuring de los pokemones que tengo en la bdd
    const simplifiedPokemons = dbPokemons.map((pokemon) => {
      const {
        id,
        name,
        img,
        imgShiny,
        types,
        created,
        isFavorite,
        hp,
        height,
        weight,
        speed,
        attack,
        defense,
      } = pokemon.dataValues;

      return {
        id,
        name,
        types: types.map((type) => type.name),
        img,
        imgShiny,
        created,
        isFavorite,
        hp,
        height: parseFloat(height),
        weight: parseFloat(weight),
        speed,
        attack,
        defense,
      };
    });

    // combino todos los pokemones en un solo array
    const combinated = [...pokemonsWithDetails, ...simplifiedPokemons];
    const responseData = {
      results: combinated,
    };
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Couldn't get pokemon list" });
  }
};

module.exports = getAllPokemons;
