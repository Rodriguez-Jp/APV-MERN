import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
    subject: "Reestablecimiento de password APV",
    text: "Reestablece tu password",
    html: `<p>Hola ${nombre}. Has solicitado un cambio de password, hazlo ingresando al siguiente enlace</p>
        <p><a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password <a/></p>
        <p>Si crees que recibiste este mensaje por error, por favor ignoralo</p>
    `,
  });

  console.log("mensaje enviado  " + info.messageId);
};

export default emailOlvidePassword;
