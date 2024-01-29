import { Router } from "express";
import { getDetalleCompra,getDetallesCompras,postDetalleCompra,updDetalleCompra,dltDetalleCompra } from "../controllers/detallecompra.controllers.js";


const router = Router();

router.get('/detallecompra',getDetalleCompra);

router.get('/detallecompra/:id',getDetallesCompras);

router.post('/detallecompra',postDetalleCompra);

router.put('/detallecompra/:id',updDetalleCompra);

router.delete('/detallecompra/:id',dltDetalleCompra);

export default router;