function formatData(pokemonData) {
  const { id: ID, name, sprites, height, weight, stats, types } = pokemonData;
  const img = sprites.other.dream_world.front_default;
  // const img = sprites.other.home.front_default;
  const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
  const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
  const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
  const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
  const typeNames = types.map((typeData) => typeData.type.name);
  const imgShiny = sprites.other.home.front_shiny;

  return {
    ID,
    name,
    img,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types: typeNames,
    imgShiny
  };
}

module.exports = formatData;
