import express from "express";
import cors from 'cors'
import { PORT } from "./ports.js";
import personasRoutes from "./routes/personas.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(personasRoutes);
app.listen(PORT, ()=>{
    console.log(`SERVER CORRIENDO EN PUERTO ${PORT}`)
});
