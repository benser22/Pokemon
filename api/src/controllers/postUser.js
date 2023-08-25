const { User } = require("../db");

const postUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("Missing data");
  }
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        password
      },
    });

    if (!created) {
      return res.status(200).send(`${user.email} already exists`);
    }

    return res.status(201).send(`${user.email} created successfully`);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error });
  }
};

module.exports = postUser;
