import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import azeez from '../images/azeez.jpeg';
import profile from '../images/profile.png';
import { useProfile } from "../contextAPI/ProfileContext";
import { useNavigate } from "react-router-dom";

function TeacherDashHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const { logout } = useProfile();
    const navigate = useNavigate();
    const { user, loading, fetchUserDetails } = useProfile();

    // Logout function
    const handleLogout = async () => {
        await logout();
        navigate("/"); // Redirect to login page after logout
    };

    // Fetching user details
    useEffect(() => {
        if (!user) {
          fetchUserDetails();
        }
      }, [user, fetchUserDetails]);
    
      if (loading) {
        return <p>Loading user details...</p>;
      }
    
      if (!user) {
        return <p>No user found. Please log in.</p>;
      }

  return (
    <>
    <div className="w-full bg-[#ffffff] pt-[9px] pr-[50px] lg:pr-10 pb-[9px] pl-5 flex flex-row gap-0 items-center justify-start sticky top-0 z-[9999]" style={{ boxShadow: "0px 2px 20px 0px rgba(1, 41, 112, 0.1)" }}>

        {/* Logo section */}
        <div className="pt-2 pb-2 flex flex-row gap-2.5 items-center justify-start shrink-0 relative">
            <Link to="/" className="hidden lg:block shrink-0 w-[280px] h-[26px] relative">
                <div className="text-[#012970] text-left font-['Nunito-Bold',_sans-serif] text-[18px] md:text-[26px] leading-[26px] font-bold  w-[331.84px] h-[35px] flex items-center justify-start">
                  AttendSwift
                </div>
            </Link>
        </div>
        <div className="hidden lg:block shrink-0 w-[456px] h-[37px] relative">
            <div className="text-[#012970] text-center font-['Inter-Regular',_sans-serif] text-base leading-4 font-normal absolute left-[290px] top-[10.5px] flex items-center justify-center">
              {user.role} Role
            </div>
        </div>

        {/* Top Right Section */}
        <div className="pr-4 flex flex-row gap-[25px] items-center justify-end flex-1 relative ml-[-120px] md:ml-0">
            <button className="pt-[5.75px] pb-[5.25px] flex flex-row gap-0 items-start justify-start shrink-0 relative cursor-pointer">
                <i className='fa-regular fa-bell text-[24px]'></i>
                <div className="bg-[#0d6efd] rounded-md pt-[3px] pr-[5.88px] pb-[3px] pl-1.5 flex flex-row gap-0 items-start justify-start shrink-0 absolute right-[-22.88px] left-7 bottom-[18px] top-[-1px]" style={{transformOrigin: "0 0", transform: "rotate(0deg) scale(-1, 1)"}}></div>
            </button>
            <button className="pt-[5.75px] pb-[5.25px] flex flex-row gap-0 items-start justify-start shrink-0 relative cursor-pointer">
                <i class="fa-regular fa-message text-[24px]"></i>
                <div className="bg-[#198754] rounded-md pt-[3px] pr-[5.88px] pb-[3px] pl-1.5 flex flex-row gap-0 items-start justify-start shrink-0 absolute right-[-22.88px] left-7 bottom-[18px] top-[-1px]" style={{transformOrigin: "0 0", transform: "rotate(0deg) scale(-1, 1)"}} />
            </button>

            {/* User dropdown */}
            <button onClick={() => setIsOpen(!isOpen)} className="shrink-0 w-[137.58px] h-9 mr-[-20px] lg:mr-[-10px] relative cursor-pointer">
                <img 
                  src={user.profileImage || profile} 
                  alt="Profile" 
                  className='rounded-[18px] w-9 h-9 absolute left-0 top-[50%]' 
                  style={{ translate: "0 -50%", objectFit: "cover" }}/>
                <div
                    className="w-[141.58px] h-[21px] absolute left-9 top-[50%]"
                    style={{ translate: "0 -50%" }}>
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-sm leading-[21px] font-semibold absolute left-2 top-0 flex items-center justify-start">
                      {user.name} <i className='fa-solid fa-caret-down ml-[5px]'></i>
                    </div>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-[40px] right-[-20px] mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <Link
                  to="/app/teacher/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/app/teacher/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <div onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                  Logout
                </div>
              </div>
            )}
        </div>
    </div>

    </>
  )
}

export default TeacherDashHeader;