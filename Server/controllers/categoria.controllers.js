import { pool } from "../db.js";

export const getCategoria = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM categorias');
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getCategorias = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM categorias WHERE categoriaid = $1',[req.params.id])
        if (result.rowCount == 0){
            return res.status(404).json({message: "tipo de producto no encontrado"})
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postCategorias = async(req,res)=>{
    try {
        const result = await pool.query('INSERT INTO categorias (descripcion) VALUES($1)',[req.body.descripcion]);
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updCategorias = async(req,res)=>{
    try {
        const result = await pool.query('INSERT INTO categorias (descripcion) VALUES($1) WHERE categoriaid = $2',[req.body.descripcion,req.params.id]);
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const dltCategorias = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM categorias WHERE categoriaid = $1',[req.params.id]);
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

