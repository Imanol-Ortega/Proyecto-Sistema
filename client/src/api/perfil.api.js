import axios from 'axios'

export const postPerfilRequest = async(values)=>{
    return await axios.post('http://localhost:4000/perfil',values);
}