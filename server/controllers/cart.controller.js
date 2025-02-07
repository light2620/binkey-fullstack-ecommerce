
import { request } from "express";
import CartProductModel from "../Model/cartproduct.model.js";

const getCartItemsController = async(request,response)=> {
    try{ 
        const id = request.userId
        if(!id){
            return response.json({
                message : "you are not login",
                error : true,
                success : false
            })
        }
        const cart = await CartProductModel.find({userId : id}).populate("productId")

        return response.json({
            message : "cart fetch successfull",
            success  : true,
            error : false,
            data : cart
        })
 
    }catch(err){
        return response.status(500).json({
            message : err || err.message ,
            error : true,
            success : false
        })
    }
}

const addToCartController = async(request,response) => {
    try{
        const userId = request.userId;
        const {quantity,productId} = request.body
        console.log(request.body);
        console.log("quantigy : " , quantity)
        console.log("productId : " , productId)

        if(!quantity || !productId){
            return response.json({
                message : "quanity or productId is not provided",
                success : false,
                error : true
            })
        } 
        const isAlreadyExistInCart = await CartProductModel.find({productId});
       
        if( isAlreadyExistInCart.length !== 0){
            return response.json({
                message : "item is already in cart",
                success : false,
                error : true
                })
            
           }
               
       
       

        const addItem = new CartProductModel({userId,quantity,productId})
        await addItem.save();
        return response.json({
            message : "Item added to cart",
            success : true,
            error : false
        })

    }catch(err){
        return response.status(500).json({
            message : err || err.message ,
            error : true,
            success : false
        })
    }
}

const updateCartController = async(request,response) =>{
    try{ 
        const {id,qty} = request.body;
        if(!id){
           return response.json({
            message : "no cart id is provided"
           }) 
        }


        const updateItem = await CartProductModel.findByIdAndUpdate({_id  : id},{quantity: qty})
        return response.json({
            message : "item added to cart",
            success : true,
            error : false
        })
        

        
 
    }catch(err){
        return response.json({
            message : message.err || err,
            success : false,
            error : true
        })
    }
}


const removeItemFromCartController = async(request,response) => {
    try{
          const {id} =request.body
          if(!id){
            return response.json({
                message : "please provide an id",
                error : true,
                success : false
            })
          }

          const deleteItem = await CartProductModel.findByIdAndDelete({_id : id});
          return response.json({
            message : "Item removed",
            success : true,
            error : false
          })
    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}






export {addToCartController,getCartItemsController,updateCartController,removeItemFromCartController}