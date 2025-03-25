import { useEffect, useState } from "react";
import { getCurrentSession, promoteStudents } from "../../services/api";
import { Helmet } from "react-helmet";
import AdminHeader from "../../assets/component/AdminHeader";
import AdminDashLeft from "../../assets/component/AdminDashLeft";
import axios from "axios";

function AcademicSection() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
        try {
          const response = await axios.get("https://attendswift.netlify.app/api/academic-session/current");
          console.log("API Response:", response.data);
      
          // Directly use the object as the session
          const currentSession = response.data;
      
          if (!currentSession || !currentSession.isCurrent) {
            console.error("No active session found");
          }
      
          setSession(currentSession);
        } catch (error) {
          console.error("Error fetching session:", error);
        }
      };      

    fetchSession();
  }, []);
  

  const handlePromotion = async () => {
    try {
      await promoteStudents();
      alert("Promotion completed!");
    } catch (error) {
      console.error("Error promoting students:", error);
      alert("Promotion failed. Check logs for details.");
    }
  };

 const currentTerm = session?.terms?.find(term => term.isCurrent)?.name || "No active term";

  return (
    <>
      <Helmet>
        <title>Academic Section | AttendSwift</title>
      </Helmet>
      <div className="w-full">
        <AdminHeader />
        <div className="w-full bg-[#F6F6FE] flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-[100px]">
          <div className="w-[18%]">
            <AdminDashLeft />
          </div>
          <div className="w-[95%] lg:w-[80%] h-screen mt-[10px] lg:mt-[40px] overflow-x-hidden overflow-y-scroll mx-auto">
            <div>
                <p className="font-bold">Academic Session: <span className="font-normal">{session?.name || "No active session"}</span></p>
                <p className="font-bold">Start Date: <span className="font-normal">{session?.startDate || "Not provided"}</span></p>
                <p className="font-bold">End Date: <span className="font-normal">{session?.endDate || "Not provided"}</span></p>
                <p className="font-bold">Current Term: <span className="font-normal">{currentTerm ? currentTerm?.name : "No active term"}</span></p>
              <button onClick={handlePromotion} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer mt-[20px]">Promote Students</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AcademicSection;