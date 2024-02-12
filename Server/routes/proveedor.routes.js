import { Router } from "express";
import { getProveedor,getProveedores,postProveedores,updProveedores,dltProveedores } from "../controllers/proveedor.controllers.js"; 


const router = Router();

router.get('/proveedor',getProveedores);

router.get('/proveedor/:id',getProveedor);

router.post('/proveedor',postProveedores);

router.put('/proveedor/:id',updProveedores);

router.delete('/proveedor/:id',dltProveedores);

export default router;