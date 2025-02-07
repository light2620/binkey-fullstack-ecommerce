import nodata from "../assets/noorder.webp"


export default function Nodata(){
    return (
        <div className="w-[300px] h-[81vh] container mx-auto">
            <img src={nodata} alt="" />
            <p className="text-center text-2xl">NO DATA</p>
        </div>
    )
}