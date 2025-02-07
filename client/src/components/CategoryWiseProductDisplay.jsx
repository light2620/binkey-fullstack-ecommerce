import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import ProductCardLoading from "./ProductCardLoading"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useRef } from "react";
import CardProduct from "./ProductCard";
import { valideURLConvert } from "../utils/validUrlConvert";

export default function CategoryWiseProductDisplay({key,category_id,category_name, allProducts}){
    const allSubCategories = useSelector((state) => state.product.subCategory);
    
   

   
    const categoryWiseProducts = allProducts.filter((item) => {
              return item.category[0]._id === category_id
    })
    const containerRef = useRef()
   

    const handleRedirectProductListpage = ()=>{
        const subcategory = allSubCategories.find(sub =>{
          const filterData = sub.category.some(c => {
            return c._id === category_id
          })
          console.log("filterData",filterData)
          
          return filterData ? true : null
        })
        console.log("subcategory",subcategory)
    
        const url = subcategory ? `/${valideURLConvert(category_name)}-${category_id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}` : "/no-data"
  
        return url
    }
    const redirectUrl = handleRedirectProductListpage();
    const productLoading = useSelector((state) => state.product.productLoading);
   
    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }
    return (
       <div className="m-auto  p-2 flex flex-col gap-5">
        <div className= "flex w-full  justify-between ">
            <h1 className='font-semibold text-gray-700 text-lg md:text-2xl'>{category_name}</h1>
            <Link to={redirectUrl} className='text-green-600 hover:text-green-400'>See All</Link>
        </div>
        <div className='relative flex items-center '>
           <div className="flex gap-4 md:gap-6 lg:gap-8  px-4 overflow-x-scroll hide-scrollbar" ref={containerRef}>
           {
            productLoading && new Array(10).fill(null).map(()=> <ProductCardLoading />  )
                
           }

           {
             categoryWiseProducts.map((p,index) =>{
                
                return <CardProduct data={p} />
            })
           }
           </div>
           
           
           
           
           <div className='w-full left-0 right-0  px-2 absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
        </div>


        </div>

       
        
       
       </div>
    )
}