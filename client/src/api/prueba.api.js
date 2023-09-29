import axios from 'axios'

export const getPruebaRequest = async()=>{
    const response = await axios.get('http://localhost:4000/prueba')
    console.log(response.data.rows) 
    return response
    
};