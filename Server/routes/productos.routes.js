import { Router } from "express";
import { dltProducto, getProducto, getProductoSubproducto, getProductos, postProducto, updProducto } from "../controllers/productos.controllers.js";

const router = Router();

router.get('/productos',getProductos);

router.get('/productos/:id',getProducto);

router.post('/productos',postProducto);

router.put('/productos/:id',updProducto);

router.post('/productos/dlt/:id',dltProducto);

router.get('/productosubproducto/:id',getProductoSubproducto);

export default router;