import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create Context
const AbsenceContext = createContext();

// Custom Hook
export const useAbsence = () => {
  return useContext(AbsenceContext);
};

// Provider Component
export const AbsenceProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [absences, setAbsences] = useState();
  const [handleSubmit, setHandleSubmit] = useState();
  const [presentStudentsToday, setPresentStudentsToday] = useState(0);
  const [absentStudentsToday, setAbsentStudentsToday] = useState(0);


  // API Base URL
  const API_BASE_URL = "https://attendswift-backend.onrender.com/api/students";

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/filter`);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // Fetch students by class
  const fetchStudentsByClass = async (studentClass) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/filter?studentClass=${studentClass}`);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // Mark attendance
  const markAttendance = async (studentId, status) => {
    try {
      await axios.post(`${API_BASE_URL}/mark-attendance`, {
        studentId,
        status
      });
      alert("Attendance marked successfully!");
      fetchStudentsByClass(selectedClass); // Refresh student list
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  // Fetch past attendance records for a student
  const fetchAttendanceRecords = async (studentId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/attendance/${studentId}`);
      setAttendanceRecords(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      setLoading(false);
    }
  };

  // Fetch students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch Absense
useEffect(() => {
  const fetchAbsences = async () => {
      setLoading(true);
      try {
          const response = await axios.get(API_BASE_URL + '/absence-requests');
          setAbsences(response.data);
      } catch (error) {
          console.error("Error fetching absences:", error);
      } finally {
          setLoading(false);
      }
  };
  fetchAbsences();
}, [API_BASE_URL]); // Add API_BASE_URL to the dependency array.

//submitAbsenceRequest
const submitAbsenceRequest = async (studentId, reason) => {
  try {
      const response = await axios.post(API_BASE_URL + '/absence-request', {
          studentId,
          reason
      });
      console.log(response.data.message); 
  } catch (error) {
      console.error("Failed to submit absence request:", error);
  }
};

const updateAbsenceRequest = async (studentId, absenceId, status) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/absence-request/${studentId}`, {
        absenceId,
        status,
      });

      if (response.status === 200) {
          console.log("Absence request updated successfully:", response.data.message);
      } else {
          console.error("Failed to update absence request. Status:", response.status, "Data:", response.data);
          // Optionally, display an error message to the user
          alert(`Failed to update. Status: ${response.status}. Check console for details.`);
      }
  } catch (error) {
      console.error("Error updating absence request:", error);
      // Optionally, display a generic error message to the user
      alert("An error occurred while updating the request. Check console for details.");
  }
};

useEffect(() => {
  const fetchAttendanceData = async () => {
      try {
          const today = new Date().toISOString().split('T')[0];
          const response = await axios.get(`${API_BASE_URL}/attendance?date=${today}`);
          const presentCount = response.data.filter(record => record.status?.toLowerCase() === 'present').length;
          const absentCount = response.data.filter(record => record.status?.toLowerCase() === 'absent').length;

          setPresentStudentsToday(presentCount);
          setAbsentStudentsToday(absentCount);
      } catch (error) {
          // console.error("Error fetching attendance data:", error);
      }
  };

  fetchAttendanceData();
},);

  return (
    <AbsenceContext.Provider
      value={{
        students,
        selectedClass,
        setSelectedClass,
        fetchStudentsByClass,
        markAttendance,
        attendanceRecords,
        fetchAttendanceRecords,
        loading,
        submitAbsenceRequest,
        updateAbsenceRequest,
        absences,
        handleSubmit,
        setHandleSubmit,
        presentStudentsToday,
        absentStudentsToday
      }}
    >
      {children}
    </AbsenceContext.Provider>
  );
};
