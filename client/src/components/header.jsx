import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import { FaUserAlt } from "react-icons/fa";
import { useMobile } from "../hooks/useMobile.jsx";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import DropDownMenu from "./dropdown.jsx";
import CartModel from "./CartModel.jsx";
import UserMenuMobile from "./useMenuMobile.jsx";
export default function Header() {
  const [isMobile] = useMobile(800);
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const location = useLocation();
  const isSearch = location.pathname === "/search";
  const user = useSelector((state) => state.user);

  const cart = useSelector((state) => state.cart.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartModel,setCartModel] = useState(false);

  const navigate = useNavigate();
  function redirectToLoginPage(){
      navigate("/login")
  }
  useEffect(()=>{
      const total = cart.reduce((prev,curr) => {
       
        return prev + (curr.quantity * curr.productId.price)
      },0) 
  
      setTotalPrice(total);
     

  },[cart])

  return (
    <header className="flex flex-col bg-white items-center justify-center gap-2 lg:h-20 h-28 lg:shadow-md sticky top-0 z-50">

      {!(isSearch && isMobile) && (
        <div className="container mx-auto  flex items-center justify-between px-4">
          {/* logo section */}
          <Link to="/" className="h-full flex items-center">
            <img
              src={logo}
              alt="logo"
              width={170}
              height={60}
              className="hidden lg:block"
            />
            <img
              src={logo}
              alt="logo"
              width={120}
              height={60}
              className=" lg:hidden"
            />
          </Link>

          {/* searchbar  */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* profile and cart */}
          <div>
            <Link  to={( user._id) ? "/mobilemenu" : "/login"} className="lg:hidden text-neutral-800">
              <FaUserAlt size={26} />

            </Link>
            <div className="hidden lg:flex gap-5 items-center">
                 <div >
                  {user._id ? (
                     <div 
                     className="relative"
                     onClick={()=>{setIsMenuOpen(!isMenuOpen)}} >
                        <div className = "flex items-center ">
                            <div>Account</div>
                            <div>
                              {
                                isMenuOpen ? <IoMdArrowDropup size={26}/> : <IoMdArrowDropdown size={26}/>
                              }
                            </div>
                        </div>
                        <div className={`${isMenuOpen ? "block" : "hidden"} absolute right-1 top-8`}>
                          <DropDownMenu/>
                        </div>
                     </div>
                  ) : <div onClick={redirectToLoginPage} className="text-xl">Login</div>  }
                  
                  </div>
                 <div
                 onClick={()=>setCartModel(true)}
                 className="flex  items-center gap-2 bg-green-800 text-white px-3 py-2  font-semibold rounded cursor-pointer">
                   
                    <div className="animate-bounce ">
                   <BsCart4 size={26}/> 
                    </div>


                    {
                      cart.length > 0 ? (
                        <div className="font-semibold text-sm">
                          <p>{cart.length} Items</p>
                          <p>₹ {totalPrice}</p>
                        </div>
                      ) : 
                      
                      (
                        <div>
                    <p>My Cart</p>
                    </div>
                    
                      )
                    }
                    
                 </div>
                
             </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
      {cartModel && <CartModel close={()=>{setCartModel(false)}}/>
       }
       
    </header>
  );
}
