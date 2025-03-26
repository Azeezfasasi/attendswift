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
  // const [handleSubmit, setHandleSubmit] = useState();
  const [presentStudentsToday, setPresentStudentsToday] = useState(0);
  const [absentStudentsToday, setAbsentStudentsToday] = useState(0);
  const [absentChange, setAbsentChange] = useState(0);
  const [presentChange, setPresentChange] = useState(0);
  const [error, setError] = useState(null);


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
}, [API_BASE_URL]);

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

// Fetch Attendance Data
// const fetchAttendanceData = async () => {
//   try {
//       setLoading(true);

//       // Get today's date at 12:00 AM and 11:59 PM in local time
//       const todayStart = new Date();
//       todayStart.setHours(0, 0, 0, 0);

//       const todayEnd = new Date();
//       todayEnd.setHours(23, 59, 59, 999);

//       // Convert local time to UTC
//       const todayStartUTC = new Date(todayStart.getTime() - todayStart.getTimezoneOffset() * 60000);
//       const todayEndUTC = new Date(todayEnd.getTime() - todayEnd.getTimezoneOffset() * 60000);

//       const todayStartISO = todayStartUTC.toISOString();
//       const todayEndISO = todayEndUTC.toISOString();

//       console.log("Fetching attendance between:", todayStartISO, "and", todayEndISO);

//       const response = await axios.get(`${API_BASE_URL}/attendance`);

//       console.log("API Response Data:", response.data);

//       const students = Array.isArray(response.data) ? response.data : [response.data];

//       const attendanceRecords = students.flatMap((student) =>
//         student.attendance
//             ? student.attendance.filter((record) => {
//                 const recordDate = new Date(record.date).getTime();
//                 const startOfDay = new Date(todayStartISO).getTime();
//                 const endOfDay = new Date(todayEndISO).getTime();

//                 return recordDate >= startOfDay && recordDate <= endOfDay;
//             })
//             : []
//     );

//       console.log("Filtered Attendance Records:", attendanceRecords);

//       const presentCount = attendanceRecords.filter((record) => record.status === "present").length;
//       const absentCount = attendanceRecords.filter((record) => record.status === "absent").length;

//       console.log("Present Count:", presentCount); // Verify presentCount
//         console.log("Absent Count:", absentCount); // Verify absentCount

//       setPresentStudentsToday(presentCount);
//       setAbsentStudentsToday(absentCount);
//       setAttendanceRecords(attendanceRecords);
//   } catch (error) {
//       console.error("Error fetching attendance data:", error);
//       setError(error.message);
//   } finally {
//       setLoading(false);
//   }
// };
const fetchAttendanceData = async () => {
  try {
    setLoading(true);

    // Get today's date at 12:00 AM and 11:59 PM in local time
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Convert local time to UTC
    const todayStartUTC = new Date(todayStart.getTime() - todayStart.getTimezoneOffset() * 60000);
    const todayEndUTC = new Date(todayEnd.getTime() - todayEnd.getTimezoneOffset() * 60000);

    const todayStartISO = todayStartUTC.toISOString();
    const todayEndISO = todayEndUTC.toISOString();

    console.log("Fetching attendance between:", todayStartISO, "and", todayEndISO);

    const response = await axios.get(`${API_BASE_URL}/attendance`);

    console.log("API Response Data:", response.data);

    // Ensure response is always handled as an array
    const students = Array.isArray(response.data) ? response.data : [response.data];

    const attendanceRecords = students.flatMap((student) =>
      student.attendance
        ? student.attendance.filter((record) => {
            const recordDate = new Date(record.date).getTime();
            const startOfDay = new Date(todayStartISO).getTime();
            const endOfDay = new Date(todayEndISO).getTime();

            return recordDate >= startOfDay && recordDate <= endOfDay;
          })
        : []
    );

    console.log("Filtered Attendance Records:", attendanceRecords);

    const presentCount = attendanceRecords.filter((record) => record.status === "present").length;
    const absentCount = attendanceRecords.filter((record) => record.status === "absent").length;

    console.log("Present Count:", presentCount);
    console.log("Absent Count:", absentCount);

    setPresentStudentsToday(presentCount);
    setAbsentStudentsToday(absentCount);
    setAttendanceRecords(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAttendanceData();
}, []);

useEffect(() => {
  const totalStudents = presentStudentsToday + absentStudentsToday;

  if (totalStudents > 0) {
    setPresentChange(((presentStudentsToday / totalStudents) * 100).toFixed(1));
    setAbsentChange(((absentStudentsToday / totalStudents) * 100).toFixed(1));
  }
}, [presentStudentsToday, absentStudentsToday]);


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
        presentStudentsToday,
        absentStudentsToday,
        presentChange, 
        absentChange,
        error
      }}
    >
      {children}
    </AbsenceContext.Provider>
  );
};
