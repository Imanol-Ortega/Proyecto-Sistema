import { pool } from "../db.js";


export const getPedidos = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM pedidos');
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getPedido = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM pedidos WHERE pedidoid = $1',[parseInt(req.params.id)]);
        if(result.rowCount == 0){
            return res.status(404).json({message: "pedido no encontrado"});
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postPedidos = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('INSERT INTO pedidos (personasid,total,fechaentrega,estado,fechacobro) VALUES ($1,$2,$3,$4,$5)',
                        [resp.personaid,resp.total,resp.fechaentrega,resp.estado,resp.fechacobro]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updPedidos = async(req,res)=>{
    try {
        const {personaid,total,fechaentrega,estado,fechacobro} = req.body;
        const result = await pool.query('UPDATE pedidos SET personasid = $1,total = $2, fechaentrega = $3, estado = $4, fechacobro = $5 WHERE pedidoid = &6',
                        [personaid,total,fechaentrega,fechacobro,estado,fechacobro,req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const dltPedidos = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM pedidos WHERE pedidoid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};