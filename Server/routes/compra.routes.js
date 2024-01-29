import { Router } from "express";
import { getCompra,getCompras,postCompra,updCompra,dltCompra } from "../controllers/compra.controllers.js";


const router = Router();

router.get('/compra',getCompra);

router.get('/compra/:id',getCompras);

router.post('/compra',postCompra);

router.put('/compra/id',updCompra);

router.delete('/compra/:id',dltCompra);

export default router;