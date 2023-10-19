// En el servidor Node.js
const nodemailer = require('nodemailer');

// Configura el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Gmail', // o el servicio de correo que prefieras
  auth: {
    user: 'isaialef20@gmail.com', // tu dirección de correo electrónico
    pass: 'isai1541', // tu contraseña
  },
});

// Función para enviar un correo electrónico de bienvenida
const sendWelcomeEmail = async (to, username) => {
  const html = `
    <p>Bienvenido, ${username}.</p>
    <p>Has iniciado sesión exitosamente en la aplicación.</p>
    <p>Haz clic en el siguiente enlace para ir a la página de inicio de administrador:</p>
    <a href="https://pagina-feer.vercel.app/inicioAdmin">Ir a Inicio de Administrador</a>
  `;

  const mailOptions = {
    from: 'isaialef20@gmail.com',
    to, // El destinatario del correo electrónico
    subject: 'Bienvenido a la Aplicación',
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

module.exports = sendWelcomeEmail;


