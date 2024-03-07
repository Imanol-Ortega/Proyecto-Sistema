import { Router } from "express";
import { dltSubProducto, getRecetaSubProducto, getSubProducto, getSubProductos, postSubProducto, updSubProducto } from "../controllers/subproducto.controllers.js";

const router = Router();

router.get('/subproductos',getSubProductos);

router.get('/subproductos/:id',getSubProducto);

router.post('/subproductos',postSubProducto);

router.put('/subproductos/:id',updSubProducto);

router.post('/subproductos/dlt/:id',dltSubProducto);

router.get('/subproductos/receta/:id',getRecetaSubProducto);

export default router;