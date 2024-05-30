import { useState, useEffect } from 'react';
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user's email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail'); // Remove the user's email
    navigate('/login');
  };

  return (
    <>
      <div className="bg-white max-h-[10%] flex justify-between lg:justify-end items-center p-5 shadow-lg sticky top-0 z-10">
        <FaBars onClick={() => setMenuVisible(!isMenuVisible)} size={24} className="lg:hidden" />
        <div className="flex gap-4 items-center">
          <p className="text-md font-bold text-black">{userEmail || 'Admin'}</p>
          <div className="relative">
            <FaUserCircle size={25} onClick={toggleDropdown} className="cursor-pointer" />
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Account</a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
  );
};

export default Navbar;
