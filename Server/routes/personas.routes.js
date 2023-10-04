import { Router } from "express";
import { getPersona,getPersonas,postPersonas} from "../controllers/personas.controllers.js";
const router = Router();

router.get('/personas',getPersonas);

router.get('/personas/:id',getPersona);

router.post('/personas',postPersonas);


export default router;