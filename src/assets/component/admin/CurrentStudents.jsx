import React, { useState, useEffect } from "react";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchStudents, editStudent, deleteStudent } from "../../../services/api";
import { useTranslation } from 'react-i18next';

const CurrentStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const {t} =useTranslation();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({ ...student, password: "" });
  };

  const handleSave = async () => {
    try {
      await editStudent(editingStudent._id, editingStudent);
      loadStudents();
      setEditingStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleChange = (e) => {
    setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
  };

  const filteredStudents = students?.filter(student =>
    student.name?.toLowerCase().includes(search.toLowerCase()) ||
    student.email?.toLowerCase().includes(search.toLowerCase()) ||
    student.username?.toLowerCase().includes(search.toLowerCase()) ||
    // student.uniquId?.includes(search) ||
    String(student.uniqueId).includes(search) ||
    student.grade?.toLowerCase().includes(search.toLowerCase()) ||
    student.section?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="container-bg-color bg-white p-5 rounded-lg shadow-md w-full">
      <div className="w-full flex flex-row justify-end mb-5">
        <Link to="/app/admin/AddStudent" className="bg-[#0d6efd] rounded-lg px-4 py-2 text-white text-xs">
          {t("Add Students")}
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <h2 className="logo-link-color text-lg font-semibold text-[#012970]">{t("Current Students")}</h2>
        <input
          type="text"
          placeholder="Search..."
          className="input-bg-border border border-gray-300 rounded-md px-3 py-1 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="input-bg-border border w-full border-collapse rounded">
          <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
            <tr>
              <th className="p-3">{t("Student ID")}</th>
              <th className="p-3">{t("Student Name")}</th>
              <th className="p-3">{t("Grade")}</th>
              <th className="p-3">{t("Section")}</th>
              <th className="p-3">{t("Age")}</th>
              <th className="p-3">{t("Gender")}</th>
              <th className="p-3">{t("Email")}</th>
              <th className="p-3">{t("Action")}</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {currentStudents.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="login-label-text p-3">{student.uniqueId}</td>
                <td className="login-label-text p-3">{student.name}</td>
                <td className="login-label-text p-3">{student.grade}</td>
                <td className="login-label-text p-3">{student.section}</td>
                <td className="login-label-text p-3">{student.age} years</td>
                <td className="login-label-text p-3">{student.gender}</td>
                <td className="login-label-text p-3">{student.email}</td>
                <td className="login-label-text p-3 flex gap-2">
                  <button className="login-label-text text-gray-500 hover:text-gray-700" onClick={() => handleEdit(student)}>
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(student._id)}
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button 
          className={`px-4 py-2 bg-gray-300 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`} 
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t("Back")}
        </button>
        <span className="text-sm font-medium">{t("Page")} {currentPage} {t("of")} {totalPages}</span>
        <button 
          className={`px-4 py-2 bg-gray-300 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`} 
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
};

export default CurrentStudents;
