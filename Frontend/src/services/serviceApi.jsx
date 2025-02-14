const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
import axios from "axios";
const url = `${REACT_APP_API_URL}/api`;
export const Login =(data)=>{
    try {
        const response = axios.post(`${url}/auth/login`, data);
        if(response.data.success){
            return response.data
        }
        else{
            return {
                success:false,
                message:response.data.message}
        }
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}
export const Signup =(data)=>{
    try {
        const token = localStorage.getItem("token") ;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = axios.post(`${url}/auth/signup`, data,config);
        if(response.data.success){
            return response.data
        }
        else{
            return {
                success:false,
                message:response.data.message}
        }
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}
export const AddUser =(data)=>{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = axios.post(`${url}/user/adduser`, data,config);
        if(response.data.success){
            return response.data
        }
        else{
            return {
                success:false,
                message:response.data.message}
        }
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}
export const getAllUsers =(data)=>{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = axios.get(`${url}/user/getallusers`, data,config);
        if(response.data.success){
            return response.data
        }
        else{
            return {
                success:false,
                message:response.data.message}
        }
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}
