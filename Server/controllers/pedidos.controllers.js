import { pool } from "../db.js";

export const getPedido = async(req,res)=>{
    try {
        const reps = await pool.query('SELECT * FROM pedidos WHERE pedidoid = $1',[req.params.id]);
        res.json(reps.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getPedidos = async(req,res)=>{
    try {
        const rp = await pool.query('SELECT * FROM pedidos');
        res.json(rp.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postPedidos = async(req,res)=>{
    try {
        const rq = req.body
        const ped = await pool.query('INSERT INTO pedidos (personasid,total,fechaentrega,pedidofecha,estado) VALUES($1,$2,$3,CURRENT_DATE,$4) RETURNING pedidoid',
                            [rq.personasid,rq.total,rq.fecha,true])
        console.log(ped)
        for(let i=0;i<rq.detalle.length;i++){
            const response = await pool.query('INSERT INTO detallepedido (subtotal,cantidad,productoid,pedidoid) VALUES($1,$2,$3,$4)',
                                    [rq.detalle[i].subtotal,rq.detalle[i].cantidad,rq.detalle[i].productoid,ped.rows[0].pedidoid])
        }
        res.json(ped);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};


export const dltPedidos = async(req,res)=>{
    try {
        const deldett = await pool.query('DELETE FROM detallepedido WHERE pedidoid = $1',[req.params.id]);
        const delped = await pool.query('DELETE FROM pedidos WHERE pedidoid = $1',[req.params.id]);
        res.json(deldett);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getDetalle = async()=>{
    try {
        const resp = await pool.query('SELECT * detallepedido WHERE pedidoid = $1',[req.params.id]);
        res.json(resp.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}