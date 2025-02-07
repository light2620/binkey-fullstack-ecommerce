import { axiosInstance } from "./axiosInstance";


const addSubCategoryApi = async(data) => {
    try{
           const response = await axiosInstance.post("/api/sub-category/add-sub-category",data)
           return response
    }catch(err){
        throw err
    }
}

const getAllSubCategoryApi  = async() => {
    try{
          const response = await axiosInstance.get("/api/sub-category/get-sub-category")
          return response
    }catch(err){
        throw err
    }
}

const deleteSubCategoryApi = async(data) =>{
    try{
        const response = await axiosInstance.delete("/api/sub-category/delete-sub-category",{
            data : data
        })
        return response;
    }catch(err){
        throw err
    }
}

export {addSubCategoryApi,getAllSubCategoryApi,deleteSubCategoryApi}