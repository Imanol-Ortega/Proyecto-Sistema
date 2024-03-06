import { Router } from "express";
import { getPersona,getPersonas,postPersonas,updPersonas,dltPersonas} from "../controllers/personas.controllers.js";

const router = Router();

router.get('/personas/a/:id',getPersonas);

router.get('/personas/:id',getPersona);

router.post('/personas',postPersonas);

router.put('/personas/:id',updPersonas);

router.put('/personas/dlt/:id',dltPersonas);

export default router;