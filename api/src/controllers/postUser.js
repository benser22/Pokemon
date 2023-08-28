const { User } = require("../db");
const bcrypt = require("bcrypt");

const postUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("Missing data");
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(409).send(`${existingUser.email} already exists`);
    }
    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Crear una sesión para el usuario recién registrado
    req.session.userId = newUser.id;
    req.session.firstName = newUser.firstName;
    req.session.lastName = newUser.lastName;

    return res.status(201).send(`${newUser.email} created successfully`);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
};

module.exports = postUser;
