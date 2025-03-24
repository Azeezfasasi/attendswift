import React, { useState } from "react";
import { useSubjects } from "../../contextAPI/SubjectContext"; // Import Subject Context

const TeacherCurrentSubjects = () => {
  const { subjects, addSubject, editSubject, deleteSubject } = useSubjects(); // Get subjects from context

  const [section, setSection] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [newSubject, setNewSubject] = useState(""); // For adding new subjects
  const [filteredData, setFilteredData] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [editedName, setEditedName] = useState("");

  // Function to filter data when "Generate Sheet" is clicked
  const generateReport = () => {
    const filtered = subjects.filter(
      (item) => item.studentClass === studentClass && item.section === section
    );
    setFilteredData(filtered);
  };

  // Function to handle adding a new subject
  const handleAddSubject = () => {
    if (newSubject.trim() !== "" && studentClass && section) {
      addSubject(newSubject, studentClass, section);
      setNewSubject("");
      alert("Subject added successfully.");
    } else {
      alert("Please select a class and section before adding a subject.");
    }
  };

  // Function to start editing a subject
  const handleEditClick = (subject) => {
    setEditingSubject(subject.id);
    setEditedName(subject.name);
  };

  // Function to save edited subject
  const handleSaveEdit = (id) => {
    if (editedName.trim() !== "") {
      editSubject(id, editedName);
      setEditingSubject(null);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Class</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          >
            <option value="">Select a Class</option>
            <option>JSS 1</option>
            <option>JSS 2</option>
            <option>JSS 3</option>
            <option>SSS 1</option>
            <option>SSS 2</option>
            <option>SSS 3</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Section</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="">Select a Section</option>
            <option>A</option>
            <option>B</option>
          </select>
        </div>

        <button
          onClick={generateReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer mt-[20px]"
        >
          Generate Sheet
        </button>
      </div> 

      {/* Subject Report Table */}
      <h2 className="text-lg font-semibold text-[#012970] mb-3">Subject Report</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
            <tr>
              <th className="p-3">S/N</th>
              <th className="p-3">Class</th>
              <th className="p-3">Section</th>
              <th className="p-3">Subjects</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.studentClass}</td>
                  <td className="p-3">{item.section}</td>
                  <td className="p-3">
                    {editingSubject === item.id ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="border border-gray-300 px-2 py-1 rounded-md"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherCurrentSubjects;

