import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useProfile } from '../contextAPI/ProfileContext';

function ForgetPasswordMain() {
    const { requestPasswordReset } = useProfile();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const response = await requestPasswordReset(email);
        
        if (response.success) {
        setMessage("Password reset link has been sent to your email.");
        } else {
        setMessage(response.message || "Failed to send password reset link.");
        }
        setLoading(false);
    };

  return (
    <>
    <div className="w-[96%] lg:w-[90%] h-full lg:h-[663px] flex flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center gap-10 lg:gap-0 relative overflow-hidden mt-[40px] mx-auto">
        {/* Left Side */}
        <div className="w-full lg:w-[50%] h-fit lg:h-[555px] flex flex-col items-start justify-center mx-auto overflow-hidden ml-[20px] self-center">
            <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[32px] md:text-[64px] leading-[50px] md:leading-[76.8px] font-normal w-[90%]">
                Attendance <br /> <span className='text-[#012970]'>for your business</span>
            </div>
            <div className="text-[#757f8e] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal w-[93%] lg:w-[96%]">
            Efficient attendance tracking is essential for maintaining productivity and ensuring accountability in any organization. Our system provides a seamless solution for monitoring employee attendance, streamlining check-ins, and generating accurate reports.
            With real-time tracking and automated record-keeping, you can eliminate manual errors and improve workforce management. Whether for schools, businesses, or remote teams, our attendance system ensures transparency and efficiency.

            Start managing attendance effortlessly and enhance workplace efficiency today!
            </div>
        </div>

        {/* Right Side */}
        <form onSubmit={handleSubmit} className="bg-[#ffffff] w-full lg:w-fit rounded border-solid border-[rgba(0,0,0,0.12)] border pt-12 pr-[20px] md:pr-[49px] pb-12 pl-[20px] md:pl-[49px] flex flex-col gap-[26px] items-start justify-start relative">
            <div className="w-full flex flex-row gap-[10px] md:gap-[39px] items-center justify-center shrink-0 relative self-center rounded">
                <div className="font-bold pt-4 pr-2 pb-4 pl-2 flex flex-row gap-3 items-center justify-center shrink-0 relative cursor-pointer">
                    <div className="text-[20px] md:text-[28px]">Forget Password</div>
              </div>    
            </div>

            {/* Error and success Message */}
            {message && <p className="text-center text-green-600 mb-4">{message}</p>}

            <div className="w-full md:w-[526px] h-[71px] flex flex-col items-start justify-start self-center mx-auto relative">
                <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal w-[71px]">
                    Email
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px] pl-1" required />
            </div>

            {/* Submit button */}
            <button type='submit' className="shrink-0 w-[74px] h-[38px] static cursor-pointer mt-[-14px]" disabled={loading}>
                <div className="bg-blue-800 text-white text-center font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal w-[174px] h-[38px] flex flex-row justify-center items-center">
                    {loading ? "Sending..." : "Send Reset Link"}
                </div>
            </button>
            <div className="flex flex-row w-[263px] h-6 static">
                <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal">
                    Remember password?
                </div>
                <Link to="/" className="text-[#0dcaf0] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal ml-1">
                    Login here
                </Link>
            </div>
        </form>
    </div>

    </>
  )
}

export default ForgetPasswordMain