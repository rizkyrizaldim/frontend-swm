import { useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuVisible, setMenuVisible] = useState(false)  
  return (
    <>
        <div className="bg-[#A8A1CD] h-[10%] rounded-[30px] flex justify-between lg:justify-end items-center p-5">
        <FaBars onClick={() => setMenuVisible(!isMenuVisible)} size={24} className="lg:hidden" />
            <div className="flex gap-4 items-center">
                <p className="text-[16px] font-bold text-black">USER</p>
                <img src="icon akun 1.png" alt="" />
            </div>
        </div>
        {isMenuVisible && (
                <div className="w-full h-screen bg-green-400 flex flex-col justify-start items-center text-xl font-bold">
                    <p>ALL Devices</p>
                    <p>Report</p>
                    <p>Map</p>
                </div>
        )}
    </>
  )
}

export default Navbar