import { Router } from "express";
import { dltSubProducto, getSubProducto, getSubProductos, postSubProducto, updSubProducto } from "../controllers/subproducto.controllers.js";

const router = Router();

router.get('/subproductos',getSubProductos);

router.get('/subproductos/:id',getSubProducto);

router.post('/subproductos',postSubProducto);

router.put('/subproductos/:id',updSubProducto);

router.delete('/subproductos/:id',dltSubProducto);

export default router;