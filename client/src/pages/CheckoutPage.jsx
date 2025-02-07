import { useEffect, useState } from "react"
import AddressModel from "../components/AddressModel"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginFirst from "./LoginPleasePage";
import { createCashOnDeliveryOrder, onlinePaymentApi } from "../api/orders.api";
import { fetchCart } from "../utils/fetchCart";
import toast from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js'

export default function CheckoutPage(){
    const [addAddressModel ,setAddAddressModel] = useState(false);
    const totalQty = useSelector((state) => state.cart.totalQty);
    const userId = useSelector((state) => state.user._id)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.address.addresses);
    const [selectedAddress , setSelectedAddress] = useState(0);
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart)
    function closeModel(){
        setAddAddressModel(!addAddressModel)
    }
    async function handleCashOnDelivery(){
        if(cart.length === 0) {
            toast.error("Add something in cart first");
            navigate("/")
            return 
        }
         try{
             const response = await createCashOnDeliveryOrder({
                item_list : cart,
                totalAmt : totalPrice,
                subTotalAmt : totalPrice,
                delivery_address : addresses[selectedAddress]._id
                 
             })
             if(response.data.success){
                toast.success(response.data.message)
                fetchCart(dispatch);
                navigate("/")
             }
         }catch(err){
            console.log(err)
         }
    }

    async function handleOnlinePayment(){
        try{
           toast.loading("loading...")
           const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
           const stripePromise = await loadStripe(stripePublicKey);
            const response = await onlinePaymentApi({
                list_items : cart,
                totalAmt : totalPrice,
                subTotalAmt : totalPrice,
                addressId : addresses[selectedAddress]._id
                 
             })
             console.log(response);
             const data =response.data
             stripePromise.redirectToCheckout({sessionId : data.id});
        }catch(err){
            console.log(err)
        }
    }
    if(!userId){
        return <LoginFirst />
    }
    console.log(selectedAddress)
    return <>
   <section className="bg-blue-100 w-full gap-4 lg:gap-0 md:gap-0 flex md:flex-row lg:flex-row flex-col justify-between p-2">
    <div className="lg:w-[64%] md:w-[64%] w-full p-2 bg-white flex flex-col gap-2 rounded">
        <div className="text-2xl text-neutral-800 font-semibold">Choose Address</div>
        <div className="w-full flex flex-col  gap-2 ">
       {
        addresses.map((item,index) => {
            return  <label   className="flex gap-3 items-start cursor-pointe border p-2 "> 
             <input 
             id="address" 
             name="address" 
             type="radio" 
             value={index}
             checked={selectedAddress === index} // Ensure default selection
             onChange={(e) => setSelectedAddress(Number(e.target.value))} 
             className="self-start mt-2" />
             <div>
              <div><strong>Address line : </strong>{item.address_line} </div>
              <div><strong>City : </strong>{item.city} </div>
              <div><strong>State : </strong>{item.state}</div>
              <div><strong>Pincode : </strong>{item.pincode} </div>
              <div><strong>Country : </strong>{item.country} </div>
              <div><strong>Mobile : </strong>{item.mobile} </div>
              </div>
              </label>
         
        })
       }
        </div>
         
         <div 
         onClick={closeModel}
         className="border-dashed border-2 border-neutral-800 flex items-center text-xl justify-center py-5 cursor-pointer bg-blue-100">
                 Add Address
         </div>
    </div>

    <div className="lg:w-[34%] md:w-[34%]  w-full self-center rounded bg-white p-2">
         <h1 className='text-2xl font-bold'>Summary</h1>
         <div className=" w-full rounded p-4 ">
                    <h1 className="font-bold text-2xl text-zinc-800">Bill  details</h1>
                    <div className="flex justify-between font-light text-lg">
                        <p>Items total</p>
                        <p>{totalPrice}</p>
                    </div>
                    <div className="flex justify-between font-light text-lg">
                        <p>Quantity total</p>
                        <p>{totalQty}</p>
                    </div>
                    <div className="flex justify-between font-light text-lg">
                        <p>Delviery Charge</p>
                        <p>Free</p>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-zinc-800">
                        <p>Grand total</p>
                        <p>{totalPrice}</p>
                    </div>
                    
            </div>
            <div className="flex flex-col gap-4">
               {/* <button 
                onClick={handleOnlinePayment}
                className="w-full py-2 text-xl font-semibold bg-green-700 text-white rounded">Online Payment</button> */}
                 <button
                onClick={handleCashOnDelivery}
                className="w-full py-2 text-lg text-green-700 font-bold border-2 border-green-700 hover:bg-green-700 hover:text-white">Cash On Delivery</button>
            </div>
     </div>

   </section>
    {addAddressModel && <AddressModel close={closeModel}/> } 
    </>
}