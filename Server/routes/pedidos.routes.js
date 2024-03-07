import { Router } from "express";
import { dltPedidos, finalizar, getDetalle, getPedido, getPedidos, postPedidos } from "../controllers/pedidos.controllers.js";

const router = Router();

router.get('/pedidos',getPedidos);

router.get('/pedidos/:id',getPedido);

router.post('/pedidos',postPedidos);

router.delete('/pedidos/:id',dltPedidos)

router.get('/detallepedido/:id',getDetalle);

router.post('/finalizar/:id',finalizar)

export default router;