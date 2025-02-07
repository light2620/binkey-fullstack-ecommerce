import { imageUploadApi } from "../api/uploadImage.api"


const uploadImage = async(image)=>{
    try {
        
        const formData = new FormData()
        formData.append('image',image)

        const response = await imageUploadApi(formData);
        return response

    
    } catch (error) {
        return error
    }
}

export default uploadImage