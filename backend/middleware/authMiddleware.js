import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!(authorization && authorization.startsWith("Bearer"))) {
    const error = new Error("Token no valido o inexistente");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_secret);
    console.log(decoded);
  } catch (error) {
    const e = new Error("Token no valido");
    return res.status(403).json({ msg: e.message });
  }

  next();
};

export default checkAuth;
