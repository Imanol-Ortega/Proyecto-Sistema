import { pool } from "../db.js";

export const getOferta = async(req,res)=>{
    try {
        const resp = await pool.query('SELECT * FROM ofertas WHERE ofertaid = $1',[req.params.id])
        if (resp.rowCount == 0){
            return res.status(404).json({message: "oferta no encontrado"})
        }
        res.json(resp.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getOfertas = async(req,res)=>{
    try {
        const resp = await pool.query('SELECT * FROM ofertas')
        res.json(resp.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postOferta = async(req,res)=>{
    try {
        const rep = req.body;
        const result = await pool.query('INSERT INTO ofertas (nombre) VALUES($1) RETURNING ofertaid',[rep.nombre]);
        for(let i=0; i<rep.descuento.length;i++){
            const response = await pool.query('INSERT INTO descuento (productoid,ofertaid,descuento) VALUES($1,$2,$3)',[rep.descuento[i].productoid,result.rows[0].ofertaid,rep.descuento[i].descuento])
        }
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updOferta = async(req,res)=>{
    try {
        const rep = req.body;
        const resp = await pool.query('UPDATE ofertas SET nombre = $1, estadogeneral = $2 WHERE ofertaid = $3',[rep.nombre,rep.estado,req.params.id])
        const dlt = await pool.query('DELETE FROM descuento WHERE ofertaid = $1',[req.params.id]);

        for(let i=0;i<rep.descuento.length;i++){
            const response = await pool.query('INSERT INTO descuento (productoid,ofertaid,descuento) VALUES($1,$2,$3)',[rep.descuento[i].productoid,req.params.id,rep.descuento[i].descuento])
        }
        res.json(resp)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const dltOferta = async(req,res)=>{
    try {
        
        const rp = await pool.query('DELETE FROM descuento WHERE ofertaid = $1',[req.params.id])
        const response = await pool.query('DELETE FROM ofertas WHERE ofertaid = $1',[req.params.id]);
        res.json(response)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getDescuento = async(req,res)=>{
    try {
        const rep = await pool.query('SELECT * FROM descuento WHERE ofertaid = $1',[req.params.id])
        res.json(rep.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}