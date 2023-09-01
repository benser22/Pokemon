const { User } = require("../db");
const bcrypt = require("bcrypt");

const login = async (req, res) => {

  const { email, password } = req.params;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).send("Email not registered");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).send("Password incorrect");
    }

    // Crear una sesión para el usuario autenticado
    req.session.userId = user.id;
    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    req.session.email = user.email;
    if (email === "benser22@hotmail.com" || email === "camiloserranosastre22@gmail.com") {
      req.session.rol = "admin"
    } else {
      req.session.rol = "user"
    }
    return res.status(200).json({ user, access: true });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = login;
