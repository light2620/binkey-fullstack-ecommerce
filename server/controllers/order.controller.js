import OrderModel from "../Model/order.model.js";
import UserModel from "../Model/user.model.js";
import CartProductModel from "../Model/cartproduct.model.js";
import mongoose from "mongoose";
import Stripe from "../config/stripe.js"
const CashOnDeliveryOrderController = async(request,response) => {
    try{
        const userId = request.userId
        const {item_list,totalAmt,delivery_address,subTotalAmt} = request.body;
        

         const orders = {
                item_list : item_list,
                userId : userId,
                orderId  : `ORD-${new mongoose.Types.ObjectId()}`,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : delivery_address,
                subTotalAmt : subTotalAmt,
                totalAmt : totalAmt

            }

            console.log(orders)
      

         const generatedOrder = new  OrderModel(orders);
         await generatedOrder.save();
         const removeCartItem = await CartProductModel.deleteMany({userId : userId})
         const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

         return response.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })
    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

const getOrdersController = async(request,response) => {
    try{
        const userId = request.userId;
        if(!userId){
            return response.json({
                message : "You haven't login.Please Login first",
                error : true,
                success : false
            })
        }

        const orders = await OrderModel.find({userId : userId})
        
        return response.json({
            message : "order fetch successfully",
            success : true,
            error : false,
            data : orders
        })

    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


const onlinePaymentOrderController = async(request,response) => { 
    try{
          
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 
        const user = await UserModel.findById(userId)
        console.log(list_items)
        const line_items = list_items.map((item) => {
            return {
                price_data : {
                     currency : 'inr',
                     product_data : {
                         name : item.productId.name,
                         images : item.productId.image,
                         metadata : {
                             productId : item.productId._id
                         }
                     },
                     unit_amount : item.productId.price*100
                },
                adjustable_quantity : {
                     enabled : true,
                     minimum : 1
                },
                quantity : item.quantity 
             }
        })
        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            customer_email : user.email,
            metadata : {
                userId : userId,
                addressId : addressId
            },
            line_items : line_items,
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await Stripe.checkout.sessions.create(params)
        return response.status(200).json(session)
             
    }catch(err){
        return response.json({
            message : err.message || err,
            error : false,
            success : true
        })
    }
}


export {CashOnDeliveryOrderController,getOrdersController,onlinePaymentOrderController}