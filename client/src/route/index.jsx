import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import SearchPage from "../pages/search";
import Login from "../pages/login";
import Register from "../pages/registeration";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/verifyOtp";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import Category from "../pages/Category";
import Products from "../pages/Product";
import SubCategory from "../pages/SubCategory";
import UploadProducts from "../pages/UploadProducts";
import SubCategoryWithProducts from "../pages/SubCategoryWithProducts";
import ProductListingPage from "../pages/ProductListingPage";
import UserMenuMobile from "../components/useMenuMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Nodata from "../components/No-data";
import EmailVerify from "../pages/EmailVerification";
const router = createBrowserRouter([
    {
        path : '/',
        element : <App />,
        children : [
            {
                path : "/",
                element : <Home />
            },
            {
                path : "/search",
                element : <SearchPage />
            },
            {
                path : "/login",
                element : <Login />
            },
            {
                path : "/register",
                element : <Register />
            },
            {
                path : "/forgot-password",
                element : <ForgotPassword />
            },
            {
                path : "/verify-otp",
                element : <VerifyOtp />
            },
            {
                path : "/reset-password",
                element : <ResetPassword/>
            },
            {
                path : "/dashboard",
                element : <Dashboard />,
                children :[
                    {
                        path : "profile",
                        element : <Profile />
                    },
                    {
                        path : "orders",
                        element : <MyOrder />
                    },
                    {
                        path : "address",
                        element : <Address />
                    },
                    {
                        path : "category",
                        element :  <Category/>
                    },
                    {
                        path : "sub-category",
                        element :  <SubCategory/>
                    },
                    {
                        path : "products",
                        element :  <Products/>
                    },
                    {
                        path : "upload-products",
                        element :  <UploadProducts/>
                    }
                ]
            },
            {
                path:":category",
                children : [
                {
                        path : ":subcategory" ,
                        element : <SubCategoryWithProducts />

                }

                ]
            },
            {
                path:"product",
                children:[
                    {
                        path:":id",
                        element : <ProductListingPage />
                    }
                ]
            },
            {
                path : "mobilemenu",
                element : <UserMenuMobile />
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "no-data",
                element : <Nodata/>
            },
            {
                path : "verify-email",
            element : <EmailVerify />
        }
        ]
    }
])

export {router}