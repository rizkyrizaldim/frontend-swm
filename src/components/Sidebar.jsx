import DeviceStatus from "./DeviceStatus"
import ReportPage from "./ReportPage"
import MapsPage from "./MapsPage"
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TbReport } from "react-icons/tb";
import { PiMapPinLine } from "react-icons/pi";


const Sidebar = ({ setContent }) => {
  return (
    <div className="hidden bg-indigo-950 lg:flex lg:flex-col lg:justify-evenly lg:content-center lg:gap-2 lg:items-center lg:p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <h1 className="text-[17px] font-bold text-white mt-3 mb-5">SMART WATER METER</h1>
        <div className="p-8 rounded-[50px] h-full w-full flex flex-col gap-4 text-indigo-50">
            <button onClick={() => setContent(<DeviceStatus/>)} className="bg-indigo-900 rounded-full p-4 flex gap-5 hover:bg-indigo-700 hover:scale-105 duration-500 items-center">
            <HiMiniDevicePhoneMobile size={20} />
            <h1 className="text-white text-sm font-bold">ALL DEVICE</h1>
            </button>
            <button onClick={() => setContent(<ReportPage/>)} className="bg-indigo-900 rounded-full p-4 flex gap-5 hover:bg-indigo-700 hover:scale-105 duration-500 items-center">
            <TbReport size={20} />
            <h1 className="text-white text-sm font-bold">REPORT</h1>
            </button>
            <button onClick={() => setContent(<MapsPage/>)} className="bg-indigo-900 rounded-full p-4 flex gap-5 hover:bg-indigo-700 hover:scale-105 duration-500 items-center">
            <PiMapPinLine size={20} />
            <h1 className="text-white text-sm font-bold">MAPS</h1>
            </button>
        </div>
    </div>
  )
}

export default Sidebar