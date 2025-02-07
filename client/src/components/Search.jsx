import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";


export default function Search(){
    
    const [isSearchPage,setIsSearchPage] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(()=>{
        const isSearch = location.pathname === '/search'
          setIsSearchPage(isSearch);
         
    },[location])
    function redirectToSearch(){
        navigate("/search")
    }
    function redirectToHomePage(){
        navigate("/")
    }
    function handleSearch(e){
       const value = e.target.value
       const url = `/search?q=${value}`
       navigate(url);
    }
    return (
      <div 
      className="flex items-center w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border-solid border-2 overflow-hidden bg-gray-100 cursor-pointer group group focus-within:border-[#ffbf00]"
      
      >
        <div className="flex">
            {
                isSearchPage?(
                    <button 
                    
                    className="group-focus-within:text-[#ffbb00] cursor-pointer"
                    onClick={redirectToHomePage}
                    >
                    <IoArrowBackCircleSharp size={35}/>
                    </button>
                ):(
                    <button 
                    onClick={redirectToSearch}
                    className="flex justify-center item-center h-full p-3 text-neutral-700 group-focus-within:text-[#ffbb00]">
                    <FaSearch size={22} />
                  </button>
                )
            }
       
       
        </div>

        <div className="w-full h-full flex items-center" onClick={redirectToSearch} >
            {
                !isSearchPage ? (
                     <TypeAnimation
                                 
                                 sequence={[
                                   // Same substring at the start will only be typed out once, initially
                                   'Search "milk"',
                                   1000, // wait 1s before replacing "Mice" with "Hamsters"
                                   'Search "fruits"',
                                   1000,
                                   'Search "stationary"',
                                   1000,
                                   'Search "cloths"',
                                   1000,
                                 ]}
                                 wrapper="span"
                                                      speed={50}
                                
                                 repeat={Infinity}
                               />
                ): (
                  <div className = "w-full h-full">
                    <input 
                    type="text"
                    autoFocus
                    className="bg-transparent w-full h-full p-1 outline-none"
                    onChange={handleSearch}
                     />
                  </div>
                )
            }
          
        </div>
      </div>
    );
}