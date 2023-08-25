// controllers/postFavoritesController.js
const { User, Favorite } = require("../db");

const postFavoritesByUser = async (req, res) => {
  const userId = req.params.userId;
  const {
    name,
    img,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    isShiny,
    imgShiny,
    isFavorite,
    types,
    created
  } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Missing favorite info" });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [favorite, favoriteCreated] = await Favorite.findOrCreate({
      where: { name },
      defaults: {
        name,
        userId: user.id,
        img: img,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
        isShiny: isShiny,
        imgShiny: imgShiny,
        isFavorite: isFavorite,
        created: created,
        types: types,
      },
    });

    if (!favoriteCreated) {
      // El favorito ya existe en la base de datos
      const existingFavorite = await user.hasFavorite(favorite);
      if (existingFavorite) {
        return res
          .status(409)
          .json({ message: "Favorite already added to user" });
      }

      // Asociar el favorito al usuario
      await user.addFavorite(favorite);
    }
    return res
      .status(201)
      .json({ message: "Favorite added successfully", favorite });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add favorite", error });
  }
};

module.exports = postFavoritesByUser;
