const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Favorite = sequelize.define(
    "favorite",
    {
      idTable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: false,
      },
      img: {
        type: DataTypes.STRING,
      },
      hp: {
        type: DataTypes.INTEGER,
      },
      attack: {
        type: DataTypes.INTEGER,
      },
      defense: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.NUMERIC(8, 2),
      },
      weight: {
        type: DataTypes.NUMERIC(8, 2),
      },
      isShiny: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      imgShiny: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isFavorite:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      types: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      timestamps: false,
    }
  );
  return Favorite;
};
