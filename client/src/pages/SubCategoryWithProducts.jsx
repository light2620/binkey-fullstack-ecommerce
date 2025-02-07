import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { Link } from "react-router-dom";
import CardProduct from "../components/ProductCard";
import { valideURLConvert } from "../utils/validUrlConvert";
export default function SubCategoryWithProducts(){
    const allSubCategories = useSelector((state) => state.product.subCategory)
    const allProducts = useSelector((state) => state.product.products)

    const params = useParams();
    
    const categoryId = params.category?.split("-").slice(-1)[0];

    const subCategory = params.subcategory?.split("-")
   
    const subCategory_id = subCategory?.slice(-1)[0];

    const subCategory_name = subCategory?.slice(0,subCategory.length-1).join(" ")
    const data = allProducts.filter(item => {
        return item.subCategory.some((item) => item._id === subCategory_id )
    })
   
    const [selection,setSelection] = useState(0);
    const subCategoriesForThisCategory = allSubCategories.filter((sub) => {
        return sub.category.some((item) => item._id === categoryId);
    })

   function displayProducts(index){
         setSelection(index)
   }

  
    return ( 
     <section className='flex bg-blue-100' >
        <div className="flex  min-h-[85vh] max-h-[85vh] overflow-auto flex-col max-w-[100px] lg:max-w-[300px] ">
           {
            subCategoriesForThisCategory.map((item,index) => {
           
                return <Link
                to={`/${valideURLConvert(item.category[0]?.name)}-${categoryId}/${valideURLConvert(item.name)}-${item._id}`}
                onClick={()=> displayProducts(index)} 
                className={`flex flex-col lg:flex-row gap-2  items-center  border-1 border-gray-400 p-1 ${selection === index ? "bg-blue-100" : "bg-white"}`}>
                    <div className=" max-w-12">
                        <img 
                        src={item.image} alt={item.name} 
                        className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                    <p className="text-lg font-semibold text-gray-700 text-center lg:text-left">{item.name}</p>
                    </div>
                </Link>
            })
           }
        </div>
        <div className="w-full min-h-[85vh] max-h-[85vh] overflow-y-auto">
            <div className="bg-white shadow p-2 w-full text-xl font-semibold">
                <h1>{subCategory_name}</h1>
            </div>
            <div className="grid  lg:grid-cols-4 lg:gap-2 p-4">
                {
                    data.map((item)=> {
                        return <CardProduct data={item}/>
                    })
                }
            </div>

        </div>
        </section>

)
}





