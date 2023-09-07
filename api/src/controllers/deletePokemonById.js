const { Pokemon, pokemon_type } = require("../db");

const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el Pokémon en la base de datos
    const pokemonToDelete = await Pokemon.findByPk(id);
    if (!pokemonToDelete) {
      return res.json({ message: "Pokemon not found" });
    }

    // Buscar todos los registros en la tabla intermedia con el pokemonId
    const pokemonTypeRecords = await pokemon_type.findAll({
      where: { pokemonId: id },
    });

    // Eliminar todos los registros encontrados en la tabla intermedia
    await Promise.all(
      pokemonTypeRecords.map(async (record) => {
        await record.destroy();
      })
    );

    // Eliminar el Pokémon de la base de datos
    await pokemonToDelete.destroy();

    res.status(200).json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Pokemon" });
  }
};

module.exports = deletePokemon;
