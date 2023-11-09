import axios from "axios";

export const getUsuario = async(values)=>{
    return await axios.get(`http://localhost:4000/login/${values.nombre}/${values.pass}`)
};