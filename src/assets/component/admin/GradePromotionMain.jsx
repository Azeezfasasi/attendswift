import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStudents } from "../../contextAPI/StudentContext";

const GradePromotionMain = () => {
  const { grade, setGrade, section, setSection, students } = useStudents();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [promotionStatus, setPromotionStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setGrade("");
    setSection("");
  }, [setGrade, setSection]);

  // Filter students based on grade and section
  const handleGetStudents = () => {
    if (!students || students.length === 0) {
      setFilteredStudents([]);
      return;
    }

    const filtered = students.filter(
      (student) => student.grade === grade && student.section === section
    );

    setFilteredStudents(filtered);

    // Initialize promotion status
    const initialPromotionStatus = {};
    filtered.forEach((student) => {
      initialPromotionStatus[student._id] = student.promotionStatus || "pending";
    });
    setPromotionStatus(initialPromotionStatus);
  };

  // Update promotion status locally
  const handlePromotionChange = (id, status) => {
    setPromotionStatus((prevStatus) => ({ ...prevStatus, [id]: status }));
  };

  // Submit promotion updates to the backend
  const handlePromoteStudents = async () => {
    setLoading(true);
    try {
      const promotionData = filteredStudents.map((student) => ({
        studentId: student._id,
        status: promotionStatus[student._id],
      }));

      await axios.put("https://attendswift-backend.onrender.com/api/students/promote", {
        promotions: promotionData,
      });

      setMessage("Students' promotion status updated successfully!");
      handleGetStudents(); // Refresh the student list
    } catch (err) {
      console.error("Promotion error:", err);
      setMessage("Error updating promotion status. Try again.");
    } finally {
      setLoading(false);
    }
  };

const handleSetAllPending = async () => {
    setLoading(true);
    try {
      const pendingData = filteredStudents.map((student) => ({
        studentId: student._id,
        status: "Pending",
      }));
  
      await axios.put("https://attendswift-backend.onrender.com/api/students/update/promote", {
        promotions: pendingData,
      });
  
      setMessage("All students set to Pending successfully!");
      handleGetStudents(); // Refresh the list
    } catch (error) {
      console.error("Error setting all to Pending:", error);
      setMessage("Error updating to Pending.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center gap-4 mb-6">
        {/* Class Selection */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Class</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">Select a Class</option>
            {["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"].map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Section Selection */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Section</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="">Select a Section</option>
            {["A", "B"].map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        {/* Get Students Button */}
        <button
          onClick={handleGetStudents}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 mt-[20px]"
        >
          Get Students
        </button>
      </div>

      {/* Student List with Promotion Status */}
      <h2 className="text-lg font-semibold text-[#012970] mb-3">Mark Promotion Status</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
            <tr>
              <th className="p-3">Student ID</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Section</th>
              <th className="p-3">Promotion Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">{item.uniqueId}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.grade}</td>
                  <td className="p-3">{item.section}</td>
                  <td className="p-3">
                    <select
                      value={promotionStatus[item._id]}
                      onChange={(e) => handlePromotionChange(item._id, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Promoted">Promoted</option>
                      <option value="Not eligible">Not Eligible</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No Students found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {message && <p className="mt-3 text-center font-semibold text-sm text-blue-600">{message}</p>}

        {filteredStudents.length > 0 && (
        <>
          <div className="w-full flex flex-col md:flex-row items-center justify-start gap-4 mt-6 mb-6 md:mb-3">
            <button
                onClick={handlePromoteStudents}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 ml-2 "
            >
                {loading ? "Updating..." : "Update Promotion Status"}
            </button>
          </div>
        </>
        )}
        
        <div className=" flex flex-col md:flex-row items-center justify-start gap-4 mt-4 mb-6 md:mb-3 ml-2">
            <button onClick={handleSetAllPending} className="bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-700">
                {loading ? "Setting to Pending..." : "Set All to Pending"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default GradePromotionMain;
