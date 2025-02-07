import { useSelector,useDispatch } from "react-redux";
import {  useState } from "react";
import DeleteModel from "../components/CategoryDeleteModel";
import { setProducts } from "../redux/product.Slice";
import { deleteProductApi } from "../api/product.api";
import { fetchAllProducts } from "../utils/getAllProducts";
import toast from "react-hot-toast";
export default function Products(){

  const [pageNo,setPageNo] = useState(1);
  const [pageSize,setPageSize] = useState(12);
  const [deleteModel,setDeleteModel] = useState(false);

  const [delteIndex ,setDeleteIndex] = useState(-1);
  let allProducts = useSelector((state) => state.product.products);
  console.log(allProducts)
   const dispatch = useDispatch();
  async function deletProduct(index){
       try{ 
           const product = allProducts.find((_,i)=> i === index);
           console.log(product);
           const response = await deleteProductApi({id : product._id});
           console.log(response);
           if(response.data.success){
             toast.success(response.data.message);
             fetchAllProducts(dispatch,setProducts);
             setDeleteModel(!deleteModel)
           }


       }catch(err){
        console.log(err)
       }
  
      }
      const startIndex = (pageNo - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);
  
    return <>
    <section className= "flex flex-col gap-3">
      <div className = "shadow p-3 font-semibold text-lg">Products</div>
      {
        allProducts.length === 0 ? "no products" : (<div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 justify-items-center ">
          {
            paginatedProducts.map((product,index)=>{
              return <div key={product._id} className=" w-[160px] flex flex-col py-2  shadow">
                <div className="">
                  <img 
                  className="w-full h-full"
                  src={product.image[0]} alt="" />
                </div>
                <div className="w-full h-12 line-clamp-2 text-center">
                  {product.name}
                </div>        
                 <div className = "flex justify-between text-gray-500">
                  <p>
                    unit: {product?.unit}
                  </p>
                  <p>
                    price: {product?.price}
                  </p>
                 </div>
                 <div className="flex justify-center gap-3 mt-1">
                 <div className="px-2 bg-green-900 text-white shadow ">Edit</div>
                 <div onClick={()=>{
                  setDeleteModel(!deleteModel)
                  setDeleteIndex(index)
                }}
                 className="bg-red-500 px-2 text-white shadow">Delete</div>
                 </div>
              </div>
            })
          }
        </div>

        )
      }
      <hr className="mb-2"/>
      {
             allProducts.lenght  > 0 && 
             <div className="flex justify-center  gap-6" >
               <div 
               onClick={() => {
                 if(pageNo > 1) {
                   setPageNo((prev) => prev-1);
                 }
       
             }}
               className="bg-[#ffbb00]  text-white px-2 py-1 font-semibold shadow hover:bg-amber-300">
                   Previous          
               </div>
               <div>
                 {`${pageNo}/${Math.ceil(allProducts.length/pageSize)}`}
               </div>
               <div 
               onClick={() => {
                   if(pageNo < Math.ceil(allProducts.length/pageSize)){
                     setPageNo((prev) => prev+1);
                   }
       
               }}
               className="bg-[#ffbb00]  text-white px-2 py-1 font-semibold shadow hover:bg-amber-300">
                 Next
               </div>
             </div>
      }
      
      
      {deleteModel && <DeleteModel 
       close = {() => {setDeleteModel(!deleteModel)}}
       index = {delteIndex}
       deleteCategory={deletProduct}
      />}
    </section>
    </>
}