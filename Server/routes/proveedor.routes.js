import { Router } from "express";
import { getProveedor,getProveedores,postProovedor,updProovedor,dltProveedor } from "../controllers/proveedor.controllers.js";

const router = Router();

router.get('/proveedor',getProveedores);

router.get('/proveedor/:id',getProveedor);

router.post('/proveedor',postProovedor);

router.put('/proveedor/:id',updProovedor);

router.delete('/proveedor/:id',dltProveedor);


export default router;