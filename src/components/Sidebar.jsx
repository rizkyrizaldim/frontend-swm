import DeviceStatus from "./DeviceStatus"
import ReportPage from "./ReportPage"
import MapsPage from "./MapsPage"

const Sidebar = ({ setContent }) => {
  return (
    <div className="hidden bg-[#75D7BF] rounded-[30px] lg:flex lg:flex-col lg:justify-evenly lg:content-center lg:gap-2 lg:items-center lg:p-4">
        <h1 className="text-[17px] font-bold text-white mt-3 mb-5">SMART WATER METER</h1>
        <div className="bg-[#FFFBFB33] p-8 rounded-[50px] h-full w-full flex flex-col gap-4 text-indigo-50">
            <button onClick={() => setContent(<DeviceStatus/>)} className="bg-[#D9D9D999] rounded-full p-4 flex gap-5 hover:bg-[#837878] hover:scale-105 duration-500 items-center">
            <img src="device 1.svg" alt="" />
            <h1 className="text-[#2A959C] font-bold">ALL DEVICE</h1>
            </button>
            <button onClick={() => setContent(<ReportPage/>)} className="bg-[#D9D9D999] rounded-full p-4 flex gap-5 hover:bg-[#837878] hover:scale-105 duration-500 items-center">
            <img src="image 2.png" alt="" />
            <h1 className="text-[#2A959C] font-bold">REPORT</h1>
            </button>
            <button onClick={() => setContent(<MapsPage/>)} className="bg-[#D9D9D999] rounded-full p-4 flex gap-5 hover:bg-[#837878] hover:scale-105 duration-500 items-center">
            <img src="image 3.png" alt="" />
            <h1 className="text-[#2A959C] font-bold">MAPS</h1>
            </button>
        </div>
    </div>
  )
}

export default Sidebar