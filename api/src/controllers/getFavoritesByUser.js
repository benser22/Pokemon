// controllers/favoritesController.js
const { Favorite } = require("../db");

const getFavoritesByUser = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) return;
  
  try {
    const favorites = await Favorite.findAll({
      where: { userId }, // Buscar favoritos con el userId proporcionado
    });

    if (favorites.length === 0) {
      return res.status(404).json({ message: "Favorites not found for this user" });
    }
    
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get favorites" });
  }
};

module.exports = getFavoritesByUser;

