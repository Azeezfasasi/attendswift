import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useSchool } from "../../contextAPI/SchoolContext";

const CurrentStudents = () => {
  const { students, deleteStudent, editStudent } = useSchool();
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  const handleSave = () => {
    editStudent(editingStudent);
    setEditingStudent(null);
  };

  const handleChange = (e) => {
    setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
  };

  const filteredStudents = students?.filter(student =>
    student.name?.toLowerCase().includes(search.toLowerCase()) ||
    student.email?.toLowerCase().includes(search.toLowerCase()) ||
    student.username?.toLowerCase().includes(search.toLowerCase()) ||
    student.id?.toString().includes(search.toLowerCase()) ||
    student.grade?.toLowerCase().includes(search.toLowerCase()) ||
    student.section?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-[#012970]">Current Students</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
            <tr>
              <th className="p-3">Student ID</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Section</th>
              <th className="p-3">Email</th>
              <th className="p-3">Username</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.grade}</td>
                <td className="p-3">{student.section}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-semibold mb-3">Edit Student</h2>
            <div className="flex flex-col gap-2">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editingStudent.name}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                placeholder="Student Name"
              />
              
              <label>Grade</label>
              <select name="grade" value={editingStudent.grade} onChange={handleChange} className="border rounded-md p-2 w-full">
                <option value="">Select Grade</option>
                <option value="JSS 1">JSS 1</option>
                <option value="JSS 2">JSS 2</option>
                <option value="JSS 3">JSS 3</option>
                <option value="SSS 1">SSS 1</option>
                <option value="SSS 2">SSS 2</option>
                <option value="SSS 3">SSS 3</option>
              </select>

              <label>Section</label>
              <select name="section" value={editingStudent.section} onChange={handleChange} className="border rounded-md p-2 w-full">
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editingStudent.email}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                placeholder="Email"
              />

              <label>Username</label>
              <input
                type="text"
                name="username"
                value={editingStudent.username}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                placeholder="Username"
              />

              {/* Change Password */}
              <label>Change Password</label>
              <input
                type="password"
                name="password"
                value={editingStudent.password}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                placeholder="New Password"
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => setEditingStudent(null)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentStudents;
