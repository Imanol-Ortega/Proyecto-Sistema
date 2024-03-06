import axios from 'axios'

export const getProveedorRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/proveedor/${id}`);
};

export const getProveedoresRequest = async()=>{
    return await axios.get('http://localhost:4000/proveedor');
};

export const postProveedoresRequest = async(values)=>{
    return await axios.post('http://localhost:4000/proveedor',values);
};

export const updProveedoresRequest = async(id,values)=>{
    return await axios.put(`http://localhost:4000/proveedor/${id}`,values);
};

export const dltProveedoresRequest = async(id)=>{
    return await axios.put(`http://localhost:4000/proveedor/dlt/${id}`);
}