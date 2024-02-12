import { Router } from "express";
import { getTipoUnidadMedida, getTipoUnidadesMedidas, postTipoUnidadMedida, updTipoUnidadMedida } from "../controllers/tipounidadmedida.controllers.js";

const router = Router();

router.get('/tipounidadmedida',getTipoUnidadesMedidas);

router.get('/tipounidadmedida/:id',getTipoUnidadMedida);

router.post('/tipounidadmedida',postTipoUnidadMedida);

router.put('/tipounidadmedida/:id',updTipoUnidadMedida);


export default router;