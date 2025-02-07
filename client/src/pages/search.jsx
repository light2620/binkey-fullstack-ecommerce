import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CardProduct from "../components/ProductCard";

export default function SearchPage() {
  const params = useLocation();
  const searchText = params?.search?.slice(3)?.toLowerCase(); // Extract and convert search text to lowercase
  const allProducts = useSelector((state) => state.product.products);

  // Filter products based on search text
  const filteredProducts = allProducts.filter((p) => 
    p?.name.toLowerCase().includes(searchText) || p?.description.toLowerCase().includes(searchText) // Case-insensitive search
  );

  return (
    <section className="h-[86vh] container mx-auto  p-1 flex flex-col gap-3">
      <div className=" shadow p-2 flex justify-between font-bold text-lg">
        
        <p >
        Search
        </p>
        <p>
            Total Search Item: {filteredProducts.length}
        </p>
        </div>

      {/* Show message if no products are found */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found</div>
      ) : (
        <div className="grid lg:grid-cols-6 grid-cols-2 gap-y-2 md:grid-cols-4 justify-items-center items-center overflow-y-scroll hide-scrollbar">
          {filteredProducts.map((p, index) => (
            <CardProduct key={p._id} data={p} />
          ))}
        </div>
      )}
    </section>
  );
}
