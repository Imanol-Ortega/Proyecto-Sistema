import axios from 'axios'


export const getFacturasComprasRequest = async()=>{
    return await axios.get('http://localhost:4000/facturacompra');
};

export const postFacturaCompraRequest = async(value)=>{
    return await axios.post('http://localhost:4000/facturacompra',value);
};

export const getCompraRequest = async()=>{
    return await axios.get('http://localhost:4000/compra');
};

export const dltFacturaCompraRequest = async(id)=>{
    return await axios.post(`http://localhost:4000/facturacompra/${id}`)
}
