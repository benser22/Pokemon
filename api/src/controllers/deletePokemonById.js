const { Pokemon } = require("../db");

const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;    
    // Buscar el Pokémon en la base de datos
    const pokemonToDelete = await Pokemon.findByPk(id);
    if (!pokemonToDelete) {
      return res.json({ message: "Pokemon not found" });
    }

    // Eliminar el Pokémon de la base de datos
    await pokemonToDelete.destroy();

    res.status(200).json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Pokemon" });
  }
};

module.exports = deletePokemon;
