import { Router } from "express";
import { dltCategorias, getCategoria, getCategorias, postCategorias, updCategorias } from "../controllers/categoria.controllers.js";

const router = Router();

router.get('/categoria',getCategorias);

router.get('/categoria/:id',getCategoria);

router.post('/categoria',postCategorias);

router.put('/categoria/:id',updCategorias);

router.delete('/categoria',dltCategorias);

export default router;