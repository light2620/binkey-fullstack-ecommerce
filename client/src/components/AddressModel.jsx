import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { addAddressApi } from "../api/address.api";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchAddress } from "../utils/fetchAddress";

export default function AddressModel({close}){
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
    const [address,setAddress] = useState({
        address_line : "",
        city : "",
        state : "",
        pincode : "",
        country : "",
        mobile : ""

    })
 function handleChange(e){
     const {name,value} = e.target
     setAddress((prev) => {
        return {
            ...prev,
            [name] : value
        }
     })
     console.log(address)
 }
 const handleKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'Tab', 'Enter', 'Delete']; // Control keys
    if (allowedKeys.includes(e.key) || // Allow control keys
        (e.key >= '0' && e.key <= '9') // Allow numbers
    ) {
      return; // Let the event propagate (allow input)
    } else {
        e.preventDefault(); // Prevent other characters
    }
  };

  async function addAddress(){
       try{
             const response = await addAddressApi({...address,userId : user._id})
             if(response.data.success){
              toast.success("address added successfully");
              setAddress({
                address_line : "",
                city : "",
                state : "",
                pincode : "",
                country : "",
                mobile : ""
        
            })
            close()
            fetchAddress(dispatch)
             }
       }catch(err){
        console.log(err)
       }
  }
    return <>
          <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50 p-2 lg:p-0" style={{backgroundColor: 'rgba(31, 41, 55, 0.6)' }}>
            <div className="w-[500px] bg-white p-5 flex flex-col gap-6 rounded">
                <div className="flex w-full justify-between">
                    <h1 
                    className="text-lg font-semibold text-neutral-800">Add Address</h1>
                    <div  onClick={close} className="cursor-pointer hover:text-red-500">

                    <IoCloseSharp size={24}/>
                    </div>
                </div>
                <div className="flex gap-2 flex-col">
                   
                          <div className="text-lg font-light flex flex-col gap-1 ">
                            <label htmlFor="address-line">Address Line : </label>
                            <input 
                            id="address-line"
                            name="address_line"
                            value = {address.address_line}
                            onChange={handleChange}
                            required
                            className="outline-none w-full border-2 border-gray-400 focus-within:border-amber-400 rounded p-2 bg-blue-100"
                            />
                          </div>
                          <div className="text-lg font-light flex flex-col gap-1 ">
                            <label htmlFor="city">City : </label>
                            <input 
                            id="city"
                            value = {address.city}
                            name="city"
                            onChange={handleChange}
                            required
                            className="outline-none w-full border-2 border-gray-400 focus-within:border-amber-400 rounded p-2 bg-blue-100"
                            />
                          </div>
                          <div className="text-lg font-light flex flex-col gap-1 ">
                            <label htmlFor="state">State : </label>
                            <input 
                            id="state"
                            value = {address.state}
                            name="state"
                            required
                            onChange={handleChange}
                            className="outline-none w-full border-2 border-gray-400 focus-within:border-amber-400 rounded p-2 bg-blue-100"
                            />
                          </div>
                          <div className="text-lg font-light flex flex-col gap-1 ">
                            <label htmlFor="pincode">Pincode : </label>
                            <input 
                            id="pincode"
                            type="text"
                            value = {address.pincode}
                            maxLength={6}
                            name="pincode"
                            required
                           onKeyDown={handleKeyDown} 
                            max={1}
                            onChange={handleChange}
                            className="outline-none w-full border-2 border-gray-400 focus-within:border-amber-400 rounded p-2 bg-blue-100"
                            />
                          </div>
                          <div className="text-lg font-light flex flex-col gap-1 ">
                            <label htmlFor="country">Country : </label>
                            <input 
                            id="country"
                            value = {address.country}
                            name="country"
                            required
                            onChange={handleChange}
                            className="outline-none w-full border-2 border-gray-400 focus-within:border-amber-400 rounded p-2 bg-blue-100"
                            />
                          </div>
                          <div className="text-lg font-light flex flex-col gap-1">
                            <label htmlFor="mobile">Mobile : </label>
                            <input 
                            id="mobile"
                            value = {address.mobile}
                            name="mobile"
                            onKeyDown={handleKeyDown} 
                            required
                            onChange={handleChange}
                            className="outline-none w-full border-2 border-gray-400 focus-within:border-amber-400 rounded p-2 bg-blue-100"
                            />
                          </div>

                </div>
                <button 
                onClick={addAddress}
                className="w-full bg-yellow-400 text-neutral-800 text-xl font-semibold py-2">
                   Add Address
                </button>
            </div>
          </div>
    </>
}