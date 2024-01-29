import { pool } from "../db.js";

export const getDetallesPedidos = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM detallepedido');
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getDetallePedido = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM detallepedido WHERE detallepedidoid = $1',[req.params.id]);
        if(result.rowCount == 0){
            return res.status(500).json({message:"detalle del pedido no encontrado"});
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postDetallesPedidos = async(req,res)=>{
    try {
        const {productoid,pedidoid,subtotal,cantidad,estado} = req.body;
        const result = await pool.query('INSERT INTO detallepedido (productoid,pedidoid,subtotal,cantidad,estado) VALUES ($1,$2,$3,$4,$5)',
                        [productoid,pedidoid,subtotal,cantidad,estado]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updDetallesPedidos = async(req,res)=>{
    try {
        const {productoid,pedidoid,subtotal,cantidad,estado} = req.body;
        const result = await pool.query('UPDATE detallepedido SET productoid = $1, pedidoid = $2, subtotal = $3, cantidad = $4, estado = $5 WHERE detallepedidoid = $6',
                            [productoid,pedidoid,subtotal,cantidad,estado,req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const dltDetallesPedidos = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM detallepedido WHERE detallepedidoid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};