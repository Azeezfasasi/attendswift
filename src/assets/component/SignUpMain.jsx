import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useProfile } from '../contextAPI/ProfileContext';

function SignUpMain() {
    const { register } = useProfile();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      role: "parent",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    // Handle input change
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      const { success, message } = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
  
      if (success) {
        navigate("/app/teacher/dashboard"); // Redirect after successful registration
      } else {
        setError(message || "Registration failed. Please try again.");
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
        <form onSubmit={handleSubmit} className="login-form bg-[#ffffff] w-full lg:w-fit rounded border-solid border-[rgba(0,0,0,0.12)] border pt-12 pr-[20px] md:pr-[49px] pb-12 pl-[20px] md:pl-[49px] flex flex-col gap-[26px] items-start justify-start relative">
        <div className="w-full flex flex-row gap-[10px] md:gap-[39px] items-center justify-center shrink-0 relative self-center rounded">
                <div className="font-bold pt-4 pr-2 pb-4 pl-2 flex flex-row gap-3 items-center justify-center shrink-0 relative cursor-pointer">
                    <div className="text-[20px] md:text-[28px]">Register</div>
              </div>    
            </div>

            {error && <p className="link-text-color text-red-500 text-sm mt-2 text-center">{error}</p>}

            {/* Name */}
            <div className="w-full md:w-[526px] h-fit flex flex-col items-start justify-start self-center mx-auto relative mb-[-10px] md:mb-[0px]">
                <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal w-[71px]">
                    Full Name
                </div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px]" />
            </div>

            {/* Email */}
            <div className="w-full md:w-[526px] h-fit flex flex-col items-start justify-start self-center mx-auto relative mb-[-10px] md:mb-[0px]">
                <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal w-[71px]">
                    Email
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="abc@example.com" className="bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px]" />
            </div>

            {/* Password */}
            <div className="w-full md:w-[526px] h-fit flex flex-col items-start justify-start self-center mx-auto relative">
                <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal w-[71px]">
                        Password
                </div>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px]" />
            </div>

            {/* role selection */}
            <div className="w-full md:w-[526px] h-fit flex flex-col items-start justify-start self-center mx-auto relative">
                <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal w-[71px]">
                    Role
                </div>
                <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px]"
                >
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                </select>
            </div>

            {/* Submit button */}
            <button type='submit' className="shrink-0 w-[74px] h-[38px] static cursor-pointer mt-[-5px]">
                <div className="button-background bg-blue-800 text-white text-center font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal w-[74px] h-[38px] flex flex-row justify-center items-center">
                    {loading ? "Registering..." : "Register"}
                </div>
            </button>
            
            

            <div className="shrink-0 w-[263px] h-6 flex flex-row static mt-[-15px] lg:mt-[-10px]">
                <div className="text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal mr-1">
                    Have an account?
                </div>
                <Link to="/" className="link-text-color text-[#0dcaf0] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal">
                    Login here
                </Link>
            </div>
        </form>
    </div>

    </>
  )
}

export default SignUpMain