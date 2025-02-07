import { useEffect, useState } from "react"
import AddSubCategoryModel from "../components/AddSubCategoryModel"
import Table from "../components/Table";
import {createColumnHelper} from "@tanstack/react-table"
import { HiPencil } from "react-icons/hi2";
 import { useSelector } from "react-redux";
 import { MdDelete } from "react-icons/md";
import DeleteModel from "../components/CategoryDeleteModel";
import { deleteSubCategoryApi } from "../api/subCategory.api";
import toast from "react-hot-toast";
import { fetchSubCategory } from "../utils/fetchSubCategory";
import { useDispatch } from "react-redux";
import { setSubCategory } from "../redux/product.Slice";
export default function SubCategory(){
  const [showModel,setShowModel] = useState(false);
  const [deleteSubCategoryModel,setDeleteSubCategoryModel] = useState(false);
  const [deleteSubCategory,setDeleteSubCategory] = useState({});
  const [index,setIndex] = useState(0);
  const columnHelper = createColumnHelper()
  const column = [
    columnHelper.accessor('name',{
      header : "Name"
    }),
    columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        
        return <div className='flex justify-center items-center'>
            <img 
                src={row.original.image}
                alt={row.original.name}
                className='w-12 h-12'
                     
            />
        </div>
      }
    }),
    columnHelper.accessor("category",{
       header : "Category",
       cell : ({row})=>{
        return(
          <>
            {
              row.original.category.map((c,index)=>{
                return(
                  <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
       }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell : ({row})=>{
        return(
          <div className='flex items-center justify-center gap-3'>
              {/* <button onClick={()=>{
             
              }} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
                  <HiPencil size={20}/>
              </button> */}
              <button onClick={()=>{
                setDeleteSubCategoryModel(true)
                setDeleteSubCategory(row.original)
              }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
                  <MdDelete  size={20}/>
              </button>
          </div>
        )
      }
    })
  ]
  const dispatch = useDispatch();


  
  const data = useSelector((state) => state.product.subCategory);
    async function deleteCategory(index){
           const id = deleteSubCategory._id
           
           console.log(id);
           try{
                const response = await deleteSubCategoryApi({id})
                if(response.data.success){
                  toast.success(response.data.message);
                }
                setDeleteSubCategoryModel(false);
                fetchSubCategory(dispatch,setSubCategory);
                console.log(response);
           }catch(err){
            console.log(err)
           }
    }
      

    return <>
    <section className="flex flex-col gap-2 overflow-auto">
      
      <div className= "flex p-2 shadow justify-between">
        <div>
          <p className="text-lg font-semibold">Sub-Category</p>
        </div>
        <button 
         onClick={()=> setShowModel(!showModel)}
        className=" hover:bg-amber-300 cursor-pointer px-2 py-1 rounded bg-[#ffbb00] text-white font-semibold shadow">Add Sub-Category</button>
      </div>
      <div className = "lg:w-full w-100px">
        <Table 
         data ={data}
         column={column}
        />
      </div>
      
    
    {showModel &&< AddSubCategoryModel  closeModel = {()=>{setShowModel(!showModel)}} />}
    </section>
    {deleteSubCategoryModel && <DeleteModel
     index = {index}
     close = {()=>{setDeleteSubCategoryModel(!deleteSubCategoryModel)}}
     deleteCategory = {deleteCategory}
    />}
    </>
}