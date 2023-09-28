import { pool } from "../db.js";

export const getPrueba = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM prueba');
        console.log(result.rows);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};