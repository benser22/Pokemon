// controllers/favoritesController.js
const { User, Favorite } = require("../db");

// Eliminar un favorito de un usuario por nombre de Pokémon
const deleteFavoriteByUser = async (req, res) => {
  const userId = req.params.userId;
  const pokemonName = req.params.pokemonName;
  if (!userId || !pokemonName) return;
  try {
    const user = await User.findByPk(userId, {
      include: Favorite, // Cargar los favoritos del usuario
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteToDelete = user.favorites.find(
      (favorite) => favorite.name === pokemonName
    );

    if (!favoriteToDelete) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    const pokemonDeleted = favoriteToDelete;
    await favoriteToDelete.destroy();
    return res.status(200).json(pokemonDeleted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to remove favorite" });
  }
};

module.exports = deleteFavoriteByUser;
