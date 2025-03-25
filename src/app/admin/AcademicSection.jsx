import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import AdminHeader from "../../assets/component/AdminHeader";
import AdminDashLeft from "../../assets/component/AdminDashLeft";

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
  
  // const handleAddSession = async (e) => {
  //   e.preventDefault();
  
  //   const payload = {
  //     academicSession: newSession.academicSession?.trim(),
  //     startDate: newSession.startDate,
  //     endDate: newSession.endDate,
  //     terms: Array.isArray(newSession.terms) ? newSession.terms : newSession.terms.split(",").map(term => term.trim()),
  //     isCurrent: newSession.isCurrent || false,
  //   };
  
  //   console.log("Payload being sent:", payload); // Check for null/undefined
  
  //   try {
  //     const response = await axios.post('https://attendswift-backend.onrender.com/api/academicsessions', payload);
  //     alert("Session added successfully");
  //     fetchSessions();
  //   } catch (error) {
  //     console.error("Error adding session", error);
  //     alert(`Failed to add session: ${error.response?.data?.message || error.message}`);
  //   }
  // };
  const handleAddSession = async (e) => {
    e.preventDefault();
  
    if (!newSession.academicSession || !newSession.startDate || !newSession.endDate || !newSession.terms) {
      alert("Please fill all fields.");
      return;
    }
  
    if (new Date(newSession.startDate) >= new Date(newSession.endDate)) {
      alert("Start date must be before end date.");
      return;
    }
  
    const payload = {
      academicSession: newSession.academicSession.trim(),
      startDate: newSession.startDate,
      endDate: newSession.endDate,
      terms: Array.isArray(newSession.terms) 
        ? newSession.terms.map((term) => term.trim()) 
        : newSession.terms.split(",").map((term) => term.trim()),
      isCurrent: newSession.isCurrent || false,
    };
  
    try {
      const response = await axios.post("https://attendswift-backend.onrender.com/api/academicsessions", payload);
      alert("Session added successfully");
      fetchSessions();
    } catch (error) {
      console.error("Error adding session", error);
      alert(`Failed to add session: ${error.response?.data?.error || error.message}`);
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

  // if (loading) return <p>Loading sessions...</p>;

  return (
    <>
    <Helmet>
        <title>Academic Session | AttendSwift</title>
    </Helmet>
    <div className='w-full'>
      <AdminHeader />
      <div className='w-full bg-[#F6F6FE] flex flex-col lg:flex-row items-start justify-between gap-0 lg:gap-[100px]'>
        <div className='w-[18%]'>
          <AdminDashLeft />
        </div>
        <div className='w-[95%] lg:w-[80%] h-screen mt-[10px] lg:mt-[40px] overflow-x-hidden overflow-y-scroll mx-auto'>
          <div className="flex flex-col border">
            <h2>Academic Session Manager</h2>

            {/* Form to add a new session */}
            <form onSubmit={handleAddSession} className="flex flex-col">
              <input
                type="text"
                name="academicSession"
                placeholder="e.g., 2024/2025"
                value={newSession.academicSession}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="startDate"
                value={newSession.startDate}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="endDate"
                value={newSession.endDate}
                onChange={handleChange}
                required
              />

              <select name="terms" value={newSession.terms} onChange={handleChange} required>
                <option value="">Choose term</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
              <label>
                Current Session?
                <input
                  type="checkbox"
                  name="isCurrent"
                  checked={newSession.isCurrent}
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="py-2 px-4 bg-blue-700 text-white">Add Session</button>
            </form>

            {/* Display existing sessions */}
            <h3>Existing Sessions:</h3>
            {sessions.length === 0 ? (
              <p>No sessions available</p>
            ) : (
              sessions.map((session) => (
                <div key={session._id}>
                  <p>
                    {session.academicSession} ({session.terms}) - {" "}
                    {session.isCurrent ? "✅ Current" : "❌ Not Current"}
                  </p>
                  <button onClick={() => handleDeleteSession(session._id)}>Delete</button>
                  {!session.isCurrent && (
                    <button onClick={() => handleSetCurrent(session._id)}>
                      Set as Current
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default AcademicSection;