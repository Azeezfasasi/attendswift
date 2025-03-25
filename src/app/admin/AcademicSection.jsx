import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import AdminHeader from "../../assets/component/AdminHeader";
import AdminDashLeft from "../../assets/component/AdminDashLeft";

const AcademicSection = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    AcademicSession: "",
    startDate: "",
    endDate: "",
    terms: "",
    isCurrent: false,
  });
  const [loading, setLoading] = useState(true);

  // Fetch all sessions
  const fetchSessions = async () => {
    try {
      const response = await axios.get("https://attendswift.netlify.app/api/sessions");
      setSessions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sessions", error);
      setLoading(false);
    }
  };

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

  // Add new session
  const handleAddSession = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://attendswift.netlify.app/api/sessions", newSession);
      alert("Session added successfully");
      fetchSessions();
      setNewSession({ AcademicSession: "", startDate: "", endDate: "", terms: "", isCurrent: false });
    } catch (error) {
      console.error("Error adding session", error);
      alert("Failed to add session");
    }
  };

  // Delete a session
  const handleDeleteSession = async (id) => {
    try {
      await axios.delete(`https://attendswift.netlify.app/api/sessions/${id}`);
      alert("Session deleted successfully");
      fetchSessions();
    } catch (error) {
      console.error("Error deleting session", error);
      alert("Failed to delete session");
    }
  };

  // Set a session as current
  const handleSetCurrent = async (id) => {
    try {
      await axios.patch(`https://attendswift.netlify.app/api/sessions/${id}/setCurrent`);
      alert("Session set as current");
      fetchSessions();
    } catch (error) {
      console.error("Error updating current session", error);
      alert("Failed to update current session");
    }
  };

  if (loading) return <p>Loading sessions...</p>;

  return (
    <>
    <Helmet>
        <title>Absense | AttendSwift</title>
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
                name="AcademicSession"
                placeholder="e.g., 2024/2025"
                value={newSession.AcademicSession}
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
              {/* <input
                type="text"
                name="terms"
                placeholder="e.g., First Term"
                value={newSession.terms}
                onChange={handleChange}
                required
              /> */}
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

              <button type="submit">Add Session</button>
            </form>

            {/* Display existing sessions */}
            <h3>Existing Sessions:</h3>
            {sessions.length === 0 ? (
              <p>No sessions available</p>
            ) : (
              sessions.map((session) => (
                <div key={session._id}>
                  <p>
                    {session.AcademicSession} ({session.terms}) - {" "}
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
