import React, { useState, useEffect } from "react";
import { useSubjects } from "../../contextAPI/SubjectContext";
import { Link } from "react-router-dom";

const CurrentSubjects = () => {
  const { subjects, fetchSubjects, editSubject, deleteSubject } = useSubjects();

  const [section, setSection] = useState("");
  const [grade, setGrade] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Fetch subjects when grade and section are selected
  useEffect(() => {
    if (grade && section) {
      fetchSubjects(grade, section);
    }
  }, [grade, section, fetchSubjects]);

  // Generate subject report based on filters
  const generateReport = () => {
    const filtered = subjects.filter(
      (item) => item.grade === grade && item.section === section
    );
    setFilteredData(filtered);
  };

  // Handle edit initialization
  const handleEdit = (subject) => {
    setEditingSubject(subject._id);
    setUpdatedName(subject.name);
  };

  // Handle edit submission
  const handleEditSubmit = async (id) => {
    await editSubject(id, { name: updatedName });
    setEditingSubject(null);
  };

  // Handle subject deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      await deleteSubject(id);
      generateReport();
    }
  };

  return (
    <div className="container-bg-color container-border-color border bg-gray-100 p-6 rounded-lg shadow-md w-full">
      {/* Filters Section */}
      <div className="container-bg-color bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center gap-4 mb-6">
        <div className="flex flex-col">
          <label className="login-label-text text-sm font-medium text-gray-700">Grade</label>
          <select
            className="input-bg-border border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">Select a Grade</option>
            <option>JSS 1</option>
            <option>JSS 2</option>
            <option>JSS 3</option>
            <option>SSS 1</option>
            <option>SSS 2</option>
            <option>SSS 3</option>
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
            <option>A</option>
            <option>B</option>
          </select>
        </div>

        <button
          onClick={generateReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition mt-[20px]"
        >
          Generate Sheet
        </button>
      </div>

      {/* Subject Report Table */}
     
      <div className="w-full flex flex-row justify-start mb-5">
          <Link
            to="/app/admin/addsubject"
            className="bg-[#0d6efd] text-[15px] rounded-lg px-4 py-2 text-white text-xs"
          >
            Add Subject
          </Link>
      </div>
      <h2 className="logo-link-color text-lg font-semibold text-[#012970] mb-3">Subject Report</h2>
      <div className="container-bg-color container-border border bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
            <tr>
              <th className="p-3">S/N</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Section</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Description</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item._id} className="border-t">
                  <td className="login-label-text p-3">{index + 1}</td>
                  <td className="login-label-text p-3">{item.grade}</td>
                  <td className="login-label-text p-3">{item.section}</td>
                  <td className="login-label-text p-3">
                    {editingSubject === item._id ? (
                      <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="login-label-text p-3">{item.description}</td>
                  <td className="p-3 flex gap-2">
                    {editingSubject === item._id ? (
                      <button
                        onClick={() => handleEditSubmit(item._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Delete
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
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentSubjects;