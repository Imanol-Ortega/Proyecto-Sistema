import axios from 'axios'

export const getPedidosRequest = async()=>{
    return await axios.get('http://localhost:4000/pedidos');
};

export const getPedidoRequest = async(id)=>{
    const result = await axios.get(`http://localhost:4000/pedidos/${id}`);
    return result;
};

export const postPedidosRequest = async(value)=>{
    return await axios.post('http://localhost:4000/pedidos',value);
};

export const deletePedidosRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/pedidos/${id}`);
};

export const getDetalleRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/detallepedido/${id}`)
}