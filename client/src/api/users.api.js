import axios from "axios";

export const getUsersRequest = async()=>{
    return await axios.get(`http://localhost:4000/users`);
};

export const getUserRequest = async(name,passw)=>{
    return await axios.get(`http://localhost:4000/users/${name}/${passw}`);
};

export const postUserRequest = async(values)=>{
    return await axios.post(`http://localhost:4000/users`,values);
};

export const updUserRequest = async(id,values)=>{
    return await axios.put(`http://localhost:4000/users/${id}`,values);
};

export const dltUserRequest = async(id)=>{
    return await axios.delete(`http://localhost:4000/users/${id}`);
};

export const getUserNameRequest = async(name)=>{
    return await axios.get(`http://localhost:4000/users/${name}`);
};

export const getUserUniqueRequest = async(id)=>{
    return await axios.get(`http://localhost:4000/users/${id}`)
}