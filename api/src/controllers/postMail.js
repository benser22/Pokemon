const nodemailer = require('nodemailer');
const { PASS_MAIL, DIR_MAIL } = process.env;

const postMail = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: DIR_MAIL, 
      pass: PASS_MAIL, 
    },
  });

  const mailOptions = {
    from: email, 
    to: DIR_MAIL, 
    subject: 'Nuevo mensaje de contacto desde tu App Pokemón',
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
  };  

  try {
    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'The mail sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending mail' });
  }
};

module.exports = postMail;
