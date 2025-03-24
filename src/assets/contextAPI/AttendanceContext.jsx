import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [grade, setGrade] = useState("");
    const [section, setSection] = useState("");
    const [date, setDate] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    // Fetch all students
    const fetchStudents = async () => {
      setLoading(true);
  };

    // Mark student attendance
    const markAttendance = async (studentId, status) => {
      try {
          await axios.post("https://attendswift-backend.onrender.com/api/students/mark-attendance", {
              studentId,
              status,
              date,
              grade,
              section,
          });
          fetchStudents(); // Refresh students
          setAttendanceRecords(await getAttendanceRecords(studentId)); // Update records
      } catch (err) {
          setError(err.message);
      }
  };
  

    // Get attendance records of a student
    const getAttendanceRecords = async (studentId) => {
      try {
          const response = await axios.get(`https://attendswift-backend.onrender.com/${studentId}/attendance`);
          return response.data;
      } catch (err) {
          console.error("Error fetching attendance:", err.message);
          return []; // Ensure function always returns an array
      }
  };

    useEffect(() => {
      fetchStudents();
      setAttendanceRecords([]); // Initialize attendance records
  }, []);
  

    return (
        <AttendanceContext.Provider
            value={{ students, loading, error, markAttendance, getAttendanceRecords, grade, setGrade, section, setSection, date, setDate, attendanceRecords, setAttendanceRecords, }}
        >
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => {
    return useContext(AttendanceContext);
};
