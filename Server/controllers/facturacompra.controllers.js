import { pool } from "../db.js";
import format from "pg-format";


export const getFacturasCompras = async(req,res)=>{
    try {
        const detalle = await pool.query('SELECT DISTINCT detallecompraid,i.inventarioid,c.compraid,c.total,c.timbrado,detallecompra.subtotal, detallecompra.cantidad , i.nombre FROM detallecompra INNER JOIN inventario as i ON i.inventarioid = detallecompra.inventarioid INNER JOIN compra as c ON c.compraid = detallecompra.compraid ORDER BY c.compraid');
        res.json(detalle.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const postFacturaCompra = async(req,res)=>{ 
    try {
        const resp = req.body;
        const compra = await pool.query('INSERT INTO compra (total,proveedorid,timbrado) VALUES ($1,$2,$3) RETURNING compraid',
                                      [resp.total,resp.proveedorid,resp.timbrado]);

        let arreglo = []
        for(let i=0;i<resp.detalle.length;i++){ 
           arreglo.push([resp.detalle[i].subtotal,resp.detalle[i].inventarioid,resp.detalle[i].cantidad,compra.rows[0].compraid])
        }
        const detallecompra = await pool.query(format('INSERT INTO detallecompra (subtotal,inventarioid,cantidad,compraid) VALUES %L',arreglo))

        for(let i=0;i<resp.detalle.length;i++){
            const updinventario = await pool.query('UPDATE inventario SET cantidad = cantidad + $1 WHERE inventarioid = $2',[resp.detalle[i].cantidad,resp.detalle[i].inventarioid])
        }

        res.json(compra) 
    } catch (error) {
        return res.status(500).json({message:error.message})
    } 
};

export const getDetalleFactura = async(req,res)=>{
    try {
        const result = await pool.query('SELECT cantidad,max(subtotal) as subtotal  FROM detallecompra WHERE inventarioid = $1 GROUP BY cantidad ORDER BY subtotal DESC LIMIT 1',[req.params.id]);
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}