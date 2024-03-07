import express from "express";
import cors from 'cors'
import { PORT } from "./ports.js";
import personasRoutes from "./routes/personas.routes.js"
import tipopersonaRoutes from "./routes/tipopersona.routes.js"
import tipodocumentoRoutes from "./routes/tipodocumento.routes.js"
import userRoutes from "./routes/users.routes.js"
import perfilRoutes from "./routes/perfil.routes.js"
import proveedorRoutes from "./routes/proveedor.routes.js"
import inventarioRoutes from "./routes/inventario.routes.js"
import tipounidadmedidaRoutes from "./routes/tipounidadmedida.routes.js"
import facturacompraRoutes from "./routes/facturacompra.routes.js"
import subproductoRoutes from "./routes/subproducto.routes.js"
import productosRoutes from "./routes/productos.routes.js"
import tipoproductosRoutes from "./routes/tipoproducto.routes.js"
import categoriaRoutes from "./routes/categoria.routes.js"
import tiposubproductoRoutes from "./routes/tiposubproducto.routes.js"

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(personasRoutes);
app.use(tipopersonaRoutes);
app.use(tipodocumentoRoutes);
app.use(userRoutes);
app.use(perfilRoutes);
app.use(proveedorRoutes);
app.use(inventarioRoutes);
app.use(tipounidadmedidaRoutes);
app.use(facturacompraRoutes);
app.use(subproductoRoutes);
app.use(productosRoutes);
app.use(tipoproductosRoutes);
app.use(categoriaRoutes);
app.use(tipodocumentoRoutes);
app.use(tiposubproductoRoutes)
app.listen(PORT, ()=>{
    console.log(`SERVER CORRIENDO EN PUERTO ${PORT}`)
});
