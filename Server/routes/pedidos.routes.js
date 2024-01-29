import { Router } from "express";
import { getPedido,getPedidos,postPedidos,updPedidos,dltPedidos } from "../controllers/pedidos.controllers.js";

const router = Router();

router.get('/pedidos',getPedidos);

router.get('/pedidos/:id',getPedido);

router.post('/pedidos',postPedidos);

router.put('/pedidos/:id',updPedidos);

router.delete('/pedidos/:id',dltPedidos);

export default router;