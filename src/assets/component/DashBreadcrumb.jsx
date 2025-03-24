import React from 'react'
import { Link } from 'react-router-dom'

function DashBreadcrumb() {
  return (
    <>
    <div className="w-full h-[50px] relative flex flex-col items-start justify-start gap-[0px]">
        <div className="text-[#4154f1] text-left font-['Nunito-SemiBold',_sans-serif] text-2xl leading-[28.8px] font-semibold flex items-center justify-start mb-[0px]">
            Dashboard
        </div>
        <div className="w-[1152px] h-[21px] flex flex-row items-start justify-start gap-[30px]">
            <Link to="/app/teacher/dashboard" className="text-[#989797] text-left font-['Nunito-SemiBold',_sans-serif] text-sm leading-[21px] font-semibold w-[38.5px] h-[19px] flex items-center justify-start">
            Dashboard
            </Link>
            <div className="pl-2 flex flex-row gap-[7.17px] items-start justify-start">
                <div className="text-[#989797] text-left font-['Nunito-SemiBold',_sans-serif] text-sm leading-[21px] font-semibold relative flex items-center justify-start">
                    /
                </div>
                <div className="text-[#444444] text-left font-['Nunito-SemiBold',_sans-serif] text-sm leading-[21px] font-semibold relative flex items-center justify-start">
                    Report
                </div>
            </div>
        </div>
    </div>

    </>
  )
}

export default DashBreadcrumb
