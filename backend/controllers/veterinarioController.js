import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";

const registrar = async (req, res) => {
  const { email, nombre } = req.body;

  //Valida si el usuario existe
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Registra un nuevo veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    //Enviamos email de confirmacion
    emailRegistro({
      nombre,
      email,
      token: veterinarioGuardado.token,
    });

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { veterinario } = req;
  res.json({ perfil: veterinario });
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmado = await Veterinario.findOne({ token });

  //Verifica si el token suministrado existe
  if (!usuarioConfirmado) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  //En caso de existir lo valida y confirma la cuenta
  try {
    usuarioConfirmado.confirmado = true;
    usuarioConfirmado.token = null;

    //Guarda los cambios en la base de datos
    await usuarioConfirmado.save();
    res.json({ msg: "Usuario confirmado!" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Verificamos si el usuario existe
  const usuario = await Veterinario.findOne({ email });

  //En caso de no existir da el mensaje
  if (!usuario) {
    const error = new Error("El email no existe");
    return res.status(403).json({ msg: error.message });
  }

  //Confirmamos si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error(
      "El email no se encuentra confirmado, por favor confirmelo"
    );
    return res.status(403).json({ msg: error.message });
  }

  //Verificamos la password
  if (!(await usuario.comprobarPassword(password))) {
    const error = new Error("Contrasena incorrecta");
    return res.status(403).json({ msg: error.message });
  }

  //Generamos el JWT
  res.json({ token: generarJWT(usuario.id) });
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  //Buscamos el email en la base de datos
  const existeEmail = await Veterinario.findOne({ email });
  if (!existeEmail) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }
  //En caso de existir genera el token y envia el correo
  try {
    existeEmail.token = generarId();
    await existeEmail.save();
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  //Validamos si el token es valido
  const tokenValido = await Veterinario.findOne({ token });

  if (!tokenValido) {
    const error = Error("El token suministrado no es valido");
    return res.status(400).json({ msg: error.message });
  }

  res.json({ msg: "Token valido y el usuario existe" });
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });

  if (!veterinario) {
    const error = Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  //En caso de que exista el user, recibe la nueva password
  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "Password modificado exitosamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
