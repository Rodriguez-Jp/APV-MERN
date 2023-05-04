import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body;

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
    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  res.json({ msg: "Mostrando el perfil" });
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

const olvidePassword = (req, res) => {
  const { email } = req.body;
  res.json({ msg: email });
};

const comprobarToken = (req, res) => {
  console.log(req);
};

const nuevoPassword = (req, res) => {
  console.log(req);
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
