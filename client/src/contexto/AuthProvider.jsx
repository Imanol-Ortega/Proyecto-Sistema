/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { postUserRequest,getUserRequest,getUserNameRequest, getUserUniqueRequest } from "../api/users.api"
import Cookies from "js-cookie"
import PERMISOS from "../VariablesGlobales/Permisos";

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    
    return context;
};

export const AuthContextProvider = ({children})=>{
    const navigate = useNavigate();
    const location = useLocation();
    const redirecPath = location.state?.path || "/";

    const [user, setUser] = useState({
        userid:"",
        username:"",
        userpassword:"",
        permisos:[]
    });

    const createUserCookie = (usuario)=>{
        
        Cookies.set('userid',`${usuario.userid}`,{expires : 7});

    };
    const deleteUserCookie = ()=>{
        Cookies.remove('userid');
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
        let permission;

        if(usuario.descripcion == "ADMIN"){
            permission = PERMISOS.ADMIN
        }
        else if(usuario.descripcion == "CLIENTE"){
            permission = PERMISOS.CLIENTE
        }
        else{
            permission = PERMISOS.EMPLEADO
        }


        setUser({userid:usuario.userid,username:usuario.username,userpassword:usuario.userpassword,permisos:permission})
        createUserCookie(usuario);
        navigate(redirecPath,{replace:true});
    };
    const logout = () =>{
        setUser({userid:"",username:"",userpassword:"",permisos:[]});
        deleteUserCookie();
    };

    const getUser = async()=>{
        try {
            const id = Cookies.get('userid')
            if(id){
                const resp = await getUserUniqueRequest(id);
                let permission;

                if(resp.data[0].descripcion == "ADMIN"){
                    permission = PERMISOS.ADMIN
                }
                else if(resp.data[0].descripcion == "CLIENTE"){
                    permission = PERMISOS.CLIENTE
                }
                else{
                    permission = PERMISOS.EMPLEADO
                }
                setUser({userid:resp.data[0].userid,username:resp.data[0].username,userpassword:resp.data[0].userpassword,permisos:permission}) 
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=>{
        getUser();
    },[])

    return (
        <AuthContext.Provider value={{user,login,logout,register,log,reg}}>
            {children}
        </AuthContext.Provider>
    );
}