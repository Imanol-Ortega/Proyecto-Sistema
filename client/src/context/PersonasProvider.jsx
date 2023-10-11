/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useState } from "react";

import { PersonasContext } from "./Contexto";
import {getPersonasRequest,getPersonaRequest,postPersonaRequest,updPersonasRequest,deletePersonasRequest} from '../api/personas.api'

export const usePersonas = ()=>{
    const context = useContext(PersonasContext);
    if(!context){
        throw new Error("El contexto personas deben usarse dentro de personas")
    }
    return context
};

export const PersonasContextProvider = ({children})=>{
    const [persona,setPersona] = useState([]);
    const loadPersonas  = async()=>{
        const response = await getPersonasRequest();
        setPersona(response.data);
    }
    const deletePersonas = async(id)=>{
        try {
            const response = await deletePersonasRequest(id);
            setPersona(persona.filter(persona => persona.personasid !== id))
        } catch (error) {
            console.error(error)
        }
    }
    const getPersona = async(id,values)=>{
        try {
            const response = await getPersonaRequest(id,values);
            return response.data.rows
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <PersonasContext.Provider value={{persona,loadPersonas,getPersona,postPersonaRequest,updPersonasRequest,deletePersonas}}>
            {children}
        </PersonasContext.Provider>
    );
}
/*const createPersona = async(values)=>{
        try {
            const response = await postPersonaRequest();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };
    const getPersona = async(id)=>{
        try {
            const response = await getPersonaRequest(id);
            return response.data.rows;
        } catch (error) {
            console.error(error);
        }
    }
    const updatePersona = async(id,values)=>{
        try {
            const response = await updPersonasRequest(id,values);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    const deletePersona = async(id)=>{
        try {
            const response = await deletePersona(id);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }*/