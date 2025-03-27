import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import AdminHeader from "../../assets/component/AdminHeader";
import AdminDashLeft from "../../assets/component/AdminDashLeft";
import LoadingSpinner from "../../assets/component/LoadingSpinner";

const AcademicSection = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    academicSession: "",
    startDate: "",
    endDate: "",
    terms: "",
    isCurrent: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);  

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSession({
      ...newSession,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const BASE_URL = "https://attendswift-backend.onrender.com/api/academicsessions";

  const fetchSessions = async () => {
    try {
      const response = await axios.get("https://attendswift-backend.onrender.com/api/academicsessions");
      if (Array.isArray(response.data)) {
        setSessions(response.data);
      } else {
        setSessions([]);
        console.error("Invalid response format", response.data);
      }
    } catch (error) {
      console.error("Error fetching sessions", error);
      alert("Error fetching sessions: " + error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddSession = async (e) => {
    e.preventDefault();
    const trimmedSession = newSession.academicSession?.trim();

    if (!trimmedSession) {
      alert("Academic Session cannot be empty.");
      return;
    }
  
    const payload = {
      academicSession: trimmedSession,
      startDate: newSession.startDate,
      endDate: newSession.endDate,
      terms: Array.isArray(newSession.terms) ? newSession.terms : newSession.terms.split(",").map(term => term.trim()),
      isCurrent: newSession.isCurrent || false,
    };
  
    try {
      const response = await axios.post('https://attendswift-backend.onrender.com/api/academicsessions', payload);
      alert("Session added successfully");
      fetchSessions();
    } catch (error) {
      console.error("Error adding session", error);
      alert(`Failed to add session: ${error.response?.data?.error || error.message}`); // More specific error message
    }
  };
  
  // Delete a session
  const handleDeleteSession = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      alert("Session deleted successfully");
      fetchSessions();
    } catch (error) {
      alert("Failed to delete session: " + error.response?.data?.error);
    }
  };
  
  // Set a session as current
  const handleSetCurrent = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/${id}/setCurrent`);
      alert("Session set as current");
      fetchSessions();
    } catch (error) {
      alert("Failed to update current session: " + error.response?.data?.error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
    <Helmet>
        <title>Academic Session | AttendSwift</title>
    </Helmet>
    <div className='container-bg-color w-full'>
      <AdminHeader />
      <div className='container-bg-color w-full bg-[#F6F6FE] flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-[100px]'>
        <div className='container-bg-color w-[18%]'>
          <AdminDashLeft />
        </div>
        <div className='container-bg-color w-full lg:w-[80%] max-h-[110vh] h-[100vh] md:h-[90vh] mt-[10px] lg:mt-[40px] overflow-x-hidden overflow-y-scroll mx-auto mb-[40px] lg:mb-0'>
          <div className="container-bg-color flex flex-col items-center p-4 mx-auto">
            <h2 className="text-[26px] font-bold">Academic Session Manager</h2>

            {/* Display existing sessions */}
            <div className="w-full lg:w-[50%] mt-4 border border-solid border-gray-400 rounded p-2 mb-[30px]">
              <h3 className="font-bold">Existing Sessions:</h3>
              {sessions.length === 0 ? (
                <p>No sessions available</p>
              ) : (
                sessions.map((session) => (
                  <div key={session._id} className="mb-3 p-2">
                    <p className="login-label-text font-semibold text-gray-600">
                      {session.academicSession} ({session.terms}) - {" "}
                      {session.isCurrent ? "✅ Current" : "❌ Not Current"}
                    </p>
                    <button onClick={() => handleDeleteSession(session._id)} className="py-0 px-2 bg-blue-700 text-white lg:w-[30%] rounded cursor-pointer mt-2 mb-2">Delete</button>
                    {!session.isCurrent && (
                      <button onClick={() => handleSetCurrent(session._id)} className="py-0 px-2 bg-green-800 text-white lg:w-[30%] rounded cursor-pointer mt-2 mb-2 ml-4">
                        Set as Current
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Form to add a new session */}
            <form onSubmit={handleAddSession} className="flex flex-col w-full lg:w-[50%] pt-2 pr-2 pl-2 pb-4 border border-solid border-gray-400 rounded">
              <h2 className="logo-link-color text-[20px] text-blue-800 font-bold">Create Academic Session</h2>
              <div className="flex flex-col gap-1 mb-2">
                <label className="login-label-text font-semibold">Academic Session</label>
                <input
                type="text"
                name="academicSession"
                placeholder="e.g. 2025/2026"
                value={newSession.academicSession}
                onChange={handleChange}
                required
                className="input-bg-border border border-solid border-gray-400 p-2 rounded"
                />
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-1 mb-2">
                <div className="flex flex-col gap-1 lg:w-[46%]">
                  <label className="login-label-text font-semibold">Start Date</label>
                  <input
                  type="date"
                  name="startDate"
                  value={newSession.startDate}
                  onChange={handleChange}
                  required
                  className="input-bg-border border border-solid border-gray-400 p-2 rounded"
                  />
                </div>

                <div className="flex flex-col gap-1 lg:w-[46%]">
                  <label className="login-label-text font-semibold">End Date</label>
                  <input
                  type="date"
                  name="endDate"
                  value={newSession.endDate}
                  onChange={handleChange}
                  required
                  className="input-bg-border border border-solid border-gray-400 p-2 rounded"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-2">
                <label className="login-label-text font-semibold">Terms</label>
                <select name="terms" value={newSession.terms} onChange={handleChange} required className="input-bg-border border border-solid border-gray-400 p-2 rounded">
                  <option value="">Choose term</option>
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Term 3">Term 3</option>
                </select>
              </div>

              <div className="flex flex-row items-center justify-start gap-1 mb-2">
                <label className="login-label-text font-semibold">Current Session?</label>
                <input
                  type="checkbox"
                  name="isCurrent"
                  checked={newSession.isCurrent}
                  onChange={handleChange}
                  className="input-bg-border w-4 h-4 rounded"
                />
              </div>
              
              <button type="submit" className="py-2 px-2 bg-blue-700 text-white lg:w-[30%] mx-auto rounded">Add Session</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default AcademicSection;