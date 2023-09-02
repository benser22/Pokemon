const logout = async (req, res) => {
  // Destruir la sesión para cerrar la sesión del usuario
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out", error: err });
    }
    return res.status(200).json({ message: "Logged out successfully" });
  });
};

module.exports = logout;
