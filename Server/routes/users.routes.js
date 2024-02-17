import { Router } from "express";
import {getUsers,getUser,postUser,updUser,dltUser,getUserName, getUserUnique} from '../controllers/users.controllers.js'
const router = Router();

router.get('/users',getUsers);
router.get('/users/:name/:passw',getUser);
router.get('/users/:name',getUserName);
router.get('/user/:id',getUserUnique);
router.post('/users',postUser);
router.put('/users/:id',updUser);
router.delete('/users/:id',dltUser);

export default router;