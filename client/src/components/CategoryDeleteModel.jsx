
export default function DeleteModel({close,deleteCategory,index}){
    return (
        <section className = "fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center " style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}>
            <div className=" bg-white p-7 rounded shadow-2xl flex flex-col gap-4">
                 <div>
                    <p>Do you want to delete it permanently?</p>
                 </div>
                 <div className="flex justify-center gap-5">
                    <button 
                    onClick={close}
                    className="cursor-pointer hover:underline">
                        Cancel
                    </button>
                    <button
                    onClick={()=> deleteCategory(index)}
                    className="cursor-pointer hover:underline">
                        Delete
                    </button>
                 </div>
            </div>
        </section>
    )
}