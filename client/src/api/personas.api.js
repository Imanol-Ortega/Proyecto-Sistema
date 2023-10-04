import axios from 'axios'

export const getPersonaRequest = async()=>{
    const response = await axios.get('http://localhost:4000/personas')
    console.log(response.data.rows); 
    return response
};