// controllers/usersController.js
const { User } = require('../db');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

module.exports = getAllUsers;
