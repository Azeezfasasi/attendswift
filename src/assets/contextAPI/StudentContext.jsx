import { createContext, useContext, useReducer, useState, useEffect } from "react";
import { fetchStudents, addStudent as apiAddStudent, editStudent as apiEditStudent } from "../../services/api";

const StudentsContext = createContext();

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_STUDENTS":
      return { ...state, students: action.payload, loading: false };
    case "ADD_STUDENT":
      return { ...state, students: [...state.students, action.payload], loading: false };
    case "EDIT_STUDENT":
      return {
        ...state,
        students: state.students.map(student => student._id === action.payload._id ? action.payload : student),
        loading: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const StudentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentsReducer, initialState);
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");
  // const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

const loadStudents = async () => {
  dispatch({ type: "SET_LOADING" });
  try {
      const data = await fetchStudents();
      dispatch({ type: "SET_STUDENTS", payload: data });
  } catch (error) {
      console.error("Error loading students:", error.message);
      dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

  const addStudent = async (studentData) => {
    try {
      console.log("Sending student data:", studentData);
      const newStudent = await apiAddStudent(studentData);
      console.log("API Response:", newStudent);
      dispatch({ type: "ADD_STUDENT", payload: newStudent });
    } catch (error) {
      console.error("Error adding student:", error.response?.data || error.message);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };
  

  const editStudent = async (studentId, updates) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const updatedStudent = await apiEditStudent(studentId, updates);
      dispatch({ type: "EDIT_STUDENT", payload: updatedStudent });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <StudentsContext.Provider value={{ ...state, loadStudents, addStudent, editStudent, setGrade, setSection, setDate, grade, section, totalStudents: state.students.length }}>
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudents = () => useContext(StudentsContext);
