/* eslint-disable react/prop-types */
import { useAuth } from "../contexto/AuthProvider";
import { Navigate,useLocation } from "react-router-dom";

const Authentication = ({children}) =>{
    const {user,listo}= useAuth();
    const location = useLocation();

    if(listo == true){
        if(!user.username){
            return <Navigate to="/login" state={{path:location.pathname}}/>
        }
        return children
    }
};

export default Authentication;