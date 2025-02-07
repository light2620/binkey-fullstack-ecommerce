import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { CashOnDeliveryOrderController, getOrdersController, onlinePaymentOrderController } from "../controllers/order.controller.js";


const orderRouter = Router();

orderRouter.post("/add-COD-order",auth,CashOnDeliveryOrderController)
orderRouter.post("/payment",auth,onlinePaymentOrderController)
orderRouter.get("/get-orders",auth,getOrdersController)


export {orderRouter}