import axios from "axios";

export const getTipoDocumentosRequest = async()=>{
    return await axios.get('http://localhost:4000/tipodocumento');
};

export const getTipoDocumentoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/tipodocumento/${id}`);
};

export const postTipoDocumentosRequest = async(values)=>{
    return await axios.post('http://localhost:4000/tipodocumento',values);
};

export const updTipoDocumentosRequest = async(id,values)=>{
    return await axios.put(`http://localhost:4000/tipodocumento/${id}`,values);
};

export const dltTipoDocumentosRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/tipodocumento/${id}`);
};