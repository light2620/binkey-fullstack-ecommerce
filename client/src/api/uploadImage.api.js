import { axiosInstance } from "./axiosInstance";


const imageUploadApi = async(data)=>{
        try{
          const response = await axiosInstance.post("/api/file/upload",data)
          console.log(response)
          return response
        }catch(err){
            throw err
        }
 }

 export {imageUploadApi}