// controllers/favoritesController.js
const { Favorite } = require("../db");
const getFavoritesByUser = async (req, res) => {
  if (req.params.userId === "undefined") return;
  const userId = req.params.userId;
  
  try {
    const favorites = await Favorite.findAll({
      where: { userId }, // Buscar favoritos con el userId proporcionado
    });
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get favorites" });
  }
};

module.exports = getFavoritesByUser;
