import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!(authorization && authorization.startsWith("Bearer"))) {
    const error = new Error("Token no valido o inexistente");
    return res.status(403).json({ msg: error.message }), next();
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_secret);

    req.veterinario = await Veterinario.findById(decoded.id).select(
      "-password -token -confirmado"
    );
    console.log(req.veterinario);
    return next();
  } catch (error) {
    const e = new Error("Token no valido");
    return res.status(403).json({ msg: e.message });
  }
};

export default checkAuth;
