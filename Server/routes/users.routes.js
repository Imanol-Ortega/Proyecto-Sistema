import { Router } from "express";
import {getUsers,getUser,postUser,updUser,dltUser} from '../controllers/users.controllers.js'
const router = Router();

router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/users',postUser);
router.put('/users/:id',updUser);
router.delete('/users/:id',dltUser);

export default router;