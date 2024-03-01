import axios from 'axios'

export const postFacturaCompraRequest = async(value)=>{
    return await axios.post('http://localhost:4000/facturacompra',value);
};
