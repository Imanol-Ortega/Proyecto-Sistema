import { Router } from "express";
import { dltOferta, getDescuento, getOferta, getOfertas, postOferta, updOferta } from "../controllers/ofertas.controllers.js";

const router = Router();

router.get('/ofertas',getOfertas);

router.get('/ofertas/:id',getOferta);

router.post('/ofertas',postOferta);

router.put('/ofertas/:id',updOferta);

router.delete('/ofertas/:id',dltOferta);

router.get('/descuento/:id',getDescuento);

export default router;