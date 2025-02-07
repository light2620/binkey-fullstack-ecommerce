import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addSubCategoryController, deleteSubCategoryController, getAllSubCategoryController } from "../controllers/subCategory.Controller.js";
import { isAdmin } from "../middleware/admin.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/add-sub-category",[auth,isAdmin],addSubCategoryController)
subCategoryRouter.get("/get-sub-category",getAllSubCategoryController)
subCategoryRouter.delete("/delete-sub-category",[auth,isAdmin],deleteSubCategoryController);
export {subCategoryRouter}