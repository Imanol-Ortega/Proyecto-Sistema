import { pool } from "../db.js";

export const getProveedor = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM proveedores');
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    };
};

export const getProveedores = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM proveedores WHERE proveedorid = $1',[req.params.id]);
        if(result.rowCount == 0){
            return res.status(404).json({message:error.message});
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postProovedor = async(req,res)=>{
    try {
        const resp = req.body
        const result = await pool.query('INSERT INTO proovedores (nombre,email,telefono,direccion,ruc,tipodocumentoid) VALUES ($1,$2,$3,$4,$5,$6)',
                                        [resp.nombre,resp.email,resp.telefono,resp.direccion,resp.ruc,resp.tipodocumentoid]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updProovedor = async(req,res)=>{
    try {
        const {nombre,email,telefono,direccion,ruc,tipodocumentoid} = req.body;
        const result = await pool.query('UPDATE proveedores SET nombre = $1, email = $2,telefono = $3, direccion = $4,ruc = $5,tipodocumentoid = $6 WHERE proveedorid = $7',
                                        [nombre,email,telefono,direccion,ruc,tipodocumentoid,req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const dltProveedor = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM proveedores WHERE proveedorid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};