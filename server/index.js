import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
const app = express();
import { connectDB } from "./config/connectDB.js"
import { userRouter } from "./route/user.route.js"
import uploadRouter from "./route/upload.route.js"
import { categoryRouter } from "./route/categor.route.js"
import { subCategoryRouter } from "./route/subCategory.route.js"
import { productRouter } from "./route/product.route.js"
import { cartRouter } from "./route/cart.route.js"
import { addressRouter } from "./route/address.rout.js"
import { orderRouter } from "./route/order.route.js"

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT
app.get("/" ,(request,response)=>{
    return response.json({
        message : "server is running"
    })
})

app.use("/api/user",userRouter);
app.use("/api/file",uploadRouter)
app.use("/api/category",categoryRouter);
app.use("/api/sub-category",subCategoryRouter);
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",orderRouter)
connectDB().then(()=>{
    app.listen(PORT ,()=> {
        console.log("server is running " + PORT)
    })
})

