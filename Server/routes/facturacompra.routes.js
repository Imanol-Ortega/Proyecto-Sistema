import { Router } from "express";
import { getFacturasCompras, postFacturaCompra } from "../controllers/facturacompra.controllers.js";

const router = Router();

router.get('/facturacompra',getFacturasCompras)

router.post('/facturacompra',postFacturaCompra); 


export default router;