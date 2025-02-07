import { request } from "express";
import ProductModel from "../Model/product.model.js";


const uploadProductController = async(request,response)=>{
       try{
            const {name,image,category,subCategory,unit,stock,price,description,discount} = request.body


            if(!name || !image || !category || !subCategory || !unit || !price || !description){
                return response.json({
                    message : "Name, Image, Category, SubCategory, Unit, Price Or Description are required",
                    success : false,
                    error : true
                })
            }

            if(price <= 0){
                return response.json({
                    message : "price must be greater than 0",
                    error : true,
                    success :false
                })
            }
           const product = new ProductModel({
            name,image,category,subCategory,unit,stock,price,description,discount
           })

           await product.save()

           return response.json({
               message : "product created success fully",
               error : false,
               success : true
           })





       }catch(err){
        return response.json({
            message : err.message || err,
            error : true,
            success : false
        })
       }
}

const getProductController = async(request,response)=>{
    try{ 
      
        const products = await ProductModel.find({}).populate('category subCategory')
        return response.json({
            message : "fetch successfull",
            success : true,
            error : false,
            data : products
        })
       
        


    }catch(err){
        return response.json({
            message : err.message || error,
            error : true,
            success : false
        })
    }
}


const deleteProductController = async(request,response) =>{
    try{
         const {id} = request.body;
         if(!id){
            return response.json({
                message : "no id provided",
                error : false,
                success : true
            })
         }

         const product = await ProductModel.findByIdAndDelete({_id : id});
         return response.json({
            message : "product deleted",
            success : true,
            error : false
         })
    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error: true,
            success : false
        })
    }
}


export {uploadProductController,getProductController,deleteProductController}