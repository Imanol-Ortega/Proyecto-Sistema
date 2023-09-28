import express from "express";
import cors from 'cors'
import { PORT } from "./ports.js";
import pruebaRoutes from "./routes/prueba.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(pruebaRoutes);
app.listen(PORT, ()=>{
    console.log(`SERVER CORRIENDO EN PUERTO ${PORT}`)
});
