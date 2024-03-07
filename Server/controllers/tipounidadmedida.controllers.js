import { pool } from "../db.js";

export const getTipoUnidadMedida = async(req,res)=>{
    try {
        const response = await pool.query('SELECT * FROM tipounidadmedida WHERE tipounidadmedidaid = $1',[parseInt(req.params.id)]);
        if (response.rowCount == 0){
            return res.status(404).json({message: "tipo de unidad de medida no encontrado"})
        }
        res.json(response.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getTipoUnidadesMedidas = async(req,res)=>{
    try {
        const response = await pool.query('SELECT * FROM tipounidadmedida');
        res.json(response.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const postTipoUnidadMedida = async(req,res)=>{
    try {
        const rb = req.body;
        const response = await pool.query('INSERT INTO tipounidadmedida (descripcion) VALUES ($1)',
                                          [rb.descripcion]);
        res.json(response)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const updTipoUnidadMedida  = async(req,res)=>{
    try {
        const rb = req.body;
        const response = await pool.query('UPDATE tipounidadmedida SET descripcion = $1 WHERE tipounidadmedidaid = $2',
                                          [rb.descripcion,req.params.id]);
        res.json(response)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

