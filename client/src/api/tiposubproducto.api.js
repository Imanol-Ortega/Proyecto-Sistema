import axios from "axios";

export const getTipoSubproductosRequest = async()=>{
    return await axios.get('http://localhost:4000/tiposubproducto');
};

export const getTipoSubproductoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/tiposubproducto/${id}`);
};

export const postTipoSubproductoRequest = async(values)=>{
    return await axios.post('http://localhost:4000/tiposubproducto',values);
};

export const updTipoSubproductoRequest = async(id,values)=>{
    return await axios.put(`http://localhost:4000/tiposubproducto/${id}`,values);
};
