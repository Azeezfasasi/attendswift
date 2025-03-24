import React, { useState, useEffect } from "react";
import { useStudents } from "../../contextAPI/StudentContext"; // Import Student Context

const SubjectReport = () => {
  const {
    grade,
    setGrade,
    section,
    setSection,
    students, // Access students correctly from context
  } = useStudents();

  const [showReport, setShowReport] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Reset filters on page load
  useEffect(() => {
    setGrade("");
    setSection("");
  }, []);

  const handleGetStudents = () => {
   

    // Ensure students exist before filtering
    if (!students || students.length === 0) {
      console.warn("No students available.");
      setFilteredStudents([]);
      return;
    }

    // Filter students based on selected grade and section
    const filtered = students.filter(
      (student) => student.grade === grade && student.section === section
    );

    setFilteredStudents(filtered);
    setShowReport(true);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      {/* Filters Section */}
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
              <option key={cls} value={cls}>
                {cls}
              </option>
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
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {/* Get Students Button */}
        <button
          onClick={handleGetStudents}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer mt-[20px]"
        >
          Get Students
        </button>
      </div>

      {/* Students Table */}
      <h2 className="text-lg font-semibold text-[#012970] mb-3">Subject Report</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
            <tr>
              <th className="p-3">Student ID</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Section</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {showReport ? (
              filteredStudents.length > 0 ? (
                filteredStudents.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{item.uniqueId}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.grade}</td>
                    <td className="p-3">{item.section}</td>
                    <td className="p-3">
                      <button
                        className="border px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => setSelectedStudent(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  Click "Get Students" to load data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/3">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Student Details</h3>
            <p><strong>Student ID:</strong> {selectedStudent.uniqueId}</p>
            <p><strong>Student Name:</strong> {selectedStudent.name}</p>
            <p><strong>Class:</strong> {selectedStudent.grade}</p>
            <p><strong>Section:</strong> {selectedStudent.section}</p>
            <p><strong>Age:</strong> {selectedStudent.age}</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectReport;
