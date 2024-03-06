import axios from "axios";

export const getCategoriasRequest = async()=>{
    return await axios.get('http://localhost:4000/categoria');
};

export const getCategoriaRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/categoria/${id}`);
};

export const postCategoriasRequest = async(values)=>{
    return await axios.post('http://localhost:4000/categoria',values);
};

export const updCategoriasRequest = async(id,values)=>{
    return await axios.put(`http://localhost:4000/categoria/${id}`,values);
};

export const dltCategoriasRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/categoria/${id}`);
}