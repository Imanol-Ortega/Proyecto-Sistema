import { pool } from "../db.js";

export const getTipoDocumento = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM tipodocumento WHERE tipodocumentoid = $1',[parseInt(req.params.id)]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "tipo documento no encontrada"})
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const getTipoDocumentos = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM tipodocumento');
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const postTipoDocumento = async(req,res)=>{
    try {
        const {descripcion} = req.body;
        const result = await pool.query('INSERT INTO tipodocumento (descripcion) VALUES ($1)',[descripcion]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const updTipoDocumento = async(req,res)=>{
    try {
        const {descripcion} = req.body;
        const result = pool.query('UPDATE tipodocumento SET descripcion = $1 WHERE tipodocumentoid = $2',[descripcion,req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const dltTipoDocumento = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM tipodocumento WHERE tipodocumentoid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}