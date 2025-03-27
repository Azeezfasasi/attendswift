import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStudents } from "../../contextAPI/StudentContext";
import LoadingSpinner from "../LoadingSpinner";

const AdminMarkAttendanceMain = () => {
  const { grade, setGrade, section, setSection, students, uniqueId } = useStudents();

  const [showReport, setShowReport] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setGrade("");
    setSection("");
  }, [setGrade, setSection]);

  useEffect(() => {
    console.log("Filtered Students:", filteredStudents);
  }, [filteredStudents]);

  useEffect(() => {
    const initialAttendance = {};
    filteredStudents.forEach((student) => {
      initialAttendance[student._id] = "Select";
    });
    setAttendance(initialAttendance);
  }, [filteredStudents]);

  const handleGetStudents = () => {
    if (!students || students.length === 0) {
      console.warn("No students available.");
      setFilteredStudents([]);
      return;
    }

    const filtered = students.filter(
      (student) => student.grade === grade && student.section === section
    );

    setFilteredStudents(filtered);
    setShowReport(true);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmitAttendance = async () => {
    const attendanceData = filteredStudents.map((student) => ({
      studentId: student._id,
      name: student.name,
      grade: student.grade,
      section: student.section,
      status: attendance[student._id] || "Select",
    }));

    if (attendanceData.some((entry) => entry.status === "Select")) {
      setMessage("⚠️ Please select attendance status for all students.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://attendswift-backend.onrender.com/api/students/mark-attendance",
        { attendance: attendanceData },
        { withCredentials: true }
      );

      setMessage("✅ Attendance submitted successfully!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
      setMessage(`❌ Error: ${error.response?.data?.message || "Failed to submit attendance."}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-bg-color container-border border bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <div className="container-bg-color bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center gap-4 mb-6">
        <div className="flex flex-col">
          <label className="login-label-text text-sm font-medium text-gray-700">Class</label>
          <select
            className="input-bg-border border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">Select a Class</option>
            {["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"].map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="login-label-text text-sm font-medium text-gray-700">Section</label>
          <select
            className="input-bg-border border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="">Select a Section</option>
            {["A", "B"].map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGetStudents}
          className="box bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer mt-[20px]"
        >
          Get Students
        </button>
      </div>

      <h2 className="login-header-text text-lg font-semibold text-[#012970] mb-3">Mark Attendance</h2>

      <div className="container-bg-color container-border border bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
            <tr>
              <th className="p-3">Student ID</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Section</th>
              <th className="p-3">Attendance</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="login-label-text p-3">{item.uniqueId}</td>
                  <td className="login-label-text p-3">{item.name}</td>
                  <td className="login-label-text p-3">{item.grade}</td>
                  <td className="login-label-text p-3">{item.section}</td>
                  <td className="login-label-text p-3">
                    <select
                      className="input-bg-border border px-[10px] py-[5px] rounded"
                      value={attendance[item._id] || "Select"}
                      onChange={(e) => handleAttendanceChange(item._id, e.target.value)}
                    >
                      <option value="Select">Select</option>
                      <option value="present">present</option>
                      <option value="absent">absent</option>
                      <option value="late">late</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="login-label-text p-3 text-center text-gray-500">No records found</td></tr>
            )}
          </tbody>
        </table>

        {message && <p className="mt-3 text-center font-semibold text-sm text-blue-600">{message}</p>}

        {filteredStudents.length > 0 && (
          <button onClick={handleSubmitAttendance} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 ml-2 mb-2">
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminMarkAttendanceMain;
