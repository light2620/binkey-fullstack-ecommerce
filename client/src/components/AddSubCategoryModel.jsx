import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import uploadImage from "../utils/uploadImage";
import { addSubCategoryApi } from "../api/subCategory.api";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function AddSubCategoryModel({ closeModel }) {
    const [data, setData] = useState({
        name: "",
        image: "",
        category: []
    });
    const [loading, setLoading] = useState(false);
    const [selectCategory, setSelectCategory] = useState("");

    const allCategory = useSelector((state) => state.product.category);

    function addCategories(e) {
        const id = e.target.value;
        if (!id) return;

        const category = allCategory.find(el => el._id === id);
        if (!category) return;

        setData(prevData => ({
            ...prevData,
            category: [...prevData.category, category]
        }));

        setSelectCategory(""); // Reset dropdown after selection
    }

    function removeFromCategorySelection(index) {
        setData(prevData => ({
            ...prevData,
            category: prevData.category.filter((_, i) => i !== index)
        }));
    }

    async function handleFileUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];

        if (!file) return;

        try {
            setLoading(true);
            const response = await uploadImage(file);
            setLoading(false);

            setData(prevData => ({
                ...prevData,
                image: response.data.data.url
            }));
        } catch (err) {
            console.log(err);
        }
    }

    async function addSubCategory() {
        try {
            const response = await addSubCategoryApi(data);
            if (response.data.success) {
                toast.success(response.data.message);
                setData({ name: "", image: "", category: [] });
                closeModel();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center" style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}>
            <div className="bg-white w-[600px] gap-3 p-3">
                <div onClick={closeModel} className="w-[22px] cursor-pointer ml-auto">
                    <IoIosCloseCircleOutline size={24} />
                </div>

                <div className="flex flex-col p-2 gap-1">
                    <label className="w-[80px]" htmlFor="sub-category">Name</label>
                    <input
                        className="outline-none border focus-within:border-amber-400 rounded p-2 bg-blue-100"
                        value={data.name}
                        onChange={(e) => setData(prevData => ({ ...prevData, name: e.target.value }))}
                        type="text"
                        name="name"
                        id="sub-category"
                    />
                </div>

                <div className="flex items-center ml-2 gap-4">
                    <div className="bg-blue-100 w-36 h-36 flex items-center justify-center text-2xl font-light">
                        {data.image ? <img className="w-full h-full object-scale-down" src={data.image} alt={data.name} /> : "Image"}
                    </div>
                    <label htmlFor="image-file" className="bg-[#ffbb00] text-white p-1 px-2 rounded font-semibold text-lg">
                        {loading ? "Uploading...." : "Upload Image"}
                    </label>
                    <input onChange={handleFileUpload} type="file" id="image-file" className="hidden" />
                </div>

                <div className="flex flex-wrap gap-1 my-3">
                    {data.category.map((item, index) => (
                        <div key={item._id} className="flex gap-2 border-amber-400 border rounded px-2">
                            <span>{item.name}</span>
                            <p onClick={() => removeFromCategorySelection(index)} className="cursor-pointer">x</p>
                        </div>
                    ))}
                </div>

                <div>
                    <select
                        value={selectCategory}
                        onChange={addCategories}
                        className="w-full outline-none border rounded p-1 focus-within:border-[#ffbb00]"
                    >
                        <option value="" disabled>Select a category</option>
                        {allCategory.map((item) => {
                            const isAlreadySelected = data.category.some((el) => el._id === item._id);
                            return (
                                <option key={item._id} value={item._id} disabled={isAlreadySelected}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {data.category.length !== 0 && data.name && data.image && (
                    <button onClick={addSubCategory} className="bg-green-900 py-2 text-lg w-full mt-4 text-white rounded">
                        Add Sub-Category
                    </button>
                )}
            </div>
        </div>
    );
}
