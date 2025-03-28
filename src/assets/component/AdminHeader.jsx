import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import azeez from '../images/azeez.jpeg';
import profile from '../images/profile.png';
import { useProfile } from "../contextAPI/ProfileContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';
import ThemeToggle from './ThemeToggle';
import ThemeToggleBtn from './ThemeToggleButton';
import { useTranslation } from 'react-i18next';

function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useProfile();
    const navigate = useNavigate();
    const { user, loading, fetchUserDetails } = useProfile();
    const {t} =useTranslation();

    // Logout function
    const handleLogout = async () => {
        await logout();
        navigate("/"); // Redirect to login page after logout
    };

    // Change Language
    const changeLanguage = (lng) => {
        console.log("Changing language to:", lng);
        localStorage.setItem('i18nextLng', lng);
        window.location.reload(); // Force page reload
      };
    
    // Fetching user details
    useEffect(() => {
        if (!user) {
          fetchUserDetails();
        }
      }, [user, fetchUserDetails]);
    
    //   if (loading) {
    //     return <LoadingSpinner />;
    //   }
    
      if (!user) {
        return <p>{t("No user found. Please log in.")}</p>;
      }
    

    return (
        <div className="account-header w-full bg-[#ffffff] pt-[9px] pr-6 lg:pr-6 pb-[9px] pl-5 flex flex-row gap-0 items-center justify-between sticky top-0 z-[9999]" style={{ boxShadow: "0px 2px 20px 0px rgba(1, 41, 112, 0.1)" }}>

            {/* Logo section */}
            <div className="pt-2 pb-2 flex flex-row gap-2.5 items-center justify-start shrink-0 relative lg:w-[30%]">
                <Link to="/" className="hidden lg:block shrink-0 w-[280px] h-[26px] relative">
                    <div className="logo-link-color text-[#012970] text-left font-['Nunito-Bold',_sans-serif] text-[18px] md:text-[26px] leading-[26px] font-bold">
                        AttendSwift
                    </div>
                </Link>
            </div>

            {/* User Role Display */}
            <div className="hidden lg:block shrink-0 lg:w-[30%] h-[37px] relative">
                <div className="custom-text-color text-[#012970] text-center text-base leading-4 font-normal mt-[10px]">
                    {user.role} {t("Role")}
                </div>
            </div>

            {/* Top Right Section */}
            <div className="pr-4 flex flex-row gap-[25px] md:gap-[25px] items-center justify-end flex-1 relative lg:w-[30%] ml-[-120px]">
                <div className='hidden md:block h-fit border border-solid border-white rounded'>
                    <ThemeToggleBtn />
                </div>
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
                    className='logo-border rounded-[18px] w-9 h-9 absolute left-0 top-[50%]' 
                    style={{ translate: "0 -50%", objectFit: "cover" }} 
                    />
                    <div className="w-[141.58px] h-[21px] absolute left-9 top-[50%]" style={{ translate: "0 -50%" }}>
                        <div className="logo-link-color text-[#012970] text-left text-sm leading-[21px] font-semibold absolute left-2 top-0 flex items-center">
                            {user.name} <i className='fa-solid fa-caret-down ml-[5px]'></i>
                        </div>
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="account-header-dropdown absolute top-[40px] right-[-20px] mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <Link to="/app/admin/settings" className="account-header-link-color block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {t("Profile")}
                        </Link>
                        <Link to="/app/admin/settings" className="account-header-link-color block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {t("Settings")}
                        </Link>
                        <div onClick={handleLogout} className="account-header-link-color block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                            {t("Logout")}
                        </div>

                        {/* Theme toggle */}
                        <div className='block md:hidden h-fit ml-[15px] mb-[10px]'>
                            <ThemeToggleBtn />
                        </div>

                        {/* Language section */}
                        <div className='flex flex-row justify-center border-t border-solid border-gray-300 mb-[3px] mt-[3px]'>
                            <button onClick={() => changeLanguage('en')} className='text-amber-600 mr-2 cursor-pointer border-r border-solid border-gray-300 pr-2 font-semibold'>
                                {t("En")}
                            </button>
                            <button onClick={() => changeLanguage('fr')} className='text-blue-500 cursor-pointer mr-2 border-r border-solid border-gray-300 pr-2 font-semibold'>
                                {t("Fr")}
                            </button>
                            <button onClick={() => changeLanguage('ha')} className='text-cyan-500 cursor-pointer mr-2 border-r border-solid border-gray-300 pr-2 font-semibold'>
                                {t("Ha")}
                            </button>
                            <button onClick={() => changeLanguage('yo')} className='text-emerald-500 cursor-pointer mr-2 border-r border-solid border-gray-300 pr-2 font-semibold'>
                                {t("Yo")}
                            </button>
                            <button onClick={() => changeLanguage('ig')} className='text-fuchsia-500 cursor-pointer mr-2 font-semibold'>
                                {t("Ig")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminHeader;


