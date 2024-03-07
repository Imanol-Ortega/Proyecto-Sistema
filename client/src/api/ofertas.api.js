import axios from 'axios'

export const getOfertasRequest = async()=>{
    return await axios.get('http://localhost:4000/ofertas');
};

export const getOfertaRequest = async(id)=>{
    const result = await axios.get(`http://localhost:4000/ofertas/${id}`);
    return result;
};

export const postOfertaRequest = async(value)=>{
    return await axios.post('http://localhost:4000/ofertas',value);
};

export const updOfertasRequest = async(id,value)=>{
    return await axios.put(`http://localhost:4000/ofertas/${id}`,value);
};

export const deleteOfertasRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/ofertas/${id}`);
};

export const getDescuentoRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/descuento/${id}`)
}