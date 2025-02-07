import { request } from "express";
import CategoryModel from "../Model/categor.model.js";

const addCategoryController = async (request, response) => {
    try {
        const { title, image } = request.body;

        // Validate input
        if (!title || !image) {
            return response.json({
                message: "Image or title is missing",
                error: true,
                success: false
            });
        }

        const titleForCheck = title.toLowerCase();

        // Case-insensitive check for existing category
        const existingCategory = await CategoryModel.findOne(
            { name: titleForCheck },
            { collation: { locale: "en", strength: 2 } } // Case-insensitive search
        );

        if (existingCategory) {
            return response.json({
                message: "Category already exists with this name",
                error: true,
                success: false
            });
        }

        // Create and save category
        const newCategory = new CategoryModel({ name: titleForCheck, image: image });
        const savedCategory = await newCategory.save();

        return response.json({
            message: "Category created successfully",
            success: true,
            error: false,
            data: savedCategory
        });

    } catch (error) {
        console.error("Error creating category:", error);
        return response.status(500).json({
            message: "Internal Server Error",
            error: true,
            success: false
        });
    }
};

const getAllCategoryController = async (request ,response) => {
    try{
        const categories = await CategoryModel.find({});
        console.log(categories);
        if(!categories){
            return response.json({
                message : "nothing in category",
                success : true,
                error : false
            })
        }

        return response.json({
             message : "category Fetched",
             success : true,
             error : false,
             data : categories
        })

    }catch(err){
        return response.json({
            message : "something went wrong",
            error : true,
            success : false
        })
    }
}

const deleteCategoryController = async(request,response) => {
      try{
        console.log("body", request.body)
        const {id} = request.body;
        console.log(id);
        if(!id){
            return response.json({
                message : "please provide category id",
                success : false,
                error : true
            })
        }
        const category = await CategoryModel.findByIdAndDelete({_id : id});
        return response.json({message : "deleted",success : true, error: false});

      }catch(err){
        return response.json({
            message : err.message || err,
            error : true,
            success : false
        })
      }
}
export { addCategoryController,getAllCategoryController,deleteCategoryController };
