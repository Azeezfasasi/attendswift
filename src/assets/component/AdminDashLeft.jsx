import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import attendacerecord from '../images/svg/attendacerecord.svg';
import dashicon from '../images/svg/dashicon.svg';
import logouticon from '../images/svg/logouticon.svg';
import reporticon from '../images/svg/reporticon.svg';
import studenticon from '../images/svg/studenticon.svg';
import attendance from '../images/svg/attendance.svg';
import absense from '../images/svg/absense.svg';
import teacher from '../images/svg/teacher.svg';
import subject from '../images/svg/subject.svg';
import { useProfile } from '../contextAPI/ProfileContext';
import { useNavigate } from "react-router-dom";

function AdminDashLeft() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { logout } = useProfile();
    const navigate = useNavigate();
    const { user } = useProfile();
    
    if (!user) return null; // If no user is logged in, don't show the menu
    
    const handleLogout = async () => {
        await logout();
        navigate("/"); // Redirect to login page after logout
    };

  return (
    <>
    {/* Hamburger Button for Mobile */}
    <button
    className="lg:hidden p-4 text-[#012970] fixed top-[-7px] left-0 z-[99999]"
    onClick={() => setMenuOpen(!menuOpen)}
    >
    {menuOpen ? <FiX size={30} className='border ml-[20px]' /> : <FiMenu size={30} />}
    </button>

    {/* Sidebar */}
    <div className={`bg-[#ffffff] w-[300px] h-[100vh] lg:h-[800px] fixed top-[60px] lg:top-[0px] left-0 transform overflow-y-scroll lg:overflow-y-hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 shadow-lg lg:relative lg:flex lg:flex-col`}>
        <div className="flex flex-col gap-0 items-start justify-start absolute left-0 top-0 overflow-x-hidden">
            <Link to="/" className="lg:hidden shrink-0 w-fit h-[26px] relative">
                <div className="text-[#012970] text-left font-['Nunito-Bold',_sans-serif] text-[20px] md:text-[26px] leading-[26px] font-bold  h-[35px] flex flex-row items-center justify-start ml-[40px] mt-[0px] mb-[-20px]">
                    AttendSwift
                </div>
            </Link>

            {/* Admin Menus */}
            {user.role === "admin" && (
            <div className="flex flex-col p-5 space-y-2 overflow-x-hidden">
                <NavLink to="/app/dashboard" className={({ isActive }) => `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <img
                        className="w-[26px] h-[26px] absolute left-[9px] top-[11px] overflow-visible"
                        src={dashicon}
                    />
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Dashboard
                    </div>
                </NavLink>
                <div className="text-[#899bbd] text-left font-['OpenSans-SemiBold',_sans-serif] text-[11px] leading-[16.5px] font-semibold uppercase relative flex items-center justify-start">
                ANalyze
                </div>
                <NavLink to="/app/admin/MarkAttendance" className={({ isActive }) => `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`}>
                    <img className="w-6 h-6 mr-3" src={attendacerecord} alt="Attendance" />
                    <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Mark Attendance</span>
                </NavLink>
                <NavLink to="/app/admin/attendance" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <img
                        className="w-[26px] h-[26px] absolute left-[9px] top-[11px] overflow-visible"
                        src={attendance}
                    />
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Attendance
                    </div>
                </NavLink>
                <NavLink to="/app/admin/AbsenseApplication" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <img
                        className="w-[26px] h-[26px] absolute left-[9px] top-[11px] overflow-visible"
                        src={absense}
                    />
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Absense Application
                    </div>
                </NavLink>
                <NavLink to="/app/admin/absense" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <img
                        className="w-[26px] h-[26px] absolute left-[9px] top-[11px] overflow-visible"
                        src={absense}
                    />
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Absense Records
                    </div>
                </NavLink>
                <NavLink to="/app/admin/report" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Report
                    </div>
                    <img
                        className="w-[26px] h-[26px] absolute left-2 top-2 overflow-visible"
                        src={reporticon}
                    />
                </NavLink>
                <div className="text-[#dbdede] text-left font-['OpenSans-SemiBold',_sans-serif] text-[11px] leading-[16.5px] font-semibold uppercase relative flex items-center justify-start">
                Manage
                </div>
                <NavLink to="/app/admin/teacher" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Teacher
                    </div>
                    <div className="w-6 h-6 absolute left-2.5 top-2.5 overflow-hidden">
                        <img
                        className="w-[66.67%] h-[83.33%] absolute right-[16.67%] left-[16.67%] bottom-[8.33%] top-[8.33%] overflow-visible"
                        src={teacher}
                        />
                    </div>
                </NavLink>
                <NavLink to="/app/admin/students" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Student
                    </div>
                    <img
                        className="w-[26px] h-[26px] absolute left-2 top-[9px] overflow-visible"
                        src={studenticon}
                    />
                </NavLink>
                <NavLink to="/app/admin/subjects" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Subject
                    </div>
                    <div className="w-6 h-6 absolute left-2.5 top-2.5 overflow-hidden">
                        <img
                        className="w-[66.67%] h-[83.33%] absolute right-[16.67%] left-[16.67%] bottom-[8.33%] top-[8.33%] overflow-visible"
                        src={subject}
                        />
                    </div>
                </NavLink>
                <NavLink to="/app/admin/gradepromotion" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Grade Promotion
                    </div>
                    <div className="w-6 h-6 absolute left-2.5 top-2.5 overflow-hidden">
                        <img
                        className="w-[66.67%] h-[83.33%] absolute right-[16.67%] left-[16.67%] bottom-[8.33%] top-[8.33%] overflow-visible"
                        src={subject}
                        />
                    </div>
                </NavLink>
                <NavLink to="/app/admin/settings" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Settings
                    </div>
                    <div className="w-6 h-6 absolute left-2.5 top-2.5 overflow-hidden">
                        <img
                        className="w-[66.67%] h-[83.33%] absolute right-[16.67%] left-[16.67%] bottom-[8.33%] top-[8.33%] overflow-visible"
                        src={subject}
                        />
                    </div>
                </NavLink>
                <NavLink to="/app/admin/academicsection" className={({ isActive }) =>
                `rounded w-[260px] h-11 flex relative items-center px-3 ${
                    isActive ? "bg-[#dbdede] text-[#4154f1] font-bold" : "bg-[#ffffff] text-[#012970]"}`}>
                    <div className="text-[#012970] text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold absolute left-[41px] top-[10.75px] flex items-center justify-start">
                        Academic Section
                    </div>
                    <div className="w-6 h-6 absolute left-2.5 top-2.5 overflow-hidden">
                        <img
                        className="w-[66.67%] h-[83.33%] absolute right-[16.67%] left-[16.67%] bottom-[8.33%] top-[8.33%] overflow-visible"
                        src={subject}
                        />
                    </div>
                </NavLink>
                <div className="text-[#899bbd] text-left font-['OpenSans-SemiBold',_sans-serif] text-[11px] leading-[16.5px] font-semibold uppercase relative flex items-center justify-start">
                Logout
                </div>
                <div onClick={handleLogout} className="rounded w-[260px] h-[43px] p-3 flex items-center text-[#012970] hover:bg-red-100 hover:text-red-600 cursor-pointer">
                    <img className="w-5 h-5 mr-3" src={logouticon} alt="Logout" />
                    <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Logout</span>
                </div>
            </div>
            )}
            
            {/* Teacher Menus */}
            {user.role === "teacher" && (
            <div className="flex flex-col p-5 space-y-2">
                <div className="text-[#899bbd] font-semibold text-xs uppercase">Analyze</div>
                <NavLink
                to="/app/teacher/dashboard"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={dashicon} alt="Dashboard" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Dashboard</span>
                </NavLink>
                <NavLink
                to="/app/teacher/report"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={reporticon} alt="Report" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Report</span>
                </NavLink>
    
                <div className="text-[#899bbd] font-semibold text-xs uppercase">Track</div>
                <NavLink
                to="/app/teacher/markattendance"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={attendacerecord} alt="Attendance" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Mark Attendance</span>
                </NavLink>
                <NavLink
                to="/app/teacher/AttendanceSheets"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={attendacerecord} alt="Attendance" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Attendance Sheet</span>
                </NavLink>
    
                <NavLink
                to="/app/teacher/absentapplication"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={absense} alt="Attendance" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Absense Application</span>
                </NavLink>
    
                <div className="text-[#899bbd] font-semibold text-xs uppercase">Manage</div>
                <NavLink
                to="/app/teacher/students"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={studenticon} alt="Students" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Student</span>
                </NavLink>
    
                <NavLink
                to="/app/teacher/Subject"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={studenticon} alt="Students" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Subject</span>
                </NavLink>
    
                <div className="text-[#899bbd] font-semibold text-xs uppercase">Logout</div>
                <div onClick={handleLogout} className="rounded p-3 flex items-center text-[#012970] hover:bg-red-100 hover:text-red-600 cursor-pointer">
                <img className="w-5 h-5 mr-3" src={logouticon} alt="Logout" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Logout</span>
                </div>
            </div>
            )}
    
            {/* Parents Menus */}
            {user.role === "parent" && (
            <div className="flex flex-col p-5 space-y-2">
                <div className="text-[#899bbd] font-semibold text-xs uppercase">Analyze</div>
                <NavLink
                to="/app/dashboard"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={dashicon} alt="Dashboard" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Dashboard</span>
                </NavLink>
                <NavLink
                to="/app/teacher/report"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={reporticon} alt="Report" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Report</span>
                </NavLink>
    
                <div className="text-[#899bbd] font-semibold text-xs uppercase">Track</div>
                <NavLink
                to="/app/teacher/AttendanceSheets"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={attendacerecord} alt="Attendance" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Attendance Sheet</span>
                </NavLink>
    
                <NavLink
                to="/app/teacher/absentapplication"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={absense} alt="Attendance" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Absense Application</span>
                </NavLink>
    
                <div className="text-[#899bbd] font-semibold text-xs uppercase">Manage</div>    
                <NavLink
                to="/app/teacher/Subject"
                className={({ isActive }) =>
                    `rounded p-3 flex items-center ${isActive ? 'bg-[#dbdede] text-[#4154f1] font-bold' : 'text-[#012970]'}`
                }
                >
                <img className="w-6 h-6 mr-3" src={studenticon} alt="Students" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Subject</span>
                </NavLink>
    
                <div className="text-[#899bbd] font-semibold text-xs uppercase">Logout</div>
                <div onClick={handleLogout} className="rounded p-3 flex items-center text-[#012970] hover:bg-red-100 hover:text-red-600 cursor-pointer">
                <img className="w-5 h-5 mr-3" src={logouticon} alt="Logout" />
                <span className="text-left font-['OpenSans-SemiBold',_sans-serif] text-[15px] leading-[22.5px] font-semibold flex items-center justify-start">Logout</span>
                </div>
            </div>
            )}
        </div>
    </div>

    </>
  )
}

export default AdminDashLeft;