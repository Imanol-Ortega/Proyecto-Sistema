import { pool } from "../db.js";

export const getInventarios = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM inventario WHERE activo = TRUE');
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};


export const getInventario = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM inventario WHERE inventarioid = $1 AND activo = TRUE',[parseInt(req.params.id)]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "producto no encontrado"})
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};


export const postInventario = async(req,res)=>{
    try {
        const resp= req.body;
        const result = await pool.query('INSERT INTO inventario (nombre,descripcion,cantidad,tipounidadmedidaid) VALUES ($1,$2,$3,$4)',
                                        [resp.nombre,resp.descripcion,resp.cantidad,resp.tipounidadmedidaid])
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};


export const updInventario = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('UPDATE inventario SET nombre = $1, descripcion = $2, cantidad = $3, tipounidadmedidaid = $4 WHERE inventarioid = $5',
                                        [resp.nombre,resp.descripcion,resp.cantidad,resp.tipounidadmedidaid,req.params.id]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};


export const dltInventario = async(req,res)=>{
    try {
        const result = await pool.query('UPDATE inventario SET activo = FALSE  WHERE inventarioid = $1',[req.params.id]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};