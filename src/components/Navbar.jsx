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
                <div className="w-full h-screen bg-[#75D7BF] rounded-[30px] flex flex-col justify-start items-center text-xl font-bold p-4 lg:hidden">
                  <h1 className="text-[17px] font-bold text-white mt-3 mb-5">SMART WATER METER</h1>
                  <div className='bg-[#FFFBFB33] p-8 rounded-[50px] h-full w-full flex flex-col gap-4 text-indigo-50'>
                    <button className='bg-[#D9D9D999] rounded-full p-4 flex gap-5 hover:bg-[#837878] hover:scale-105 duration-500 items-center'>
                      <img src="device 1.svg" alt="" />
                      <h1 className='text-[#2A959C] font-bold'>ALL DEVICE</h1>
                    </button>
                  </div>
                    
                </div>
        )}
    </>
  )
}

export default Navbar