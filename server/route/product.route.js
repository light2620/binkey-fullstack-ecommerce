import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { deleteProductController, getProductController, uploadProductController } from "../controllers/product.controller.js";
import { isAdmin } from "../middleware/admin.js";

const productRouter = Router();


productRouter.post("/add-product",[auth,isAdmin],uploadProductController)
productRouter.get("/get-all-products",getProductController);
productRouter.delete("/delete-product",[auth,isAdmin],deleteProductController)
export {productRouter}