import { useSelector } from "react-redux";
import noOrder from "../assets/noorder.webp";
export default function MyOrder() {
  const orders = useSelector((state) => state.order.orders);
  console.log(orders)
  return (
    <>
      <section className="min-h-[79vh]">
        <div className="p-3 text-xl font-bold shadow text-neutral-800">
          Order
        </div>
        <div className="w-full ">
          {orders.length > 0 ? (
            <div>

            </div>
          ) : (
            <div className="h-[200px] text-center text-2xl  font-extralight mt-10">
              <img
                src={noOrder}
                alt="no orders"
                className=" w-full h-full object-scale-down"
              />
              <p>No Data</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
