import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addCategoryController, deleteCategoryController, getAllCategoryController } from "../controllers/category.Controller.js";
import { isAdmin } from "../middleware/admin.js";


const categoryRouter = Router();

categoryRouter.post("/add-category",[auth,isAdmin],addCategoryController);
categoryRouter.get("/get-categories",getAllCategoryController);
categoryRouter.delete("/delete-category",[auth,isAdmin],deleteCategoryController)


export {categoryRouter}