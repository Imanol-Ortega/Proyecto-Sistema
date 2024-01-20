import { pool } from "../db.js";

export const getUser = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1 and userpassword = $2',[req.params.name,req.params.passw]);
        if(result.rowCount == 0 ){
            return res.json(false)
        }
        res.json(true)
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
        const result = await pool.query('INSERT INTO users (username,userpassword,tipopersonaid) VALUES ($1,$2,$3)',[resp.name,resp.passw,1]);
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

export const getUserName = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1',[req.params.name]);
        if(result.rowCount == 0 ){
            return res.json(true)
        }
        res.json(false)
    } catch (error) {
        console.error(error);
    }
}