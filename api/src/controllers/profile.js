// Supongamos que esta ruta muestra información personalizada del usuario autenticado
async function profile(req, res) {
  if (req.session.userId) {
    // Accede a las propiedades almacenadas en la sesión
    const firstName = req.session.firstName;
    const lastName = req.session.lastName;
    const rol = req.session.rol;
    // Devuelve la información personalizada del usuario
    return res.status(200).json({ rol, firstName, lastName, access: true });
  } else {
    // Si el usuario no está autenticado, devuelve un mensaje de error
    return res.status(401).json({ message: "Usuario no autenticado" });
  }
}

module.exports = profile;
