/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { postUserRequest,getUserRequest,getUserNameRequest } from "../api/users.api"
import Cookies from "js-cookie"

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    
    return context;
};

export const AuthContextProvider = ({children})=>{
    const navigate = useNavigate();
    const location = useLocation();
    const redirecPath = location.state?.path || "/";

    const [user, setUser] = useState({
        username:"",
        userpassword:"",
        permisos:[]
    });

    const createUserCookie = (usuario)=>{
        console.log(usuario)
        Cookies.set('username',`${usuario.name}`,{expires : 7});
        Cookies.set('permisos',`${usuario.permisos}`,{expires : 7});
    };
    const deleteUserCookie = ()=>{
        Cookies.remove('username');
        Cookies.remove('permisos');
    };
    const register = async(values)=>{
        try {
            const response = await postUserRequest(values);
            return response;
        } catch (error) {
            console.error(error);
        }
    };
    const reg = async(values)=>{
        try {
            const response = await getUserNameRequest(values);
            return response;
        } catch (error) {
            console.error(error)
        }
    };
    const log = async(values)=>{
        try {
            const response = await getUserRequest(values.name,values.passw);
            return response.data;
        } catch (error) {
            console.error(error)
        }
    };

    const login = (usuario)=>{
        
        setUser({username:usuario.name,userpassword:usuario.passw,permisos:usuario.permisos})
        createUserCookie(usuario);
        navigate(redirecPath,{replace:true});
    };
    const logout = () =>{
        setUser({username:"",userpassword:"",permisos:[]});
        deleteUserCookie();
    };

    return (
        <AuthContext.Provider value={{user,login,logout,register,log,reg}}>
            {children}
        </AuthContext.Provider>
    );
}