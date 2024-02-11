import { Router } from "express";
import { postPerfil } from "../controllers/perfil.controllers.js"; 

const router = Router();

router.post('/perfil',postPerfil);

export default router;