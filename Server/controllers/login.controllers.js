import { pool } from "../db.js";
import  pkg  from "jsonwebtoken";



export const getUsuario = async(req,res)=>{
    try {
        const nombre = req.params.nombre;
        const resp = await pool.query('SELECT * FROM usuarios WHERE nombre = $1 AND pass = $2', [req.params.nombre,req.params.pass]);
        if(resp.rowCount == 0){
            return res.status(404).json({message: "usuario no encontrado"})
        }
        const token = pkg.sign({nombre},"Stack",{
            expiresIn: '3m'
        });
        res.json({token})
    } catch (error) {
        console.error(error)
    }
}
export const getUsuarios = async(req,res)=>{
    try { 
        const result = await pool.query('SELECT * FROM usuarios')
        res.json(result.rows)
    } catch (error) {
        console.error(error)
    } 
}