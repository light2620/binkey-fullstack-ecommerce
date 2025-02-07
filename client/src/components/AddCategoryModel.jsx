import { useState } from "react"
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/product.Slice";
import uploadImage from "../utils/uploadImage";
import { addCategoryApi } from "../api/category.api";
import toast from "react-hot-toast";
import { fetchCategory } from "../utils/fetchCategory";
export default function AddCategoryModel({close}){

    const [data, setData] = useState({
        title : "",
        image : ""
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    function handleChange(e){
        const {name,value} = e.target
        setData({
            ...data,
            [name] : value
        })
        console.log(data)
    }
    async function handleFileUpload(e){
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file)
        if(!file){
            return 
        }
        try{
            setLoading(true)
            const response = await uploadImage(file);
            setLoading(false)
            console.log(response.data.data.url)
            setData({
                ...data,
                image : response.data.data.url
            })
        }catch(err){
            console.log(err)
        }
        
    }

    async function addCategory(data){
        try{
             const response = await addCategoryApi(data)
             console.log(response)
             if(response.data.error) {
                toast.error(response.data.message);
             }
             if(response.data.success){
                toast.success(response.data.message);
                setData({
                    title : "",
                    image : ""
                })
                fetchCategory(dispatch,setCategory)
                close();
             }
        }catch(err){
    
            console.log(err)
        }
    }
    return (
        <section className = "fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center px-2 " style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}>
                <div className="bg-white max-w-xl w-full p-4 flex flex-col gap-4 shadow-2xl rounded">
                    <div className = "flex">
                    <h1 className ="text-2xl font-bold text-[#00b005] mx-auto ">Add Category</h1>
                    <div onClick={close} className="cursor-pointer">
                            <RxCross2 size={22}/>

                        </div>
                    </div>
                    <div className = "flex flex-col gap-2">
                        <label htmlFor="categoryName">Category Name</label>
                        <input
                        id ="categoryname"
                        name="title"
                        value = {data.title} 
                        onChange={handleChange}
                        className="outline-none border-2 rounded w-full focus-within:border-amber-400 p-1"
                        type="text" />
                    </div>


                    <div className="flex items-center gap-2">

                     <div className="w-[150px] h-[150px] bg-gray-300 flex items-center justify-center text-white text-2xl">
                           {data.image ? <img className="w-full h-full object-scale-down" src={data.image} alt={data.title}/ > : "Image"}  
                     </div>


                     <div className = "bg-[#ffbb00] p-2 py-1 text-white font-semibold rounded">
                        <label htmlFor="categoryImage">{loading ? "Loading...." : "Upload Image"}</label>
                         <input 
                         id="categoryImage"
                         className="hidden"
                         onChange={handleFileUpload}
                         name="file"
                         type="file" />
                     </div>
                    </div>
                        {data.title && data.image && 
                        <button 
                        onClick={()=>{addCategory(data)}}
                        className="bg-green-900 hover:bg-green-800 text-white py-1 font-bold text-2xl rounded">
                        Add Category
                        </button>}
                   
                     
                </div>    
        </section>
    )
}