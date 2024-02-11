import { pool } from "../db.js";

export const postPerfil = async(req,res)=>{
    try {
        const rsp = req.body;
        const result = await pool.query('INSERT INTO perfil (personaid,usuarioid) VALUES($1,$2)',[rsp.personaid,rsp.userid]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}