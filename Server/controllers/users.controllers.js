import { pool } from "../db.js";

export const getUser = async(req,res)=>{
    try {
        const result = await pool.query('SELECT u.userid,u.username,u.userpassword,t.descripcion FROM users as u INNER JOIN tipopersona as t ON t.tipopersonaid = u.tipopersonaid WHERE u.username = $1 AND u.userpassword = $2',[req.params.name,req.params.passw]);
        if(result.rowCount == 0 ){
            return res.json(false)
        }
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const getUserUnique = async(req,res)=>{
    try {
        const result = await pool.query('SELECT u.userid,u.username,u.userpassword,t.descripcion FROM users as u INNER JOIN tipopersona as t ON t.tipopersonaid = u.tipopersonaid WHERE u.userid = $1',
                                        [req.params.id]);
         if (result.rowCount == 0){
            return res.status(404).json({message: "usuario no encontrado"})
        }
        res.json(result.rows);                                
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getUsers = async(req,res)=> {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})      
    }
};

export const postUser = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('INSERT INTO users (username,userpassword,tipopersonaid) VALUES ($1,$2,$3) RETURNING userid',[resp.name,resp.passw,1]);
        res.json(result.rows[0].userid) 
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const updUser = async(req,res)=>{
    try {
        const resp = req.body;
        const result = await pool.query('UPDATE users SET username = $1, userpassword = $2 WHERE userid = $3',[resp.name,resp.passw,req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};
export const dltUser = async(req,res)=>{
    try {
        const result = await pool.query('DELETE FROM users WHERE userid = $1',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const getUserName = async(req,res)=>{
    try {
        const result = await pool.query('SELECT u.userid,u.username,u.userpassword,t.descripcion FROM users as u INNER JOIN tipopersona as t ON t.tipopersonaid = u.tipopersonaid WHERE u.userid = $1',[req.params.name]);
        if(result.rowCount == 0 ){
            return res.json(false)
        }
        res.json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}