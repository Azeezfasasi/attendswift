import React, { useState, useEffect } from "react";
import { useProfile } from "../../contextAPI/ProfileContext";
import axios from "axios";
import { Pencil, Trash, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://attendswift-backend.onrender.com/api";

const CurrentUsers = () => {
  const { user, hasPrivilege } = useProfile();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // 🔹 Page state
  const usersPerPage = 10; // 🔹 Limit per page

  // Fetch all users (only if admin)
  useEffect(() => {
    if (hasPrivilege("admin")) {
      axios
        .get(`${API_BASE_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [hasPrivilege]);
  

  // Filter users based on search
   const filteredUsers = users.filter((user) =>
    [user.name?.toLowerCase(), user.email?.toLowerCase(), user.username?.toLowerCase(), user._id?.toString()]
      .filter(Boolean)
      .some((field) => field.includes(search.toLowerCase()))
  );

  // 🔹 Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // 🔹 Get users for the current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  

  const handleEdit = (user) => {
    setEditingId(user._id); // Set the editing user only
    setEditData({
      name: user.name,
      role: user.role,
      email: user.email,
    });
  };
  

  // Handle save button click
  const handleSave = () => {
    if (editingId !== null) {
      axios
        .put(`${API_BASE_URL}/auth/users/${editingId}`, editData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setUsers(users.map((u) => (u._id === editingId ? response.data : u)));
          setEditingId(null);
          setEditData({});
        })
        .catch((error) => console.error("Error updating user:", error));
    }
  }; 

  // Handle cancel button click
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  // Handle delete user
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${API_BASE_URL}/auth/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => setUsers(users.filter((u) => u._id !== userId)))
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold text-[#012970] mb-3">All Users</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="E.g. name, role or email"
        className="border border-gray-300 rounded-md px-3 py-1 text-sm mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Users Table */}
      <div className="overflow-x-auto">
        <div className="flex flex-row justify-end items-center mb-3">
            <Link to="/app/admin/addteacher" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">
              Add Users
            </Link>
          </div>
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-left text-[#012970] text-sm font-medium">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Email</th>
              {hasPrivilege("admin") && <th className="p-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {currentUsers.map((user) => (
              <tr key={`${user._id}-${user.email}`} className="border-t">
                {editingId === user._id ? ( // Only edit the selected row
                  <>
                    <td className="p-3">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        value={editData.role}
                        onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      >
                        {/* Ensure this does not create multiple rows */}
                        {["admin", "teacher", "student"].map((role, index) => (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-3 flex gap-2">
                      <button className="text-green-500 hover:text-green-700" onClick={handleSave}>
                        <Check size={24} />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={handleCancel}>
                        <X size={24} />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 flex gap-2">
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => handleEdit(user)}>
                          <Pencil size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(user._id)}>
                          <Trash size={18} />
                        </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>


        </table>
      </div>

      {/* ⏭ Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>

        {/* Showing "10 of 20" */}
        <span className="text-sm">
          {startIndex + 1} - {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CurrentUsers;

