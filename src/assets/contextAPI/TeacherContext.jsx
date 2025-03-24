import { createContext, useContext, useState, useEffect } from "react";

// Create UserContext
const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

// Create TeacherContext
const TeacherContext = createContext();
export const useTeachers = () => useContext(TeacherContext);

export const UserProvider = ({ children }) => {
  const initialUsers = JSON.parse(localStorage.getItem("users")) || [
    { id: 500001, name: "Admin User", role: "admin", gender: "Male", email: "admin@example.com", username: "admin", password: "admin123" },
    { id: 500002, name: "Azeez Fasasi", role: "teacher", gender: "Male", email: "azeez@gmail.com", username: "azeez.fasasi", password: "azeez1234" },
    { id: 500003, name: "Wale John", role: "teacher", gender: "Female", email: "wale@gmail.com", username: "wale.john", password: "wale1234" },
    { id: 500004, name: "Parent User", role: "parent", gender: "Male", email: "parent@gmail.com", username: "parent", password: "parent123" }
  ];

  const [users, setUsers] = useState(initialUsers);

  // Sync users with localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Add a new user (General)
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, { id: prevUsers.length + 1, ...newUser }]);
  };

  // Delete a user by ID
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Edit user details by ID
  const editUser = (id, updatedDetails) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, ...updatedDetails } : user)));
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, editUser }}>
      {children}
    </UserContext.Provider>
  );
};

// TeacherProvider - Manages teachers specifically
export const TeacherProvider = ({ children }) => {
  const { users, addUser, deleteUser, editUser } = useUsers(); // Get users and functions from UserContext

  // Filter only teachers
  const teachers = users.filter((user) => user.role === "teacher");

  // Add a new teacher
  const addTeacher = (teacherData) => {
    const newId = users.length + 1;
    addUser({ id: newId, ...teacherData, role: "teacher" }); // Ensure role is "teacher"
  };

  // Edit a teacher
  const editTeacher = (id, updatedDetails) => {
    editUser(id, { ...updatedDetails, role: "teacher" }); // Ensure role remains "teacher"
  };

  // Delete a teacher
  const deleteTeacher = (id) => {
    deleteUser(id);
  };

  return (
    <TeacherContext.Provider value={{ teachers, addTeacher, editTeacher, deleteTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
};
