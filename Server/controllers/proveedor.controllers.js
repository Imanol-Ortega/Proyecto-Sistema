import { pool } from "../db.js";

export const getProveedor = async(req,res)=>{
    try {
        const response = await pool.query('SELECT * FROM proveedores WHERE proveedorid = $1',[parseInt(req.params.id)]);
        if (response.rowCount == 0){
            return res.status(404).json({message: "proveedor no encontrado"})
        }
        res.json(response.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getProveedores = async(req,res)=>{
    try {
        const response = await pool.query('SELECT * FROM proveedores');
        res.json(response.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postProveedores = async(req,res)=>{
    try {
        const rb = req.body;
        const response = await pool.query('INSERT INTO proveedores (nombre,email,telefono,direccion,ruc,tipodocumentoid) VALUES ($1,$2,$3,$4,$5,$6)',
                                          [rb.nombre,rb.email,rb.telefono,rb.direccion,rb.ruc,rb.tipodocumentoid]);
        res.json(response)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updProveedores = async(req,res)=>{
    try {
        const rb = rq.body;
        const response = await pool.query('UPDATE proveedores SET nombre = $1, email = $2, telefono = $3, direccion = $4, ruc = $5, tipodocumentoid = $6 WHERE proveedorid = $7',
                                          [rb.nombre,rb.email,rb.telefono,rb.direccion,rb.ruc,rb.tipodocumentoid,req.params.id]);
        res.json(response)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const dltProveedores = async(req,res)=>{
    try {
        const response = await pool.query('DELETE FROM proveedores WHERE proveedorid = $1',[req.params.id]);
        res.json(response)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};