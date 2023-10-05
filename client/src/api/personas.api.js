import axios from 'axios'

export const getPersonasRequest = async()=>{
    return await axios.get('http://localhost:4000/personas');
};

export const getPersonaRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/personas/${id}`);
};

export const postPersonaRequest = async(value)=>{
    return await axios.post('http://localhost:4000/personas',value);
};

export const updPersonasRequest = async(id,value)=>{
    return await axios.put(`http://localhost:4000/personas/${id}`,value);
};

export const deletePersonasRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/personas/${id}`);
};