/* eslint-disable no-unused-vars */
import {Form,Formik} from 'formik'
import { usePersonas } from '../context/PersonasProvider'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'

function PersonasForm() {
    const {createPersona,getPersona,updatePersona} = usePersonas();
    const [personas,setEditPersonas] = useState({
        
    });

    const params = useParams();
    return (
        <div>PersonasForm</div>
    )
}

export default PersonasForm