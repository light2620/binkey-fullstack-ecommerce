import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addAddressController, deletAddressController, getAllAddressController } from "../controllers/address.controler.js";

const addressRouter = Router();


addressRouter.post("/add-address",auth,addAddressController )
addressRouter.get("/get-address",auth,getAllAddressController)
addressRouter.delete("/delete-address",auth,deletAddressController)
export {addressRouter}