import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import "../App.css"
export default function Footer(){
    return (
       <footer className = "border-t  ">
        <div className=" container mx-auto p-2 items-center flex flex-col gap-3 lg:flex-row px-10 justify-between">
           <p className = "text-center text-lg lg:text-base">
             © All Rights Reserved 2024.
           </p>
           <div className ="flex gap-3 text-lg lg:text-2xl justify-center">
            <div>
               <a href="" className ="hover:text-[#ffbb00]">
                 <BsInstagram />
                </a>
            </div>
            <div>
               <a href="" className = "hover:text-[#ffbb00]">
               <FaFacebook />
               </a>
            </div>
            <div>
               <a href="" className = "hover:text-[#ffbb00]">
               <IoLogoYoutube />
               </a>
            </div>


           </div>

        </div>
       </footer>
    )
}