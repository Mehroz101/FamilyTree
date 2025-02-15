const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
import axios from "axios";
const url = `${REACT_APP_API_URL}/api`;
export const Login =async (data)=>{
    try {
        const response = await axios.post(`${url}/auth/login`, data);
        if(response.data.success){
            console.log(response.data)
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
            message:error.response.data.message
        }
    }
}
export const Signup =async (data)=>{
    try {
        const token = localStorage.getItem("familytree") ;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response =await axios.post(`${url}/auth/signup`, data,config);
        console.log(response.data)
        if(response.data.success){
            console.log("success")
            return response.data
        }
        else{
            return {
                success:false,
                message:response.data.message}
        }
    } catch (error) {
        console.log(error.message)
        return {
            success:false,
            message:error.response.data.message
        }
    }
}
export const AddNewUser =async (data)=>{
    try {
        const token = localStorage.getItem("familytree") ;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await axios.post(`${url}/user/adduser`, data,config);
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
            message:error.response.data.message
        }
    }
}
export const getAllUsers =async (data)=>{
    try {
        const token = localStorage.getItem("familytree") ;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response =await axios.get(`${url}/user/getallusers`,config);
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
            message:error.response.data.message
        }
    }
}
export const getUserDropdown =async (data)=>{
    try {
        const token = localStorage.getItem("familytree") ;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        console.log(config)
        const response =await axios.get(`${url}/user/getuserdropdown`,config);
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
            message:error.response.data.message
        }
    }
}
