import { pool } from "../db.js";

export const getUser = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('SELECT * FROM users WHERE nombre = $1 and passw = $2',[resp.nombre,resp,passw]);
        if(result.rowCount == 0 ){
            return res.status(404).json({message:"usuario no encontrado"})
        }
        res.json(result)
    } catch (error) {
        console.error(error);
    }
};

export const getUsers = async(req,res)=> {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows)
    } catch (error) {
        console.error(error);      
    }
};

export const postUser = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('INSERT INTO users (username,userpassword) VALUES ($1,$2)',[resp.nombre,resp,passw]);
        if(result.rowCount == 0 ){
            return res.status(404).json({message:"usuario no encontrado"})
        }
        res.json(result)
    } catch (error) {
        console.error(error)
    }
};

export const updUser = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('UPDATE users SET username = $1, userpassword = $2 WHERE userid = $3',[resp.name,resp.passw,req.params.id]);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
};
export const dltUser = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM users WHERE userid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
};