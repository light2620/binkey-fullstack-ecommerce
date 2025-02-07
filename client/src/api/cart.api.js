import { axiosInstance } from "./axiosInstance";


const getCartItemApi = async() => {
    try{
          const response = await axiosInstance.get("/api/cart/get-cart-item");
          return response
    }catch(err){
        throw err
    }
}

const addToCartApi = async(data) => {
     try{
        const response = await axiosInstance.post("/api/cart/add-to-cart",data)
        return response
     }catch(err){
        throw err
     }
}
const updateCartApi = async(data) => {
    try{
          const response = await axiosInstance.put("/api/cart/update-cart",data);
          return response
    }catch(err){
        throw err
    }
}


const deleteItemFromCartApi = async(data) => {
    try{
         const response = await axiosInstance.delete("/api/cart/delete-item",{data: data})
         return response
    }catch(err){
        throw err
    }
}
export {getCartItemApi,addToCartApi,updateCartApi,deleteItemFromCartApi}