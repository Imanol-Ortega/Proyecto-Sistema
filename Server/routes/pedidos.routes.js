import { Router } from "express";
import { dltPedidos, getDetalle, getPedido, getPedidos, postPedidos } from "../controllers/pedidos.controllers.js";

const router = Router();

router.get('/pedidos',getPedidos);

router.get('/pedidos/:id',getPedido);

router.post('/pedidos',postPedidos);

router.delete('/pedidos/:id',dltPedidos)

router.get('/detallepedido/:id',getDetalle);

export default router;