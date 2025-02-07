import { axiosInstance } from "./axiosInstance";


const createProductApi = async(data)=>{
    try{
        const response = await axiosInstance.post("/api/product/add-product",data);
        console.log(response)
        return response ;
    }catch(err){
        throw err
    }
}

const getAllProductsApi = async()=>{
    try{
          const response = await axiosInstance.get("/api/product/get-all-products");
          return response;
    }catch(err){
        throw err
    }
}
const deleteProductApi = async(data)=>{
    try{
       const response = await axiosInstance.delete("/api/product/delete-product",{
        data : data
       })
       return response
    }catch(err){
        throw err
    }
}
export {createProductApi,getAllProductsApi,deleteProductApi}