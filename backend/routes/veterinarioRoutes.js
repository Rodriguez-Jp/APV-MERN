import express from "express";
import { registrar, perfil } from "../controllers/veterinarioController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ url: "Desde API/VETERINARIOS" });
});

router.get("/", registrar);

router.get("/perfil", perfil);

export default router;
