import { pool } from "../db.js";

//funcion para obtener todos los datos de personas
export const getPersonas = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM personas');
        console.log(result);   
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

//funcion para obtener un dato de la tabla personas en especifico
export const getPersona = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM personas WHERE personasid = $1',[parseInt(req.params.id)]);
        if (result.length == 0){
            return res.status(404).json({message: "persona no encontrada"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

//funcion para insertar en la tabla personas
export const postPersonas = async(req,res)=>{
    try {
        console.log(req.body)
        const resp= req.body;
        const result = await pool.query('INSERT INTO personas (nombres,apellidos,telefono,direccion,nrodocumento,email,tipodocumentoid,tipopersonaid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
                                        [resp.nombres,resp.apellidos,resp.telefono,resp.direccion,resp.nrodocumento,resp.email,resp.tipodocumentoid,resp.tipopersonaid])
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

// funcion para actualizar la tabla personas
export const updPersonas = async(req,res)=>{
    try {
        const {nombres,apellidos,telefono,direccion,nrodocumento,email,td,tp} = req.body;
        const result = await pool.query('UPDATE personas SET nombres = $1, apellidos = $2, telefono = $3, direccion = $4, nrodocumento = $5, email = $6, tipodocumentoid = $7, tipopersonaid = $8 WHERE personasid = $9 ',
                                        [nombres,apellidos,telefono,direccion,nrodocumento,email,td,tp,req.params.id]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

// funcion para eliminar de la tabla personas
export const dltPersonas = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM personas WHERE personasid = $1',[req.params.id]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};