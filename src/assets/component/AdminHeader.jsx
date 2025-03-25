import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import azeez from '../images/azeez.jpeg';
import profile from '../images/profile.png';
import { useProfile } from "../contextAPI/ProfileContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';

function AdminHeader() {
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
        return <LoadingSpinner />;
      }
    
      if (!user) {
        return <p>No user found. Please log in.</p>;
      }
    

    return (
        <div className="w-full bg-[#ffffff] pt-[9px] pr-6 lg:pr-6 pb-[9px] pl-5 flex flex-row gap-0 items-center justify-between sticky top-0 z-[9999]" style={{ boxShadow: "0px 2px 20px 0px rgba(1, 41, 112, 0.1)" }}>

            {/* Logo section */}
            <div className="pt-2 pb-2 flex flex-row gap-2.5 items-center justify-start shrink-0 relative lg:w-[30%]">
                <Link to="/" className="hidden lg:block shrink-0 w-[280px] h-[26px] relative">
                    <div className="text-[#012970] text-left font-['Nunito-Bold',_sans-serif] text-[18px] md:text-[26px] leading-[26px] font-bold">
                        AttendSwift
                    </div>
                </Link>
            </div>

            {/* User Role Display */}
            <div className="hidden lg:block shrink-0 lg:w-[30%] h-[37px] relative">
                <div className="text-[#012970] text-center text-base leading-4 font-normal mt-[10px]">
                    {user.role} Role
                </div>
            </div>

            {/* Top Right Section */}
            <div className="pr-4 flex flex-row gap-[25px] md:gap-[25px] items-center justify-end flex-1 relative lg:w-[30%] ml-[-120px]">
                <button className="pt-[5.75px] pb-[5.25px] flex flex-row gap-0 items-start justify-start shrink-0 relative cursor-pointer">
                    <i className='fa-regular fa-bell text-[24px]'></i>
                </button>
                <button className="pt-[5.75px] pb-[5.25px] flex flex-row gap-0 items-start justify-start shrink-0 relative cursor-pointer">
                    <i className="fa-regular fa-message text-[24px]"></i>
                </button>

                {/* User Dropdown */}
                <button onClick={() => setIsOpen(!isOpen)} className="shrink-0 w-[137.58px] h-9 relative cursor-pointer">
                    <img 
                    src={user.profileImage || profile} 
                    alt="Profile" 
                    className='rounded-[18px] w-9 h-9 absolute left-0 top-[50%]' 
                    style={{ translate: "0 -50%", objectFit: "cover" }} 
                    />
                    <div className="w-[141.58px] h-[21px] absolute left-9 top-[50%]" style={{ translate: "0 -50%" }}>
                        <div className="text-[#012970] text-left text-sm leading-[21px] font-semibold absolute left-2 top-0 flex items-center">
                            {user.name} <i className='fa-solid fa-caret-down ml-[5px]'></i>
                        </div>
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-[40px] right-[-20px] mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <Link to="/app/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Profile
                        </Link>
                        <Link to="/app/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Settings
                        </Link>
                        <div onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminHeader;


