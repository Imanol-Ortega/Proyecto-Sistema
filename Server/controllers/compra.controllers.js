import { pool } from "../db.js";

export const getCompra = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM compra');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
    }
};

export const getCompras = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM compra WHERE compraid = $1',[parseInt(req.params.id)]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "compra no encontrada"})
        }
        res.json(result);
    } catch (error) {
        console.error(error);
    }
};

export const postCompra = async(req,res)=>{
    try {
        const {fecha,total,proveedorid} = req.body;
        const result = await pool.query('INSERT INTO compra (fecha,total,proveedorid) VALUES ($1,$2,$3)',[fecha,total,proveedorid]);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
};

export const updCompra = async(req,res)=>{
    try {
        const {fecha,total,proveedorid} = req.body;
        const result = await pool.query('UPDATE compra SET fecha = $1, total = $2, proveedorid = $3 WHERE compraid = $4',[fecha,total,proveedorid,req.params.id]);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
};

export const dltCompra = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM compra WHERE compraid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
};