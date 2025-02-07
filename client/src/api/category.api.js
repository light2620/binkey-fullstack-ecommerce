import { axiosInstance } from "./axiosInstance";



const addCategoryApi = async(data) => {
    try{
       const response = await axiosInstance.post("/api/category/add-category",data);
    
       return response;
    }catch(err){
    
        throw err;
    }
}

const getAllCategoryApi = async()=>{
    try{
        const response = await axiosInstance.get("/api/category/get-categories")
        return response
    }catch(err){
        throw err
    }
}

const deleteCategoryApi = async (data) => {
    try {
        console.log(data);
        const response = await axiosInstance.delete("/api/category/delete-category", {
            data: data, 
        });
        return response;
    } catch (err) {
        throw err;
    }
};

export {addCategoryApi,getAllCategoryApi,deleteCategoryApi}