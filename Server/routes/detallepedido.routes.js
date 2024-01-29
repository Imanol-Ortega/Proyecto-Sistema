import { Router } from "express";
import { getDetallePedido,getDetallesPedidos,postDetallesPedidos,updDetallesPedidos,dltDetallesPedidos } from "../controllers/detallepedido.controllers.js";


const router = Router();

router.get('/detallepedido',getDetallesPedidos);

router.get('/detallepedido/:id',getDetallePedido);

router.post('/detallepedido',postDetallesPedidos);

router.put('/detallepedido/:id',updDetallesPedidos);

router.delete('/detallepedido/:id',dltDetallesPedidos);

export default router;