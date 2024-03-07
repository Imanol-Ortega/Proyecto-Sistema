import { pool } from "../db.js";

export const getTipoProductos = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM tipoproductos');
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getTipoProducto = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM tipoproductos WHERE tipoproductoid = $1',[parseInt(req.params.id)]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "tipo de producto no encontrado"})
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postTipoProductos = async(req,res)=>{
    try {
        const result = await pool.query('INSERT INTO tipoproductos (descripcion) VALUES ($1)',[req.body.descripcion]);
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updTipoProductos = async(req,res)=>{
    try {
        const result = await pool.query('UPDATE tipoproductos SET descripcion=$1 WHERE tipoproductoid = $2',[req.body.descripcion,req.params.id]);
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const dltTipoProductos = async(req,res)=>{
    try {
        const result = pool.query('DELETE FROM tipoproductos WHERE tipoproductoid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};