import axios from "axios";

export const getTipoUnidadMedidasRequest = async()=>{
    return await axios.get('http://localhost:4000/tipounidadmedida');
};

export const getTipoUnidadMedidaRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/tipounidadmedida/${id}`);
};

export const postTipoUnidadMedidaRequest = async(values)=>{
    return await axios.post('http://localhost:4000/tipounidadmedida',values);
};

export const updTipoUnidadMedidaRequest = async(id,values)=>{
    return await axios.put(`http://localhost:4000/tipounidadmedida/${id}`,values);
};