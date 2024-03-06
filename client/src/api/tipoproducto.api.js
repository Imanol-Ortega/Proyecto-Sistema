import axios from "axios";

export const getTipoProductosRequest = async()=>{
    return await axios.get('http://localhost:4000/tipoproducto');
};

export const getTipoProductoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/tipoproducto/${id}`);
};

export const postTipoProductoRequest = async(values)=>{
    return await axios.post('http://localhost:4000/tipoproducto',values);
};

export const updTipoProductoRequest = async(id,values)=>{
    return await axios.put(`http://localhost:4000/tipoproducto/${id}`,values);
};

export const dltTipoProductoRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/tipoproducto/${id}`);
}