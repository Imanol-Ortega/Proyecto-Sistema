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
        const result = await pool.query('SELECT * FROM subproductos WHERE activo = TRUE');
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const postSubProducto = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('INSERT INTO subproductos (nombre,descripcion) VALUES ($1,$2) RETURNING subproductoid',[resp.nombre,resp.descripcion]);
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
        
        const result = await pool.query('UPDATE subproductos SET descripcion = $1,nombre = $2 WHERE subproductoid = $3',[resp.descripcion,resp.nombre,req.params.id]);

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
        const result = await pool.query('SELECT * FROM recetasubproductos WHERE subproductoid = $1',[req.params.id]);
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}