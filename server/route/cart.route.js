import { Router } from "express";
import { addToCartController, getCartItemsController, removeItemFromCartController, updateCartController } from "../controllers/cart.controller.js";
import { auth } from "../middleware/auth.js";

const cartRouter = Router();

cartRouter.get("/get-cart-item",auth,getCartItemsController)
cartRouter.post("/add-to-cart",auth,addToCartController)
cartRouter.put("/update-cart",auth,updateCartController)
cartRouter.delete("/delete-item",auth,removeItemFromCartController)

export {cartRouter}