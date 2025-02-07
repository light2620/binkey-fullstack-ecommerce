import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteAddressApi } from "../api/address.api";
import toast from "react-hot-toast";
import { fetchAddress } from "../utils/fetchAddress";
import AddressModel from "../components/AddressModel";
import { useState } from "react";
export default function Address() {
  const addresses = useSelector((state) => state.address.addresses);
  const [addressModel , setAddAddressModel]  = useState(false)
  const dispatch = useDispatch()
  async function deleteAddress(id){
     try{ 
        console.log(id)
        const response = await deleteAddressApi({id})
        console.log(response)
        if(response.data.success){
            toast.success(response.data.message);
            fetchAddress(dispatch)
        }

     }catch(err){
        console.log(err)
     }
  }
 
  return (
    <>
      <section className="min-h-[79vh]">
        <div className="p-3 shadow flex justify-between ">
          <h1 className="text-xl text-semibold text-neutral-800 ">Address</h1>
          <button 
          onClick={()=> setAddAddressModel(!addressModel)}
          className="bg-[#ffbb00] text-white py-1 px-2 shadow rounded hover:bg-amber-500 cursor-pointer font-semibold">Add Address</button>
        </div>
        <div className=" w-full lg:flex lg:flex-wrap  md:flex md:flex-wrap gap-3 mt-2 ">
          {addresses.map((item, index) => {
            return (
              <div className="lg:w-[300px] md:w-[300px] w-full cursor-pointe shadow-lg p-3 relative ">
                <div>
                  <div>
                    <strong>Address line : </strong>
                    {item.address_line}{" "}
                  </div>
                  <div>
                    <strong>City : </strong>
                    {item.city}{" "}
                  </div>
                  <div>
                    <strong>State : </strong>
                    {item.state}
                  </div>
                  <div>
                    <strong>Pincode : </strong>
                    {item.pincode}{" "}
                  </div>
                  <div>
                    <strong>Country : </strong>
                    {item.country}{" "}
                  </div>
                  <div>
                    <strong>Mobile : </strong>
                    {item.mobile}{" "}
                  </div>
                </div>
                <div className="flex justify-end gap-3 absolute right-2 bottom-2">
                    <div 
                    onClick={()=> deleteAddress(item._id)}
                    className="cursor-pointer">
                    <MdDelete color="red" size={24} />
                    </div>
                    <div className="cursor-pointer">
                    <FaRegEdit color="green" size={24} />
                    </div>
                       
                     
                </div>
              </div>
            );
          })}
        </div>
       {addressModel && <AddressModel close={()=> setAddAddressModel(!addressModel)} /> } 
      </section>
    </>
  );
}
