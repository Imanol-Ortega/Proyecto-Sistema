import { Router } from "express";
import { getTipoSubProducto, getTipoSubProductos, postTipoSubProducto, updTipoSubProducto } from "../controllers/tiposubproducto.controllers.js";

const router = Router();

router.get('/tiposubproducto',getTipoSubProductos);

router.get('/tiposubproducto/:id',getTipoSubProducto);

router.post('/tiposubproducto',postTipoSubProducto);

router.put('/tiposubproducto/:id',updTipoSubProducto);

export default router;