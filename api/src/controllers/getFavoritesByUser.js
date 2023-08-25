// controllers/favoritesController.js
const { User, Favorite } = require("../db");

// Obtener todos los favoritos de un usuario
const getFavoritesByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId, {
      include: Favorite, // Cargar también los favoritos del usuario
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favorites = user.Favorites; // Acceder a los favoritos del usuario
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get favorites" });
  }
};

module.exports = getFavoritesByUser;
