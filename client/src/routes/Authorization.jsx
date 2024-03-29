/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import {Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexto/AuthProvider";
import Unauthorized from "../componentes/Unauthorized/Unauthorized";


function Authorization({permisos}) {
    const {user,listo} = useAuth();
    const location = useLocation();

    if(listo == true){
        if(user.username){
            const userpermisos = user.permisos;
            const isAllowed = permisos.some((allowed)=> userpermisos.includes(allowed));
            return isAllowed ? <Outlet/> : <Unauthorized/>
        }
        return <Navigate to="login" state={{path:location.pathname}} replace />
    }
}

export default Authorization