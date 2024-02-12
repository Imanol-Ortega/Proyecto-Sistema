import { pool } from "../db.js";

export const getTipoProducto = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM tipoproductos WHERE tipoproductoid = $1',[req.params.id]);
        if (result.rowCount == 0){
            return res.status(404).json({message: "subproducto no encontrado"})
        }
        res.json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const getTiposProductos = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM tipoproductos');
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const postTipoProducto = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('INSERT INTO tipoproductos (nombre,descripcion,personalizable) VALUES ($1,$2,$3) RETURNING tipoproductoid',[resp.nombre,resp.descripcion,resp.personalizable]);
        
        if(resp.personalizable == true){
            for(let i=0;i<resp.detalle.length;i++){
                const relleno = resp.detalle[i].tipo == '1' ? '1': '0';
                const cobertura = resp.detalle[i].tipo == '2' ? '2': '0'

                const response = await pool.query('INSERT INTO tipoprod_subprod (tipoproductoid,subproductoid,relleno,cobertura) VALUES($1,$2,$3,$4)',
                                        [result.rows[0].tipoproductoid,resp.detalle[i].subproductoid,relleno,cobertura]);
            }
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const updTipoProducto = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('UPDATE tipoproductos SET descripcion = $1,nombre = $2,personalizable = $3 WHERE tipoproductoid = $4',[resp.descripcion,resp.nombre,req.personalizable,req.params.id]);

        for(let i=0;i<resp.detalle.length;i++){
            const relleno = resp.detalle[i].tipo == '1' ? '1': '0';
            const cobertura = resp.detalle[i].tipo == '2' ? '2': '0'
            const response = await pool.query('UPDATE tipoprod_subprod SET relleno = $1, cobertura = $2 WHERE subproductoid = $3 and tipoproductoid = $4',
                                                [relleno,cobertura,resp.detalle[i].subproductoid,req.params.id])
        }

        res.json(result);

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const dltTipoProducto = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};