import { pool } from "../db.js";

export const getDetalleCompra = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM detallecompra');
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getDetallesCompras = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM detallecompra WHERE detallecompraid = $1',[req.params.id]);
        if(result.rowCount == 0){
            return res.status(404).json({message: "detalle de compra no encontrado"});
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postDetalleCompra = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('INSERT INTO detallecompra (subtotal,compraid,inventarioid) VALUES ($1,$2,$3)',
                        [resp.subtotal,resp.compraid,resp.inventarioid]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updDetalleCompra = async(req,res)=>{
    try {
        const {subtotal,compraid,inventarioid} = req.body;
        const result = await pool.query('UPDATE detallecompra SET subtotal = $1, compraid = $2, inventarioid=$3 WHERE detallecompraid = $4',
                        [subtotal,compraid,inventarioid,req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const dltDetalleCompra = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM detallecompra WHERE detallecompraid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:message.error});
    }
};