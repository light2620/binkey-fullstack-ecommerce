import SubCategoryModel from "../Model/subCategory.model.js";


const addSubCategoryController = async( request,response)=>{
          try{
              
            const {name ,image ,category} = request.body
            if(!name || !image || !category[0]){
                return response.json({
                    message : "Name , image or category is missing",
                    error : true,
                    success : false
                })
            }
            const subCategory = new SubCategoryModel({name,image,category});
            await subCategory.save()

            return response.json({
                message : `${name} created successfully`,
                error: false,
                success : true
            })

          }catch(err){
            return response.json({
                message : err.message || err,
                error :true,
                success : false
            })
          }
}

const getAllSubCategoryController = async(request,response) => {
     try{
            const subCategories = await SubCategoryModel.find({}).populate("category");
            return response.json({
                message : "successfully fetched",
                success : true,
                error : false,
                data : subCategories
            })
     }catch(err){
        return response.json({
            message : err.message || err,
            error :true,
            success : false
        })
     }
}

const deleteSubCategoryController = async(request,response) => {
       try{  
        
             const {id }= request.body
            
            
             if(!id){
                return response.json({
                    message : "no id provided",
                    error : true,
                    success :false
                })
             }
            
             const subCategory = await SubCategoryModel.findByIdAndDelete({_id : id});
             return response.json({
                message : "deleted",
                success : true,
                error : false
             })



       }catch(err){
         return response.json({
            message : err.message || err,
            error : true,
            success : false
         })
       }
}
export {addSubCategoryController,getAllSubCategoryController,deleteSubCategoryController}