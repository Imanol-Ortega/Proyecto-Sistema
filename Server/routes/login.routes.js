import { Router } from "express";
import { getUsuario, getUsuarios } from "../controllers/login.controllers.js";

const router = Router();

router.get('/login/:nombre/:pass',getUsuario);
//router.get('/login',getUsuarios)

export default router;