import { Router } from "express";
import { getDetalleFactura, getFacturasCompras, postFacturaCompra } from "../controllers/facturacompra.controllers.js";

const router = Router();

router.get('/facturacompra',getFacturasCompras)

router.post('/facturacompra',postFacturaCompra);

router.get('/facturacompra/detalle/:id',getDetalleFactura)


export default router;