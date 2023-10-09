import { pool } from "../db.js";

export const getTipoPersona = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM tipopersona WHERE tipopersonaid = $1',[parseInt(req.params.id)]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "tipo persona no encontrada"})
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getTipoPersonas = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM tipopersona');
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const postTipoPersona = async(req,res)=>{
    try {
        const {descripcion} = req.body;
        const result = await pool.query('INSERT INTO tipopersona (descripcion) VALUES ($1)',[descripcion]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updTipoPersona = async(req,res)=>{
    try {
        const {descripcion} = req.body;
        if(req.params.id){
            const result = pool.query('UPDATE tipopersona SET descripcion = $1 WHERE tipopersonaid = $2',[descripcion,req.params.id]);
            res.json(result);
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const dltTipoPersona = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM tipopersona WHERE tipopersonaid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
