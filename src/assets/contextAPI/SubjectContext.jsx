import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const SubjectContext = createContext();

// Custom Hook to use Subject Context
export const useSubjects = () => useContext(SubjectContext);

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const apiUrl = "https://attendswift-backend.onrender.com/api/subjects";

  // Fetch subjects from backend (updated to use 'grade' instead of 'class')
const fetchSubjects = async (grade, section) => {
  try {
    if (!grade || !section) {
      return;
    }

    const response = await axios.get(apiUrl, {
      params: { grade, section }, // ✅ Ensure correct param names
      withCredentials: true,
    });

    setSubjects(response.data);
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }
};


  // Add new subject (updated to use 'grade' instead of 'class')
  const addSubject = async (subjectData) => {
    try {
      console.log("Sending data to backend:", subjectData);
      const response = await axios.post(apiUrl, subjectData, {
        withCredentials: true,
      });
      console.log("Response from backend:", response.data);

      setSubjects((prevSubjects) => [...prevSubjects, response.data.subject]);
      alert("Subject added successfully.");
    } catch (error) {
      console.error("Error adding subject:", error?.response?.data || error);
    }
  };

  // Edit a subject
  const editSubject = async (id, updatedData) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedData, {
        withCredentials: true,
      });
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject._id === id ? response.data.subject : subject
        )
      );
      alert("Subject updated successfully.");
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  // Delete a subject
  const deleteSubject = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`, { withCredentials: true });
      setSubjects((prevSubjects) =>
        prevSubjects.filter((subject) => subject._id !== id)
      );
      alert("Subject deleted successfully.");
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  useEffect(() => {
    fetchSubjects(); // Ensure you provide grade and section when calling this
  }, []);

  return (
    <SubjectContext.Provider
      value={{ subjects, fetchSubjects, addSubject, editSubject, deleteSubject }}
    >
      {children}
    </SubjectContext.Provider>
  );
};
