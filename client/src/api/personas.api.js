import axios from 'axios'

export const getPersonasRequest = async(value)=>{
    return await axios.get(`http://localhost:4000/personas/a/${value}`);
};

export const getPersonaRequest = async(id)=>{
    const result = await axios.get(`http://localhost:4000/personas/${id}`);
    return result;
};

export const postPersonaRequest = async(value)=>{
    return await axios.post('http://localhost:4000/personas',value);
};

export const updPersonasRequest = async(id,value)=>{
    return await axios.put(`http://localhost:4000/personas/${id}`,value);
};

export const deletePersonasRequest = async(id)=>{
    return await axios.put(`http://localhost:4000/personas/dlt/${id}`);
};