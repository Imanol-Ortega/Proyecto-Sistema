import { Router } from "express";
import { dltTipoPersona, getTipoPersona, getTipoPersonas, postTipoPersona, updTipoPersona } from "../controllers/tipopersona.controllers.js";
const router = Router();

router.get('/tipopersona',getTipoPersonas);

router.get('/tipopersona/:id',getTipoPersona);

router.post('/tipopersona',postTipoPersona);

router.put('/tipopersona/:id',updTipoPersona);

router.delete('tipopersona/:id',dltTipoPersona);

export default router;