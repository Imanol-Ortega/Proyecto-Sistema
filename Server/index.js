import express from "express";
import cors from 'cors'
import { PORT } from "./routes/ports.js";

const app = express()

app.listen(PORT)