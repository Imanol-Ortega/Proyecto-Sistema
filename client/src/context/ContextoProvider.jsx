/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useState } from "react";

import { PersonasContext } from "./Contexto";
import {getPersonasRequest,getPersonaRequest,postPersonaRequest,updPersonasRequest,deletePersonasRequest} from '../api/personas.api'
import { getTipoPersonasRequest,getTipoPersonaRequest } from "../api/tipopersona.api";
import { getTipoDocumentosRequest,getTipoDocumentoRequest } from "../api/tipodocumento.api";

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
    const getTipoPersonas = async(id)=>{
        try {
            const res = await getTipoPersonasRequest();
            const aux = res.data;
            const data = aux.map(function(tipo){
                return {id:tipo.tipopersonaid,descripcion:tipo.descripcion};
            });
            return data
        } catch (error) {
            console.error(error);
        }
    };
    const getTipoDocumentos = async(id)=>{
        try {
            const res = await getTipoDocumentosRequest();
            const aux = res.data
            const data = aux.map(function(tipo){
                return {id:tipo.tipodocumentoid,descripcion:tipo.descripcion}
            });
            return data
        } catch (error) {
            console.error(error);
        }
    };
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
        <PersonasContext.Provider value={{persona,loadPersonas,getPersona,postPersonaRequest,updPersonasRequest,deletePersonas,getTipoDocumentos,getTipoPersonas,getTipoPersonaRequest,getTipoDocumentoRequest}}>
            {children}
        </PersonasContext.Provider>
    );
};
