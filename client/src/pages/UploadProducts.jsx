import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/uploadImage";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { createProductApi } from '../api/product.api';
import toast from "react-hot-toast";



const UploadProduct = () => {
  const [data,setData] = useState({
      name : "",
      image : [],
      category : [],
      subCategory : [],
      unit : "",
      stock : "",
      price : "",
      discount : "",
      description : "",

  })

  const [imageLoading,setImageLoading] = useState(false)
  const [selectCategory,setSelectCategory] = useState("");
  const [selectSubCategory,setSelectSubCategory] = useState("");
  const allCategory = useSelector((state) => state.product.category);
  const allSubCategory = useSelector((state) => state.product.subCategory)

function handleChange(e){
    const {name,value} = e.target;
    setData((prev) => {return {...prev,[name] : value}});

}

async function handleUploadImage(e){
  e.preventDefault();
  const file = e.target.files[0];
  console.log(file)
  if(!file){
      return 
  }
  try{
      setImageLoading(true)
      const response = await uploadImage(file);
      setImageLoading(false)
      console.log(response.data.data.url)
      setData((prev) => {
        return {
          ...prev,image : [...prev.image,response.data.data.url]
        }
      })
  }catch(err){
      console.log(err)
  }
  
}

function handleDeleteImage(index){
    const newData = data.image.filter((_,i) => i !== index);
    setData({
      ...data,image : newData
    })
}

async function handleSubmit(e){
  e.preventDefault();
       try{
         const response = await createProductApi(data)
         if(response.data.success){
          toast.success(response.data.message);
          setData({
            name : "",
            image : [],
            category : [],
            subCategory : [],
            unit : "",
            stock : "",
            price : "",
            discount : "",
            description : "",
      
        })
         }

       }catch(err){
        console.log(err)
       }
}

function handleRemoveCategory(index){
      const newData = data.category.filter((c,i) => i !== index);
      
      setData((prev) => {
                 return {
                    ...prev,
                    category : newData
                 }
      })
}

function handleRemoveSubCategory(index){
    const newData = data.subCategory.filter((sc,i)=> i !== index);
    setData((prev)=> {
        return {
            ...prev,
            subCategory : newData
        }
    })
}
  return (
    <section className=''>
        <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Upload Product</h2>
        </div>
        <div className='grid p-3'>
            <form className='grid gap-4' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                  <label htmlFor='name' className='font-medium'>Name</label>
                  <input 
                    id='name'
                    type='text'
                    placeholder='Enter product name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>
                <div className='grid gap-1'>
                  <label htmlFor='description' className='font-medium'>Description</label>
                  <textarea 
                    id='description'
                    type='text'
                    placeholder='Enter product description'
                    name='description'
                    value={data.description}
                    onChange={handleChange}
                    required
                    multiple 
                    rows={3}
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
                  />
                </div>
                <div>
                    <p className='font-medium'>Image</p>
                    <div>
                      <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                          <div className='text-center flex justify-center items-center flex-col'>
                            {
                              imageLoading ?  "Uploading" : (
                                <>
                                   <FaCloudUploadAlt size={35}/>
                                   <p>Upload Image</p>
                                </>
                              )
                            }
                          </div>
                          <input 
                            type='file'
                            id='productImage'
                            className='hidden'
                            accept='image/*'
                            onChange={handleUploadImage}
                          />
                      </label>
                      {/**display uploded image*/}
                      <div className='flex flex-wrap gap-4'>
                        {
                          data.image.map((img,index) =>{
                              return(
                                <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                                  <img
                                    src={img}
                                    alt={img}
                                    className='w-full h-full object-scale-down cursor-pointer' 
                                  />
                                  <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                                    <MdDelete/>
                                  </div>
                                </div>
                              )
                          })
                        }
                      </div>
                    </div>

                </div>

                {/* category selection part */}
                <div className='grid gap-1'>
                  <label className='font-medium'>Category</label>
                  <div>
                    <select
                      className='bg-blue-50 border w-full p-2 rounded'
                      value={selectCategory}
                      onChange={(e)=>{
                        const value = e.target.value 
                        const category = allCategory.find((el) => el._id === value);
                        setData((preve)=>{
                            return{
                              ...preve,
                              category : [...preve.category,category],
                            }
                          })
                          setSelectCategory("")
                      }}


                    >
                      <option value={""}>Select Category</option>
                      {
                        allCategory.map((category,index)=> {
                           return <option value={category._id}>{category.name}</option>
                        })
                      }
                    </select>
                    <div className='flex flex-wrap gap-3'>
                      {
                        data.category.map((c,index)=>{
                          return(
                            <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                              <p>{c.name}</p>
                              <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveCategory(index)}>
                                <IoClose size={20}/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                {/* category selection part */}

                {/* subcategory selection part */}
                <div className='grid gap-1'>
                  <label className='font-medium'>Sub Category</label>
                  <div>
                    <select
                      className='bg-blue-50 border w-full p-2 rounded'
                      value={selectSubCategory}
                      onChange={(e)=>{
                        const value = e.target.value 
                        const subCategory = allSubCategory.find(el => el._id === value)
                        setData((prev) => {
                            return {...prev,subCategory : [...prev.subCategory,subCategory]}
                        })
                      }}
                    >
                      <option value={""} className='text-neutral-600'>Select Sub Category</option>
                     {
                        allSubCategory.map((subCategory,index) => {
                            return <option value={subCategory._id}>{subCategory.name}</option>
                        })
                     }
                    </select>
                    <div className='flex flex-wrap gap-3'>
                      {
                        data.subCategory.map((c,index)=>{
                          return(
                            <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                              <p>{c.name}</p>
                              <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveSubCategory(index)}>
                                <IoClose size={20}/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                {/* subcategory selection part */}



                <div className='grid gap-1'>
                  <label htmlFor='unit' className='font-medium'>Unit</label>
                  <input 
                    id='unit'
                    type='text'
                    placeholder='Enter product unit'
                    name='unit'
                    value={data.unit}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>

                <div className='grid gap-1'>
                  <label htmlFor='stock' className='font-medium'>Number of Stock</label>
                  <input 
                    id='stock'
                    type='number'
                    placeholder='Enter product stock'
                    name='stock'
                    value={data.stock}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>

                <div className='grid gap-1'>
                  <label htmlFor='price' className='font-medium'>Price</label>
                  <input 
                    id='price'
                    type='number'
                    placeholder='Enter product price'
                    name='price'
                    value={data.price}
                    onChange={handleChange}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>

                <div className='grid gap-1'>
                  <label htmlFor='discount' className='font-medium'>Discount</label>
                  <input 
                    id='discount'
                    type='number'
                    placeholder='Enter product discount'
                    name='discount'
                    value={data.discount}
                    onChange={handleChange}
              
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>
                <button
                
                  className='bg-[#ffc929] hover:bg-primary-200 py-2 rounded font-semibold'
                >
                  Submit
                </button>
            </form>
        </div>


    </section>
  )
}

export default UploadProduct