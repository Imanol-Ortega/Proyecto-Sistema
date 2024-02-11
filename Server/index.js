import express from "express";
import cors from 'cors'
import { PORT } from "./ports.js";
import personasRoutes from "./routes/personas.routes.js"
import tipopersonaRoutes from "./routes/tipopersona.routes.js"
import tipodocumentoRoutes from "./routes/tipodocumento.routes.js"
import userRoutes from "./routes/users.routes.js"
import perfilRoutes from "./routes/perfil.routes.js"
const app = express();
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(personasRoutes);
app.use(tipopersonaRoutes);
app.use(tipodocumentoRoutes);
app.use(userRoutes);
app.use(perfilRoutes);

app.listen(PORT, ()=>{
    console.log(`SERVER CORRIENDO EN PUERTO ${PORT}`)
});
