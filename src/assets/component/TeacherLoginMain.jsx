import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import { useProfile } from "../contextAPI/ProfileContext";

function LoginMain() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useProfile();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
    
        const result = await login(email, password);
    
        if (result.success) {
          console.log("Redirecting to dashboard...");
          navigate("/app/dashboard"); // ✅ Redirect after successful login
        } else {
          setError(result.message); // Show error message on UI
        }
      };

    // Handle Login with Google
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
          alert('Google Sign-In successful!');
          navigate("/app/dashboard");
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      

  return (
    <>
    <div className="w-[96%] lg:w-[90%] h-full lg:h-[663px] flex flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center gap-10 lg:gap-0 relative overflow-hidden mt-[40px] mx-auto mb-[20px] lg:mb-[20px]">
        {/* Left Side */}
        <div className="w-full lg:w-[50%] h-fit lg:h-[555px] flex flex-col items-start justify-center mx-auto overflow-hidden ml-[20px] self-center">
            <div className="login-left-title text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[32px] md:text-[64px] leading-[50px] md:leading-[76.8px] font-normal w-[90%]">
                Attendance <br /> <span className='text-[#012970] login-left-span-title'>for your business</span>
            </div>
            <div className="login-left-sub-text text-[#757f8e] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal w-[93%] lg:w-[96%]">
            Efficient attendance tracking is essential for maintaining productivity and ensuring accountability in any organization. Our system provides a seamless solution for monitoring employee attendance, streamlining check-ins, and generating accurate reports.
            With real-time tracking and automated record-keeping, you can eliminate manual errors and improve workforce management. Whether for schools, businesses, or remote teams, our attendance system ensures transparency and efficiency.

            Start managing attendance effortlessly and enhance workplace efficiency today!
            </div>
        </div>

        {/* Right Side */}
        <form onSubmit={handleSubmit} className="login-form box-border bg-[#ffffff] w-full lg:w-fit rounded border-solid border-[rgba(0,0,0,0.12)] border pt-12 pr-[20px] md:pr-[49px] pb-12 pl-[20px] md:pl-[49px] flex flex-col gap-[26px] items-start justify-start relative">
            <div className="flex flex-row gap-[10px] md:gap-[39px] items-center justify-center shrink-0 relative self-center">
                <div className="login-form-title text-[28px] text-[#012970] pt-4 pr-2 pb-4 pl-2 flex flex-row gap-3 items-center justify-center shrink-0 w-[160px] md:w-[207px] relative font-bold">
                    Login
                </div>
            </div>
            {error && <p className="login-error-message text-red-500 text-sm">{error}</p>}
            <div className="w-full md:w-[526px] h-fit flex flex-col items-start justify-start self-center mx-auto relative mb-[-10px] md:mb-[0px]">
                <div className="login-label-text text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-semibold w-[71px]">
                    Email
                </div>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-bg-border bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px] pl-1" required />
            </div>
            <div className="w-full md:w-[526px] h-fit flex flex-col items-start justify-start self-center mx-auto relative">
                <div className="login-label-text text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-semibold w-[71px]">
                    Password
                </div>
                <input type="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)} className="input-bg-border bg-[#ffffff] rounded border-solid border-[#ced4da] border w-full md:w-[526px] h-[38px] pl-1" required />
            </div>
            <div className="shrink-0 w-[127px] h-6 flex flex-row items-center justify-center gap-1.5 relative mt-[-15px]">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="input-bg-border rounded w-4 h-4 overflow-visible" />
                <div className="login-label-text text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal  w-[103px]">
                    Remember me
                </div>
            </div>
            <button type='submit' className="shrink-0 w-[74px] h-[38px] static cursor-pointer mt-[-5px]" disabled={loading}>
                <div className="button-background bg-blue-800 text-white text-center font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal w-[74px] h-[38px] flex flex-row justify-center items-center">
                {loading ? 'Logging in...' : 'Login'}
                </div>
            </button>
            <Link to="/ForgetPassword" className="login-forget-password text-[#6c757d] text-left font-['Roboto-Regular',_sans-serif] text-[13px] leading-[21px] font-normal relative w-[110px] mt-[-10px]">
                Forgot password?
            </Link>
            <div className="shrink-0 w-[263px] h-6 flex flex-row static mt-[-15px] lg:mt-[-10px]">
                <div className="dont-have-account text-[#212529] text-left font-['Roboto-Regular',_sans-serif] text-base leading-6 font-normal w-[170px]">
                    Don&#039;t have an account?
                </div>
                <Link to="/app/signup" className="link-text-color text-[#0dcaf0] text-left font-['Roboto-Regular',_sans-serif] text-[15px] leading-6 font-normal w-[93px]">
                    Register here
                </Link>
            </div>
        </form>
    </div>

    </>
  )
}

export default LoginMain