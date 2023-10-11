import axios from "axios";

export const getTipoPersonasRequest = async()=>{
    return await axios.get('http://localhost:4000/tipopersona');
};

export const getTipoPersonaRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/tipopersona/${id}`);
};

export const postTipoPersonasRequest = async(values)=>{
    return await axios.post('http://localhost:4000/tipopersona',values);
};

export const updTipoPersonasRequest = async(id,values)=>{
    return await axios.put(`http://localhost:4000/tipopersona/${id}`,values);
};

export const dltTipoPersonasRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/tipopersona/${id}`);
};