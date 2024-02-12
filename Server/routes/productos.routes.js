import { Router } from "express";
import { dltProducto, getProducto, getProductos, postProducto, updProducto } from "../controllers/productos.controllers.js";

const router = Router();

router.get('/productos',getProductos);

router.get('/productos/:id',getProducto);

router.post('/productos',postProducto);

router.put('/productos/:id',updProducto);

router.delete('/productos/:id',dltProducto);

export default router;