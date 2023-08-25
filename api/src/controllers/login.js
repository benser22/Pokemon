const { User } = require("../db");

const login = async (req, res) => {
  const { email, password } = req.params;
   try {
    const user = await User.findOne({
      where: { email },
    });
    
    if (!user) {
      return res.status(404).send("Email not registered");
    }
    
    if (user.password !== password) {
      return res.status(403).send("Password incorrect");
    }

    return res.status(200).json({ user, access: true });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = login;
