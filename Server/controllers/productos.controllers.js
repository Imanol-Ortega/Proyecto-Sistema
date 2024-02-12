import { pool } from "../db.js";

//funcion para obtener todos los datos de personas
export const getProducto = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

//funcion para obtener un dato de la tabla personas en especifico
export const getProductos = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM productos WHERE productoid = $1',[parseInt(req.params.id)]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "persona no encontrada"})
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

//funcion para insertar en la tabla personas
export const postProducto = async(req,res)=>{
    try {
        const resp= req.body;
        const result = await pool.query('INSERT INTO productos (nombre,descripcion,precio,preciomanoobra,margenganancia,tipoproductoid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING productoid',
                                        [resp.nombre,resp.descripcion,resp.precio,resp.manoobra,resp.margen,resp.tipoproductoid])

        for(let i=0;i<resp.detalle.length;i++){
            const response = await pool.query('INSERT INTO invent_produc (productoid,inventarioid,cantidad) VALUES($1,$2,$3)',
                                            [result.rows[0].productoid,resp.detalle[i].inventarioid,resp.detalle[i].cantidad]);
            const response2 = await pool.query('UPDATE inventario SET cantidad = cantidad - $1 WHERE inventarioid = $2',
                                                [resp.detalle[i].cantidad,resp.detalle[i].inventarioid])
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

// funcion para actualizar la tabla personas
export const updProducto = async(req,res)=>{
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
export const dltProducto = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM personas WHERE personasid = $1',[req.params.id]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};