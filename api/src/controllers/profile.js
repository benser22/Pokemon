const profile = async (req, res) => {
  if (req.session.userId) {
    // Accede a las propiedades almacenadas en la sesión
    const id = req.session.userId;
    const firstName = req.session.firstName;
    const lastName = req.session.lastName;
    const rol = req.session.rol;
    const email = req.session.email
    // Devuelve la información personalizada del usuario
    return res.status(200).json({ id, email, rol, firstName, lastName, access: true });
  } else {
    // Si el usuario no está autenticado, devuelve un mensaje de error
    return res.json({ message: "Unauthenticated user" });
  }
}

module.exports = profile;
