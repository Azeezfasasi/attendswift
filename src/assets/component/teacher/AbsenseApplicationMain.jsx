import React from "react";
import { useAbsence } from "../../contextAPI/AbsenseContext"; // Import context

function AbsenseApplicationMain() {
  const { date, setDate, days, setDays, reason, setReason, handleSubmit, resetForm } = useAbsence();

  return (
    <div className="w-[95%] lg:w-[70%] bg-[#ffffff] rounded-[5px] flex flex-col gap-2.5 items-start justify-start relative mx-auto lg:mx-0" style={{ boxShadow: "0px 0px 30px 0px rgba(1, 41, 112, 0.1)" }}>
      <div className="w-full lg:w-[100%] pt-5 pr-3 pb-5 pl-3 flex flex-col gap-2 items-start justify-start shrink-0 relative">
        
        {/* Title */}
        <div className="text-[#012970] text-left font-['Poppins-Medium',_sans-serif] text-lg leading-[21.6px] font-medium relative flex items-center justify-start h-fit">
          Send Absent Application
        </div>

        {/* Form */}
        <form className="w-[100%] lg:w-[100%] flex flex-col gap-4 items-start justify-start shrink-0 relative" onSubmit={handleSubmit}>

          {/* Date and Days */}
          <div className="flex flex-col lg:flex-row gap-5 items-start justify-start mx-auto shrink-0 w-[100%] h-fit relative">

            {/* Date */}
            <div className="flex-1 pr-2 pl-2 flex flex-col gap-1.5 items-start justify-start w-full lg:w-[100%] relative">
              <div className="text-[#444444] text-left text-base leading-6 font-normal">
                Date
              </div>
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='bg-[#ffffff] rounded-md border border-[#ced4da] pr-2.5 pl-2.5 h-9 w-[100%]' 
                required 
              />
            </div>

            {/* Number of Days */}
            <div className="flex-1 pr-2 pl-2 flex flex-col gap-1.5 items-start justify-start w-full lg:w-[100%] relative">
              <div className="text-[#444444] text-left text-base leading-6 font-normal">
                Number of Days
              </div>
              <input 
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder='No. of Days' 
                className='bg-[#ffffff] rounded-md border border-[#ced4da] pr-2.5 pl-2.5 h-9 w-[100%]' 
                required 
              />
            </div>
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-0 items-start justify-start shrink-0 w-[100%] h-fit relative overflow-hidden">
            <div className="pr-2 pl-2 flex flex-col gap-1.5 items-start justify-start flex-1 w-full lg:w-[100%] relative">
              <div className="text-[#444444] text-left text-base leading-6 font-normal">
                Reason
              </div>
              <textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder='Reason'
                className="bg-[#ffffff] rounded-md border border-[#ced4da] pr-2.5 pl-2.5 h-40 w-[100%]" 
                required
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="pr-2 pl-2 flex flex-row gap-4 items-start justify-start shrink-0 relative">
            {/* Submit */}
            <button type='submit' className="bg-[#0d6efd] rounded-md border border-[#0d6efd] px-4 py-2 text-white cursor-pointer">
              Submit
            </button>
            {/* Reset */}
            <button type="button" onClick={resetForm} className="bg-[#6c757d] rounded-md border border-[#6c757d] px-4 py-2 text-white cursor-pointer">
              Reset
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AbsenseApplicationMain;

