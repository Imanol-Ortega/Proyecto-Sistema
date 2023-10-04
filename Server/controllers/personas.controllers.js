import { pool } from "../db.js";

export const getPersonas = async(req,res)=>{
    try {
        const result = await pool.query('SELECT personasid,nombres,apellidos,telefono,direccion,nrodocumento,email,td,tp FROM personas,(SELECT descripcion FROM personas,tipopersona WHERE personas.tipopersonaid = tipopersona.tipopersonaid) as tp,(SELECT descripcion FROM personas,tipodocumento WHERE personas.tipodocumentoid = tipodocumento.tipodocumentoid) as td');
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
export const getPersona = async(req,res)=>{
    try {
        const result = await pool.query('SELECT personasid,nombres,apellidos,telefono,direccion,nrodocumento,email,td,tp FROM personas,(SELECT descripcion FROM personas,tipopersona WHERE personas.tipopersonaid = tipopersona.tipopersonaid) as tp,(SELECT descripcion FROM personas,tipodocumento WHERE personas.tipodocumentoid = tipodocumento.tipodocumentoid) as td WHERE personasid = $1',[parseInt(req.params.id)]);
        if (result.length == 0){
            return res.status(404).json({message: "persona no encontrada"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
export const postPersonas = async(req,res)=>{
    try {
        const {nombres,apellidos} = req.body;
        console.log("aaa")
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};