import { axiosInstance } from "./axiosInstance";


const getAllAddressApi = async(data) => {
    try{
          const response = await axiosInstance.get("/api/address/get-address",data);
          return response
    }catch(err){
        throw err
    }
}

const addAddressApi = async(data) => {
    try{
          const response = await axiosInstance.post("/api/address/add-address",data)
          return response
    }catch(err){
        throw err
    }
}

const deleteAddressApi = async(data) => {
    try{ 
          console.log(data)
          const response = await axiosInstance.delete("/api/address/delete-address",{data : data})
          return response
    }catch(err){
        throw err
    }
}


export {addAddressApi,getAllAddressApi,deleteAddressApi}