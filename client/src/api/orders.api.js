import { axiosInstance } from "./axiosInstance";


const getAllOrderApi = async() => {
    try{
          const response = await axiosInstance.get("/api/order/get-orders");
          return response
    }catch(err){
        throw err
    }
}

const createCashOnDeliveryOrder = async(data) => {
    try{
           const response = await axiosInstance.post("/api/order/add-COD-order",data)
           return response
    }catch(err){
        throw err
    }
}

const onlinePaymentApi = async(data)=>{
    try{
       const response = await axiosInstance.post("/api/order/payment",data)
       return response
    }catch(err){
     throw err
    }
}

export {createCashOnDeliveryOrder,getAllOrderApi,onlinePaymentApi}