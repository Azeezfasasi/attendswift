import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../contextAPI/ProfileContext';

function AdminLoginMain() {
    const { login } = useProfile();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const response = await login(email, password);
        
        if (response.success) {
        navigate("/app/dashboard"); // Redirect to dashboard after login
        } else {
        setError(response.message || "Login failed");
        }

        setLoading(false);
    };
   
    return (
        <>
        <div className="w-[96%] lg:w-[90%] h-full lg:h-[663px] flex flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center gap-10 lg:gap-0 relative overflow-hidden mt-[40px] mx-auto mb-[20px] lg:mb-[20px]">
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
                <div className="flex flex-row gap-[10px] md:gap-[39px] items-center justify-center shrink-0 relative self-center">
                    <Link to="/" className="bg-[#f0f4fb] rounded-lg border-solid border-[#5f6ef1] border pt-4 pr-2 pb-4 pl-2 flex flex-row gap-3 items-center justify-center shrink-0 w-[160px] md:w-[207px] relative cursor-pointer">
                        <div className="shrink-0 w-6 h-6 static">
                            <div className="rounded-[50%] border-solid border-[#3c4ef1] border w-[11.59%] h-[42.86%] absolute right-[84.54%] left-[3.86%] bottom-[28.57%] top-[28.57%]"></div>
                            <div className="rounded-[50%] w-[5.8%] h-[21.43%] absolute right-[87.44%] left-[6.76%] bottom-[39.29%] top-[39.29%]"></div>
                        </div>
                        <div className="text-[#3c4ef1] text-left font-['Roboto-Regular',_sans-serif] text-sm font-normal relative flex-1">
                            Teacher/Parent
                        </div>
                    </Link>
                    <div className="bg-[#f0f4fb] rounded-lg border-solid border-[#5f6ef1] border pt-4 pr-2 pb-4 pl-2 flex flex-row gap-3 items-center justify-center shrink-0 w-[160px] md:w-[207px] relative cursor-pointer">
                        <div className="shrink-0 w-6 h-6 static">
                            <div className="rounded-[50%] border-solid border-[#3c4ef1] border w-[11.29%] md:w-[11.59%] h-[42.86%] absolute right-[84.54%] left-[3.86%] bottom-[28.57%] top-[28.57%]"></div>
                            <div className="bg-[#3c4ef1] rounded-[50%] w-[5.8%] h-[21.43%] absolute right-[87.44%] left-[6.76%] bottom-[39.29%] top-[39.29%]"></div>
                        </div>
                        <div className="text-[#3c4ef1] text-left font-['Roboto-Regular',_sans-serif] text-sm font-normal relative flex-1">
                            Admin
                        </div>
                    </div>
                </div>

                {/* error message */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="w-full md:w-[526px] h-fit flex flex-col items-start justify-start self-center mx-auto relative mb-[-10px] md:mb-[0px]">
                    <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal w-[71px]">
                        Email
                    </div>
                    <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
                    className="bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px]" required />
                </div>
                <div className="w-full md:w-[526px] h-fit flex flex-col items-start justify-start self-center mx-auto relative">
                    <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal w-[71px]">
                        Password
                    </div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px]" required />
                </div>
                <div className="shrink-0 w-[127px] h-6 flex flex-row items-center justify-center gap-1.5 relative mt-[-15px]">
                    <input type="checkbox" className="rounded w-4 h-4 overflow-visible" />
                    <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal  w-[103px]">
                        Remember me
                    </div>
                </div>
                
                <button type="submit" className="shrink-0 w-[74px] h-[38px] static cursor-pointer transition" disabled={loading}>
                    <div className="bg-blue-800 text-white text-center font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal w-[74px] h-[38px] flex flex-row justify-center items-center">
                        {loading ? "Logging in..." : "Login"}
                    </div>
                </button>
            </form>
        </div>
        </>
    );
}

export default AdminLoginMain;