import express from "express";
import cors from 'cors'
import { PORT } from "./ports.js";
import personasRoutes from "./routes/personas.routes.js"
import tipopersonaRoutes from "./routes/tipopersona.routes.js"
import tipodocumentoRoutes from "./routes/tipodocumento.routes.js"
import loginRoutes from "./routes/login.routes.js"

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(personasRoutes);
app.use(tipopersonaRoutes);
app.use(tipodocumentoRoutes);
app.use(loginRoutes);
app.listen(PORT, ()=>{
    console.log(`SERVER CORRIENDO EN PUERTO ${PORT}`)
});
