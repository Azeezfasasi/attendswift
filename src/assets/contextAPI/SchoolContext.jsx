import React, { createContext, useContext, useEffect, useState } from "react";

// Create a single context
export const SchoolContext = createContext();

// Custom hook for easy access
export const useSchool = () => useContext(SchoolContext);

// Provider component
export const SchoolProvider = ({ children }) => {
  // ✅ Student State
  const [students, setStudents] = useState(() => {
    const storedStudents = localStorage.getItem("students");
    return storedStudents
      ? JSON.parse(storedStudents)
      : [
          { id: 100001, name: "Azeez Fasasi", grade: "JSS 1", section: "A", age: "13", username: "azeez.fas", email: "azeez@gmail.com" },
          { id: 100002, name: "Wale John", grade: "JSS 2", section: "B", age: "11", username: "wale.john", email: "wale@gmail.com" },
          { id: 100003, name: "Muibat Benson", grade: "JSS 3", section: "A", age: "15", username: "muibat.ben", email: "muibat@gmail.com" }, 
          { id: 100004, name: "Sola Ani", grade: "SSS 1", section: "A", age: "16", username: "sola.ani", email: "sola@gmail.com" },
          { id: 100005, name: "Tolu Ola", grade: "SSS 2", section: "A", age: "12", username: "tolu.ola", email: "tolu@gmail.com" },
          { id: 100006, name: "Titi Ayo", grade: "SSS 3", section: "A", age: "13", username: "titi.ayo", email: "titi@gmail.com" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // ✅ Function to add a new student
  const addStudent = (student) => {
    let maxId = students.length > 0 
      ? Math.max(...students.map(s => parseInt(s.id, 10))) 
      : 100000; // Start from 100000 if empty
  
    const newStudent = { ...student, id: maxId + 1 }; // Increment ID
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  // ✅ Function to delete a student
  const deleteStudent = (id) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.filter((student) => student.id !== id);
      localStorage.setItem("students", JSON.stringify(updatedStudents)); // Update localStorage
      return updatedStudents;
    });
  };

  // ✅ Function to edit a student
  const editStudent = (updatedStudent) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      );
      localStorage.setItem("students", JSON.stringify(updatedStudents)); // Update localStorage
      return updatedStudents;
    });
  };
  
  // ✅ Attendance State
  const [subject, setSubject] = useState(localStorage.getItem("subject") || "");
  const [grade, setGrade] = useState(localStorage.getItem("grade") || "");
  const [section, setSection] = useState(localStorage.getItem("section") || "");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showReport, setShowReport] = useState(false);

  // Load saved attendance from localStorage
  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem("savedAttendance")) || {};
    if (storedAttendance[date]) {
      setAttendanceRecords(storedAttendance[date]);
    } else {
      setAttendanceRecords([]);
    }
  }, [date]);

  // ✅ Generate Attendance Report
  const generateReport = () => {
    if (!grade || !section) {
      alert("Please select a grade and section before generating attendance.");
      return;
    }

    const filtered = students.filter((student) => student.grade === grade && student.section === section);
    const initialAttendance = filtered.map((student) => ({
      id: student.id,
      name: student.name,
      grade: student.grade,
      section: student.section,
      date,
      status: "Present", // Default status
    }));

    setAttendanceRecords(initialAttendance);
    setShowReport(true); // Show the table after generating the report
  };

  // ✅ Mark Attendance
  const markAttendance = (id, status) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) => (record.id === id ? { ...record, status } : record))
    );
  };

  // ✅ Save Attendance (Restricts Future Dates)
  const saveAttendance = () => {
    if (attendanceRecords.length === 0) {
      alert("No attendance records to save.");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      alert("Attendance cannot be marked for a future date.");
      return;
    }
  
    const storedAttendance = JSON.parse(localStorage.getItem("savedAttendance")) || {};
    const key = `${date}_${grade}_${section}`;
    storedAttendance[key] = attendanceRecords;
    localStorage.setItem("savedAttendance", JSON.stringify(storedAttendance));
  
    alert("Attendance saved successfully!");
  };

  return (
    <SchoolContext.Provider
      value={{
        students,
        addStudent,
        deleteStudent,
        editStudent,
        subject,
        setSubject,
        grade,
        setGrade,
        section,
        setSection,
        date,
        setDate,
        attendanceRecords,
        showReport,
        generateReport,
        markAttendance,
        saveAttendance,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
