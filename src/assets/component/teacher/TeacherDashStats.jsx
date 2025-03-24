import React, { useEffect, useState } from 'react';
import { useSchool } from "../../contextAPI/SchoolContext"; // Import the context
import absense from '../../images/svg/absense.svg';
import attendance from '../../images/svg/attendance.svg';
import { useStudents } from "../../contextAPI/StudentContext";
import { useAbsence } from '../../contextAPI/AbsenseContext';

function TeacherDashStats() {
    const { totalStudents } = useStudents();
    const { presentStudentsToday, absentStudentsToday } = useAbsence();

  const { students } = useSchool(); // Get students from context
  const [presentToday, setPresentToday] = useState(0);
  const [absentToday, setAbsentToday] = useState(0);
  const [monthlyAttendance, setMonthlyAttendance] = useState(0);
  const [presentChange, setPresentChange] = useState(0);
  const [absentChange, setAbsentChange] = useState(0);

  console.log("Present:", presentStudentsToday);
    console.log("Absent:", absentStudentsToday);

  return (
    <>
    <div className="w-[90%] flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-[30px] mx-auto lg:m-0 relative overflow-hidden mt-[10px] lg:mt-[20px] mb-[10px] py-[10px] flex-wrap">

        {/* Box 1 */}
        <div className="bg-[#ffffff] rounded-[5px] flex flex-row gap-2.5 items-center justify-center w-[212px]"
            style={{ boxShadow: "0px 0px 30px 0px rgba(1, 41, 112, 0.1)" }}>
            <div className="pr-5 pb-5 pl-5 flex flex-col gap-2 items-center justify-center flex-1 relative">
                <div className="pt-5 pr-[2.33px] pb-[14.59px] flex flex-row gap-0 items-start justify-start self-stretch shrink-0 relative">
                    <div className="w-full text-left relative flex flex-row items-center justify-start">
                        <span className='flex flex-row items-start justify-start gap-[5px] w-full'>
                            <span className="text-[#4154F1] font-semibold">Students</span>
                            <span className="text-[#899BBD]">|</span>
                            <span className="text-[#899BBD]">Total</span>
                        </span>
                    </div>
                </div>
                <div className="self-stretch shrink-0 h-16 relative">
                    <div
                    className="bg-[#f6f6fe] rounded-[32px] w-16 h-16 absolute left-0 top-[50%]"
                    style={{ translate: "0 -50%" }}
                    >
                        <div className="text-[#4154f1] w-[32px] h-8 flex flex-row items-center justify-center m-auto relative">
                            <img src={attendance} alt="" className='absolute top-[20px] left-[5px]' />
                        </div>
                    </div>
                    <div
                    className="pr-[3.52px] pb-px pl-4 flex flex-col gap-[2.59px] items-start justify-start absolute left-16 top-[50%]"
                    style={{ translate: "0 -50%" }}
                    >
                        <div className="text-[#4154f1] text-left font-['Nunito-Bold',_sans-serif] text-[28px] leading-[33.6px] font-bold relative flex items-center justify-start">
                            {totalStudents}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Box 2 */}
        <div className="bg-[#ffffff] rounded-[5px] flex flex-row gap-2.5 items-center justify-center w-[212px]"
            style={{ boxShadow: "0px 0px 30px 0px rgba(1, 41, 112, 0.1)" }}>
            <div className="pr-5 pb-5 pl-5 flex flex-col gap-2 items-center justify-center flex-1 relative">
                <div className="pt-5 pr-[2.33px] pb-[14.59px] flex flex-row gap-0 items-start justify-start self-stretch shrink-0 relative">
                    <div className="w-full text-left relative flex flex-row items-center justify-start">
                        <span className='flex flex-row items-start justify-start gap-[5px] w-full'>
                            <span className="text-[#4154F1] font-semibold">Present</span>
                            <span className="text-[#899BBD]">|</span>
                            <span className="text-[#899BBD]">Today</span>
                        </span>
                    </div>
                </div>
                <div className="self-stretch shrink-0 h-16 relative">
                    <div
                    className="bg-[#f6f6fe] rounded-[32px] w-16 h-16 absolute left-0 top-[50%]"
                    style={{ translate: "0 -50%" }}
                    >
                        <div className="text-[#4154f1] w-[32px] h-8 flex flex-row items-center justify-center m-auto relative">
                            <img src={attendance} alt="" className='absolute top-[20px] left-[5px]' />
                        </div>
                    </div>
                    <div
                    className="pr-[3.52px] pb-px pl-4 flex flex-col gap-[2.59px] items-start justify-start absolute left-16 top-[50%]"
                    style={{ translate: "0 -50%" }}>
                        <div className="text-[#4154f1] text-left font-['Nunito-Bold',_sans-serif] text-[28px] leading-[33.6px] font-bold relative flex items-center justify-start">
                        {presentStudentsToday}
                        </div>
                        <div className={`text-sm ${presentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {presentChange.toFixed(1)}% {presentChange >= 0 ? "increase" : "decrease"}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Box 3 */}
        <div
            className="bg-[#ffffff] rounded-[5px] flex flex-row gap-2.5 items-center justify-center w-[230px]"
            style={{ boxShadow: "0px 0px 30px 0px rgba(1, 41, 112, 0.1)" }}
        >
            <div className="pr-5 pb-5 pl-5 flex flex-col gap-2 items-center justify-center flex-1 relative">
            <div className="pt-5 pr-[2.33px] pb-[14.59px] flex flex-row gap-0 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-left relative flex items-center justify-start">
                <span className='flex flex-row items-start justify-start gap-[5px] w-full'>
                    <span className="text-[#4154F1] font-semibold">Absent</span>
                    <span className="text-[#899BBD]">|</span>
                    <span className="text-[#899BBD]">Today</span>
                </span>
                </div>
            </div>
            <div className="self-stretch shrink-0 h-16 relative">
                <div
                className="bg-[#f6f6fe] rounded-[32px] w-16 h-16 absolute left-0 top-[50%]"
                style={{ translate: "0 -50%" }}
                >
                    <div className="text-[#4154f1] w-[32px] h-8 flex flex-row items-center justify-center m-auto relative">
                        <img src={absense} alt="" className='absolute top-[20px] left-[5px]' />
                    </div>
                </div>
                <div
                className="pr-[3.52px] pb-px pl-4 flex flex-col gap-[2.59px] items-start justify-start absolute left-16 top-[50%]"
                style={{ translate: "0 -50%" }}
                >
                <div className="text-[#4154f1] text-left font-['Nunito-Bold',_sans-serif] text-[28px] leading-[33.6px] font-bold relative flex items-center justify-start">
                    {absentStudentsToday}
                </div>
                <div className={`text-sm ${absentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {absentChange.toFixed(1)}% {absentChange >= 0 ? "increase" : "decrease"}
                </div>
            </div>
        </div>
        </div>
    </div>

        {/* Box 4 */}
        <div
            className="bg-[#ffffff] rounded-[5px] flex flex-row gap-2.5 items-center justify-center w-[252px]"
            style={{ boxShadow: "0px 0px 30px 0px rgba(1, 41, 112, 0.1)" }}
        >
            <div className="pr-5 pb-5 pl-5 flex flex-col gap-2 items-center justify-center flex-1 relative">
            <div className="pt-5 pr-[2.33px] pb-[14.59px] flex flex-row gap-0 items-start justify-start self-stretch shrink-0 relative">
                <div className="text-left relative flex items-center justify-start">
                    <span className='flex flex-row items-start justify-start gap-[5px] w-full'>
                        <span className="text-[#4154F1] font-semibold">Attendance</span>
                        <span className="text-[#899BBD]">|</span>
                        <span className="text-[#899BBD]">This Month</span>
                    </span>
                </div>
            </div>
            <div className="self-stretch shrink-0 h-16 relative">
                <div
                className="bg-[#f6f6fe] rounded-[32px] w-16 h-16 absolute left-0 top-[50%]"
                style={{ translate: "0 -50%" }}
                >
                    <div className="text-[#4154f1] w-[32px] h-8 flex flex-row items-center justify-center m-auto relative">
                        <img src={attendance} alt="" className='absolute top-[20px] left-[5px]' />
                    </div>
                </div>
                <div
                className="pr-[3.52px] pb-px pl-4 flex flex-col gap-[2.59px] items-start justify-start absolute left-16 top-[50%]"
                style={{ translate: "0 -50%" }}
                >
                    <div className="text-[#4154f1] text-left font-['Nunito-Bold',_sans-serif] text-[28px] leading-[33.6px] font-bold relative flex items-center justify-start">
                        {monthlyAttendance}
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

    </>
  )
}

export default TeacherDashStats