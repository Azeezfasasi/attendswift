import React from 'react'

function LoginSignUpHeader() {
  return (
    <>
    <div className="bg-[#ffffff] pt-[9px] pr-5 pb-[9px] pl-5 flex flex-row gap-0 items-center justify-start sticky top-0 z-[9999]" style={{ boxShadow: "0px 2px 20px 0px rgba(1, 41, 112, 0.1)" }}>
        <div className="pt-2 pb-2 flex flex-row gap-2.5 items-center justify-start shrink-0 relative">
            <div className="shrink-0 w-[280px] h-[26px] relative">
                <div className="text-[#012970] text-left font-['Nunito-Bold',_sans-serif] text-[26px] leading-[26px] font-bold absolute left-[30.5px] top-[-5px] w-[100%] h-[35px] flex items-center justify-start">
                  AttendSwift
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LoginSignUpHeader