import axios from 'axios'

export const getInventariosRequest = async()=>{
    return await axios.get('http://localhost:4000/inventario');
};

export const getInventarioRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/inventario/${id}`);
};

export const postInventarioRequest = async(value)=>{
    return await axios.post('http://localhost:4000/inventario',value);
};

export const updInventarioRequest = async(id,value)=>{
    return await axios.put(`http://localhost:4000/inventario/${id}`,value);
};

export const dltInventarioRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/inventario/${id}`);
};