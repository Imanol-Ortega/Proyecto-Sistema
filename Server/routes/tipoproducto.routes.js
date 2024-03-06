import { Router } from "express";
import { dltTipoProductos, getTipoProducto, getTipoProductos, postTipoProductos, updTipoProductos } from "../controllers/tipoproducto.controllers.js";

const router = Router();

router.get('/tipoproducto',getTipoProductos);

router.get('/tipoproducto/:id',getTipoProducto);

router.post('/tipoproducto',postTipoProductos);

router.put('/tipoproducto/:id',updTipoProductos);

router.delete('/tipoproducto/:id',dltTipoProductos);

export default router;