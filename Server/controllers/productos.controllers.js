import { pool } from "../db.js";

//funcion para obtener todos los datos de personas
export const getProductos = async(req,res)=>{
    try {
        const result = await pool.query('SELECT p.productoid,p.nombre,p.descripcion,p.precio,t.descripcion as tipomedida, tp.descripcion as tp, c.descripcion as cat FROM productos as p INNER JOIN tipounidadmedida as t ON t.tipounidadmedidaid = p.tipounidadmedidaid INNER JOIN tipoproductos as tp ON p.tipoproductoid = tp.tipoproductoid INNER JOIN categorias as c ON c.categoriaid = p.categoriaid WHERE activo=TRUE');
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

//funcion para obtener un dato de la tabla personas en especifico
export const getProducto = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM productos WHERE productoid = $1 AND activo = TRUE',[parseInt(req.params.id)]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "producto no encontrado"})
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
        const result = await pool.query('INSERT INTO productos (nombre,descripcion,precio,,tipounidadmedidaid,tipoproductoid,categoriaid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING productoid',
                                        [resp.nombre,resp.descripcion,resp.precio,resp.tipounidadmedidaid,resp.tipoproductoid,resp.categoriaid])

        for(let i=0;i<resp.detalle.length;i++){
            const response = await pool.query('INSERT INTO productosubproducto (productoid,subproductoid) VALUES($1,$2)',
                                            [result.rows[0].productoid,resp.detalle[i].subproductoid]);
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

// funcion para actualizar la tabla personas
export const updProducto = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, tipounidadmedidaid = $4, tipoproductoid = $5, categoriaid = $6 WHERE productoid = $7 ',
                                        [resp.nombre,resp.descripcion,resp.precio,resp.tipounidadmedidaid,resp.tipoproductoid,resp.categoriaid,req.params.id]);
        const dlt = await pool.query('DELETE FROM productosubproducto WHERE productoid = $1',[req.params.id])
        for(let i=0;i<resp.detalle.length;i++){
            const response = await pool.query('INSERT INTO productosubproducto (productoid,subproductoid) VALUES($1,$2)',
                                            [req.params.id,resp.detalle[i].subproductoid]);
        }
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

// funcion para eliminar de la tabla personas
export const dltProducto = async(req,res)=>{
    try {
        const result = await pool.query('UPDATE productos SET activo = false WHERE productoid = $1',[req.params.id]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const getProductoSubproducto = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM productosubproducto WHERE productoid = $1',[req.params.id])
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}