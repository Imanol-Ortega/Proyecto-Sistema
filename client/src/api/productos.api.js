import axios from 'axios'

export const getProductosRequest = async()=>{
    return await axios.get('http://localhost:4000/productos');
};

export const getProductoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/productos/${id}`);
};

export const postProductoRequest = async(value)=>{
    return await axios.post('http://localhost:4000/productos',value);
};

export const updProductoRequest = async(id,value)=>{
    return await axios.put(`http://localhost:4000/productos/${id}`,value);
};

export const dltProductoRequest = async(id)=>{
    return await axios.post(`http://localhost:4000/productos/dlt/${id}`)
}

export const getProductoSubproductoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/productosubproducto/${id}`);
}