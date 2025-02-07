import AddCategoryModel from "../components/AddCategoryModel";
import { useState } from "react";
import DeleteModel from "../components/CategoryDeleteModel";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/product.Slice";
import { fetchCategory } from "../utils/fetchCategory";
import { deleteCategoryApi } from "../api/category.api";
export default function Category() {
  const [showModel, setShowModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteIndex ,setDeleteIndex] = useState(null);
  const allCategory = useSelector((state) => state.product.category);
  const dispatch = useDispatch();
  function closeCategoryModel() {
    setShowModel(!showModel);
  }
  function closeDeleteModel() {
    setDeleteModel(!deleteModel);
  }
  async function deleteCategory(deleteIndex) {
           const category = allCategory[deleteIndex];
           console.log(deleteIndex)
           console.log(category)
           const id = category._id;
           try{
               const response = await deleteCategoryApi({id});
               if(response.data.error){
                toast.error(response.data.message);
               }
               if(response.data.success){
                toast.success(response.data.message);
                setDeleteModel(!deleteModel)
                fetchCategory(dispatch,setCategory);
               }
           }catch(err){
               console.log(err)
           }
  }
  return (
    <>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between  p-2 shadow">
          <div>
            <p className="text-lg font-semibold">Category</p>
          </div>
          <button
            onClick={() => {
              setShowModel(!showModel);
            }}
            className="bg-[#ffbb00] cursor-pointer text-white rounded p-2 py-1 font-semibold hover:bg-yellow-400 shadow"
          >
            Add Category
          </button>
        </div>
        {showModel && (
          <div>
            <AddCategoryModel close={closeCategoryModel} />
          </div>
        )}
        <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 justify-items-center">
          {allCategory.map((item, index) => {
            return (
              <div className="w-32 h-56 rounded shadow-md py-2 px-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full  object-scale-down"
                />

                <div className="items-center h-9 flex gap-2">
                  {/* <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded">
                    Edit
                  </button> */}
                  <button 
                  onClick={()=> {
                    setDeleteModel(!deleteModel)
                    setDeleteIndex(index);
                }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {deleteModel && <DeleteModel close={closeDeleteModel} deleteCategory = {deleteCategory} index = {deleteIndex} />}
      </section>
    </>
  );
}
