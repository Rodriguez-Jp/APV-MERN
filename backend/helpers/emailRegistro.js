import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  //Enviamos el email
  const { email, nombre, token } = datos;

  const info = await transport.sendMail({
    from: "Administrador de pacientes veterinarios APV",
    to: email,
    subject: "Bienvenido! Por favor confirma tu cuenta",
    text: "Confirma tu cuenta en APV",
    html: `<p>Hola ${nombre} tu cuenta esta lista, por favor confirmala accediendo al siguiente enlace</p>
        <p><a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta <a/></p>
        <p>Si crees que recibiste este mensaje por error, por favor ignoralo</p>
    `,
  });

  console.log("mensaje enviado  " + info.messageId);
};

export default emailRegistro;
