import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registrar);

router.get("/perfil", checkAuth, perfil);

router.get("/confirmar/:token", confirmar);

router.post("/login", autenticar);

export default router;
