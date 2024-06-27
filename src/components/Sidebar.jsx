import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TbReport } from "react-icons/tb";
import { PiMapPinLine } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const router = useNavigate();

  const handleClick = (state) => {
    console.log(state);
    if (state == 1) {
      router('/devices')
    } else if (state == 2) {
      router('/reports')
    } else if (state == 3) {
      router('/maps')
    }

  };

  return (
    <div className="hidden bg-indigo-950 lg:flex lg:flex-col lg:justify-evenly lg:content-center lg:gap-4 lg:items-center lg:p-4 lg:pt-2 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
      {/* <h1 className="text-[17px] font-bold text-white mt-3 mb-5">SMART WATER METER</h1> */}
      <img className="h-[7%]" src="/Antares IoT.png" alt="" />
      <div className="p-8 rounded-[50px] h-full w-full flex flex-col gap-4 text-indigo-50">
        <button
          onClick={() => handleClick(1)}
          className="bg-indigo-900 rounded-full p-4 flex gap-5 hover:bg-indigo-700 hover:scale-105 duration-500 items-center"
        >
          <HiMiniDevicePhoneMobile size={20} />
          <h1 className="text-white text-sm font-bold">ALL DEVICE</h1>
        </button>
        <button
          onClick={() => handleClick(2)}
          className="bg-indigo-900 rounded-full p-4 flex gap-5 hover:bg-indigo-700 hover:scale-105 duration-500 items-center"
        >
          <TbReport size={20} />
          <h1 className="text-white text-sm font-bold">REPORT</h1>
        </button>
        <button
          onClick={() => handleClick(3)}
          className="bg-indigo-900 rounded-full p-4 flex gap-5 hover:bg-indigo-700 hover:scale-105 duration-500 items-center"
        >
          <PiMapPinLine size={20} />
          <h1 className="text-white text-sm font-bold">MAPS</h1>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
