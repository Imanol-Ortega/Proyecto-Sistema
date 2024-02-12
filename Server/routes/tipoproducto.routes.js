import { Router } from "express";
import { getTipoProducto, getTiposProductos, postTipoProducto, updTipoProducto } from "../controllers/tipoproducto.controller.js";

const router = Router();

router.get('/tipoproducto',getTiposProductos)

router.get('/tipoproducto/:id',getTipoProducto)

router.post('/tipoproducto',postTipoProducto)

router.put('/tipoproducto/:id',updTipoProducto)

export default router;