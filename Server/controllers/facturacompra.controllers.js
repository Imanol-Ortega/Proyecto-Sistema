import { pool } from "../db.js";
import format from "pg-format";


export const getFacturasCompras = async(req,res)=>{
    try {
        const detalle = await pool.query('SELECT DISTINCT detallecompraid,i.inventarioid,c.compraid,c.total,c.timbrado,c.fecha,detallecompra.subtotal, detallecompra.cantidad , i.nombre FROM detallecompra INNER JOIN inventario as i ON i.inventarioid = detallecompra.inventarioid INNER JOIN compra as c ON c.compraid = detallecompra.compraid ORDER BY c.compraid');
        res.json(detalle.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const getCompra = async(req,res)=>{
    try {
        const compra = await pool.query('SELECT DISTINCT c.compraid, c.proveedorid, p.nombre AS proveedor, c.fecha, c.total, c.timbrado FROM compra c INNER JOIN proveedores p ON c.proveedorid = p.proveedorid INNER JOIN detallecompra d ON c.compraid = d.compraid ORDER BY c.compraid');
        res.json(compra.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

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

export const deleteFacturaCompra = async(req,res)=>{
    try {
        const rep = await pool.query('SELECT inventarioid,cantidad FROM detallecompra INNER JOIN compra ON detallecompra.compraid = compra.compraid WHERE detallecompra.compraid = $1',[req.params.id])

        for(let i=0;i<rep.rows.length;i++){
            const updinventario = await pool.query('UPDATE inventario SET cantidad = cantidad - $1 WHERE inventarioid = $2',[rep.rows[i].cantidad, rep.rows[i].inventarioid]);
        }
        const del = await pool.query('DELETE FROM compra WHERE compraid = $1',[req.params.id]);
        res.json(rep.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
