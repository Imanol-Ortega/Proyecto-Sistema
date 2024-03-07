import { pool } from "../db.js";

export const getTipoSubProducto = async(req,res)=>{
    try {
        const rp = await pool.query('SELECT * FROM tiposubproducto WHERE tiposubproductoid = $1',[req.params.id])
        if (rp.rowCount == 0){
            return res.status(404).json({message: "tipo de subproducto no encontrado"})
        }
        res.json(rp.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getTipoSubProductos = async(req,res)=>{
    try {
        const rp = await pool.query('SELECT * FROM tiposubproducto')
        res.json(rp.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const postTipoSubProducto = async(req,res)=>{
    try {
        const rp = await pool.query('INSERT INTO tiposubproducto (descripcion) VALUES($1)',[req.body.descripcion])
        res.json(rp)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const updTipoSubProducto = async(req,res)=>{
    try {
        const rp = await pool.query('UPDATE tiposubproducto SET descripcion = $1 WHERE tiposubproductoid = $2',[req.body.descripcion,req.params.id])
        res.json(rp)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
