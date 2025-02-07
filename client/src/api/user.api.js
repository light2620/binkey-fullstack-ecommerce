import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const userRegisterApi = async(data) => {
   try{
        const response = await axiosInstance.post("/api/user/register",data);
        return response;
   }catch(err){
        throw err
   }
} 

const userLoginApi = async(data) => {
     try{
         const response = await axiosInstance.post("/api/user/login",data)
         return response;
     }catch(err){
          throw err
     }
}

const forgotPasswordApi = async(data) => {
     try{
          const response = await axiosInstance.put("/api/user/forgot-password",data);
          return response
     }catch(err){
          throw err
     }
}

const verifyOtpApi = async(data) => {
     try{
          const response = await axiosInstance.post("/api/user/verify-otp",data);
          return response;
     }catch(err){
          throw err
     }
}

const resetPasswordApi = async(data) =>{
     try{
         const response = await axiosInstance.put("/api/user/reset-password",data)
         return response
     }catch(err){
          throw err
     }
}

const getUserDetailsApi = async() => {
     try{
         const response = await axiosInstance.get("/api/user/user");
         return response
     }catch(err){
          throw err
     }
}

const userLogoutApi = async(data)=>{
     try{ 
           const response = await axiosInstance.post("/api/user/logout",data)
           console.log(response)
           return response
     }catch(err){
          throw err
     }
}

const userUpdateApi = async(data) => {
     try{
             const response = await axiosInstance.put("/api/user/user-update",data);
             return response
     }catch(err){
          throw err
     }
}


export {userUpdateApi,userRegisterApi,userLoginApi,forgotPasswordApi,verifyOtpApi,resetPasswordApi,getUserDetailsApi,userLogoutApi}