import { Outlet } from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "./redux/userSlice"
import { fetchUserDetails } from "./utils/fetchUserDetails"
import { fetchCategory } from "./utils/fetchCategory"
import { setCategory, setProducts, setSubCategory } from "./redux/product.Slice"
import { fetchSubCategory } from "./utils/fetchSubCategory"
import { fetchAllProducts } from "./utils/getAllProducts"
import { fetchCart } from "./utils/fetchCart"
import { fetchAddress } from "./utils/fetchAddress"
import { setTotalPrice,setTotalQty } from "./redux/cartSlice"
import { fetchOrder } from "./utils/fetchOrders"
function App() {
    const dispatch = useDispatch();
     const cart = useSelector((state)=> state.cart.cart)
   
   useEffect(()=>{
          fetchUserDetails(dispatch,setUser);
          fetchCategory(dispatch,setCategory);
          fetchSubCategory(dispatch,setSubCategory);
          fetchAllProducts(dispatch,setProducts);
          fetchCart(dispatch);
          fetchAddress(dispatch)
          fetchOrder(dispatch)
    },[])

   useEffect(()=>{
    if(cart.length > 0){
      const qty = cart.reduce((prev,curr) =>{
      return prev + curr?.quantity
     },0);

     const price =cart.reduce((prev,curr) => { 
      return prev + (curr.quantity * curr.productId.price)},0)
      dispatch(setTotalPrice(price));
      dispatch(setTotalQty(qty));
     }
   })

  return<>
  <Header />
    <main className = "min-h-[80vh">
      <Outlet />
    </main>
    <Footer />
    <Toaster/>
  </>
}

export default App
