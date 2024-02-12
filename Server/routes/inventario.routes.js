import { Router } from "express";
import { dltInventario, getInventario, getInventarios, postInventario, updInventario } from "../controllers/inventario.controllers.js";

const router = Router();

router.get('/inventario',getInventarios);

router.get('/inventario/:id',getInventario);

router.post('/inventario',postInventario);

router.put('/inventario/:id',updInventario);

router.delete('/inventario/:id',dltInventario);

export default router;