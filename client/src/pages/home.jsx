import { useMobile } from "../hooks/useMobile"
import banner from "../assets/banner.jpg"
import bannerMobile from "../assets/banner-mobile.jpg"
import { useSelector } from "react-redux";

import { valideURLConvert } from "../utils/validUrlConvert";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import { Link } from "react-router-dom";
export default function Home(){

 
 const categoryLoading = useSelector((state) => state.product.categoryLoading);
 const allCategory = useSelector((state) => state.product.category);
 const allProducts = useSelector((state) => state.product.products);
 console.log(allProducts)
 const allSubCategories = useSelector((state) => state.product.subCategory)
 

 const handleRedirectProductListpage = (category_id,category_name)=>{
  const subcategory = allSubCategories.find(sub =>{
    const filterData = sub.category.some(c => {
      return c._id === category_id
    })

    return filterData ? true : null
  })

  const url = subcategory ?  `/${valideURLConvert(category_name)}-${category_id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}` : '/no-data'

  return url
}

// const categoryToDisplay = allCategory.filter((category) =>  {
//   return allProducts.some((item) => item.category.some((c) => c._id === category._id))
// })


    return <>
     <section>
        <div className = "m-auto w-full">
            <div className= {`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse"}`}>
                 <img 
                 src={banner} 
                 alt="banner"
                 className="w-full h-full hidden lg:block"
                  />
                   <img 
                 src={bannerMobile} 
                 alt="bannerMobile"
                 className="w-full h-full lg:hidden"
                  />
            </div>

        </div>

        {/* category show section */}
        <div className="px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2">
            {
               !categoryLoading ?
                (new Array(20).fill(null).map((c,index)=> {

                return (
                    <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                      <div className='bg-blue-100 min-h-24 rounded'></div>
                      <div className='bg-blue-100 h-8 rounded'></div>
                    </div>
                  )
            }))
               : 
               (
                allCategory.map((c,index) => {
                        
                        const redirectUrl =  handleRedirectProductListpage(c._id,c.name)
                    return (
                    <Link to={redirectUrl}
                   
                    key={c._id+" displayCategory"} 
                    className='w-full h-full'>
                      <div className='bg-blue-100 min-h-24 rounded'>
                      <img 
                          src={c.image}
                          className='w-full h-full object-scale-down'
                        />
                      </div>
                    </Link>
                    )
                })


               )

            

            }
            
              
        </div>
        {/* category show section */}
          
       {
        allCategory.map((c,index) => {
            return (
                <CategoryWiseProductDisplay 
                  key={index + c?._id}
                  allProducts = {allProducts}
                  category_id = {c?._id}
                  category_name = {c?.name}
                />
            )
        })
       }
       
     </section>
    </>
}

