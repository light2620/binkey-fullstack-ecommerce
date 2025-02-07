import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchAllProducts } from "../utils/getAllProducts";
import { useEffect, useState } from "react";
import { setProducts } from "../redux/product.Slice";
import { useDispatch } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"
import image3 from "../assets/image3.png"
import AddToCartButton from "../components/AddToCartButton";
export default function ProductListingPage(){
     const params = useParams();
     const productId = params.id;
     const [imageIndex, setImageIndex] = useState(0);
     const dispatch = useDispatch(); 
     const allProducts = useSelector((state) => state.product.products)

     const product = allProducts.find((p) => p._id === productId);
   
    useEffect(()=>{
        fetchAllProducts(dispatch,setProducts)
    },[params])
    if(allProducts.length === 0){
       return <div className="bg-red">Loading....</div>
    }
    
    return (

        <section className=" p-4 grid lg:grid-cols-2 bg-blue-100  ">
          <div className="">
               <div className="bg-white lg:min-h-[65vh]  lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
                <img 
                className="w-full h-full object-scale-down"
                src={product.image[imageIndex]} alt="" />
            </div>

              <div className="flex items-center justify-center gap-3 my-2" >
                {product.image.map((item,index)=> {
                    return <div 
                    onClick={()=> setImageIndex(index)}
                    className="w-3 h-3 lg:w-5 lg:h-5 rounded-full bg-slate-300 cursor-pointer"></div>
                })}
              </div>

              <div className="grid relative">
                <div className="flex gap-4 z-10 relative w-full overflow-x-auto hide-scrollbar">
                {product.image.map((item,index)=> {
                    return <div 
                    onClick={()=> setImageIndex(index)}
                    className="w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md">
                        <img  src={item} alt="min-product" className="w-full h-full object-scale-down" />
                    </div>
                })}
                </div>
                <div className="w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center">
                    <button className="z-10 bg-white relative p-1 rounded-full shadow-lg"><FaAngleLeft /></button>
                    <button className="z-10 bg-white relative p-1 rounded-full shadow-lg"><FaAngleRight/></button>
                </div>
              </div>
              <div></div>
              <div className="my-4  hidden lg:grid gap-3 ">
                <div>
                    <p className="font-semibold">Description</p>
                    <p className="font-light">{product.description}</p>
                </div>
                <div>
                    <p className="font-semibold">Unit</p>
                    <p className="font-light">{product.unit}</p>
                </div>
            </div>
          </div>
            
        
            



          <div className="p-4 lg:pl-7 text-base lg:text-lg">
              <p className="bg-green-300 w-fit px-2 rounded-full"></p>
              <h1 className="text-lg font-semibold lg:text-3xl">{product.name}</h1>
              <p>{product.unit}</p>
              <div className="p-[0.5px] bg-slate-200 my-2"></div>
              <div>
                <p>Price</p>
                <div className="flex items-center gap-2 lg:gap-4">
                    <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
                        <p className="font-semibold text-lg lg:text-xl">₹{product.price}</p>
                    </div>

                </div>
              </div>
              <div className="my-4">
                 <div className="w-full max-w-[150px]">
                    {/* <button className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded">Add</button> */}
                    <AddToCartButton data ={product}/>
                 </div>
              </div>
              <h2>Why Shop From Binkeyit?</h2>
              <div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image1}
                        alt='superfast delivery'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Superfast Delivery</div>
                        <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image2}
                        alt='Best prices offers'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Best Prices & Offers</div>
                        <p>Best price destination with offers directly from the nanufacturers.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src={image3}
                        alt='Wide Assortment'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Wide Assortment</div>
                        <p>Choose from 5000+ products across food personal care, household & other categories.</p>
                      </div>
                  </div>
            </div>

            <div className='my-4 grid gap-3 lg:hidden '>
                <div>
                    <p className='font-semibold'>Description</p>
                    <p className='text-base'>{product.description}</p>
                </div>
                <div>
                    <p className='font-semibold'>Unit</p>
                    <p className='text-base'>{product.unit}</p>
                </div>
            </div>
          </div>
          
         

        </section>
    )
}



