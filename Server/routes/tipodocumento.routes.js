import { Router } from "express";
import { dltTipoDocumento, getTipoDocumento, getTipoDocumentos,postTipoDocumento, updTipoDocumento } from "../controllers/tipodocumento.controllers.js";

const router = Router();

router.get('/tipodocumento',getTipoDocumentos);

router.get('/tipodocumento/:id',getTipoDocumento);

router.post('/tipodocumento',postTipoDocumento);

router.put('/tipodocumento/:id',updTipoDocumento);

router.delete('/tipodocumento/:id',dltTipoDocumento);

export default router;