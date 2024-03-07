import { Router } from "express";
import { deleteFacturaCompra, getCompra, getFacturasCompras, postFacturaCompra } from "../controllers/facturacompra.controllers.js";

const router = Router();

router.get('/facturacompra',getFacturasCompras)

router.get('/compra',getCompra);

router.post('/facturacompra',postFacturaCompra);

router.post('/facturacompra/:id',deleteFacturaCompra);


export default router;