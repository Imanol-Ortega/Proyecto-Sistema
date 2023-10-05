import { Router } from "express";
import { getPersona,getPersonas,postPersonas,updPersonas,dltPersonas} from "../controllers/personas.controllers.js";
const router = Router();

router.get('/personas',getPersonas);

router.get('/personas/:id',getPersona);

router.post('/personas',postPersonas);

router.put('/personas/:id',updPersonas);

router.delete('/personas/:id',dltPersonas);

export default router;