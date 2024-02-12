import axios from 'axios'

export const getTiposProductosRequest = async()=>{
    return await axios.get('http://localhost:4000/tipoproducto');
};

export const getTipoProductoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/tipoproducto/${id}`);
};

export const postTipoProductoRequest = async(value)=>{
    return await axios.post('http://localhost:4000/tipoproducto',value);
};

export const updTipoProductoRequest = async(id,value)=>{
    return await axios.put(`http://localhost:4000/tipoproducto/${id}`,value);
};

/*export const dltTipoProductoRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/tipoproducto/${id}`);
};*/