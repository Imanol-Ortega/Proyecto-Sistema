import axios from 'axios'

export const getSubProductosRequest = async()=>{
    return await axios.get('http://localhost:4000/subproductos');
};

export const getSubProductoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/subproductos/${id}`);
};

export const postSubProductoRequest = async(value)=>{
    return await axios.post('http://localhost:4000/subproductos',value);
};

export const updSubProductoRequest = async(id,value)=>{
    return await axios.put(`http://localhost:4000/subproductos/${id}`,value);
};

export const dltSubProductoRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/subproductos/dlt/${id}`);
};

export const getRecetaRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/subproductos/receta/${id}`)
}