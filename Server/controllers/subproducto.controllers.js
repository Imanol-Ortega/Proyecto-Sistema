import { pool } from "../db.js";

export const getSubProducto = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM subproductos WHERE subproductoid = $1 AND activo = TRUE',[parseInt(req.params.id)]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "subproducto no encontrado"})
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const getSubProductos = async(req,res)=>{
    try {
        const result = await pool.query('SELECT s.subproductoid, s.nombre,s.descripcion,s.precio,t.tiposubproductoid as tiposubproductoid,t.descripcion as tiposub FROM subproductos as s INNER JOIN tiposubproducto as t ON s.tiposubproductoid = t.tiposubproductoid WHERE activo = TRUE');
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const postSubProducto = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('INSERT INTO subproductos (nombre,descripcion,precio,tiposubproductoid) VALUES ($1,$2,$3,$4) RETURNING subproductoid',[resp.nombre,resp.descripcion,resp.precio,resp.tiposubproductoid]);
        for(let i=0;i<resp.detalle.length;i++){
            const response = await pool.query('INSERT INTO recetasubproductos (inventarioid,subproductoid,cantidad) VALUES($1,$2,$3)',
                                    [resp.detalle[i].inventarioid,result.rows[0].subproductoid,resp.detalle[i].cantidad]);
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const updSubProducto = async(req,res)=>{
    try {

        const resp = req.body;
        
        const result = await pool.query('UPDATE subproductos SET descripcion = $1,nombre = $2,precio = $3, tiposubproductoid = $4 WHERE subproductoid = $5',[resp.descripcion,resp.nombre,resp.precio,resp.tiposubproductoid,req.params.id]);

        const dltreceta = await pool.query('DELETE FROM recetasubproductos WHERE subproductoid = $1',[req.params.id])

        for(let i=0;i<resp.detalle.length;i++){
            const rp = await pool.query('INSERT INTO recetasubproductos (inventarioid,subproductoid,cantidad) VALUES($1,$2,$3)',
                                        [resp.detalle[i].inventarioid,req.params.id,resp.detalle[i].cantidad]);
        }

        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const dltSubProducto = async(req,res)=>{
    try {
        const result = await pool.query('UPDATE subproductos SET activo = FALSE WHERE subproductoid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getRecetaSubProducto = async(req,res)=>{
    try {
        const result = await pool.query('SELECT inventarioid,cantidad FROM recetasubproductos WHERE subproductoid = $1',[req.params.id]);
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const reducirInventario = async(req,res)=>{
    try {
        const rp = req.body
        const result = await pool.query('UPDATE inventario SET cantidad = cantidad - $1 WHERE inventarioid = $2',[rp.cantidad,rp.inventarioid]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}