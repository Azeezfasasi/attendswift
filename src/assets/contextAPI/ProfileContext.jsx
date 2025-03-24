import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://attendswift-backend.onrender.com/api"; // Update for production

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get("https://attendswift-backend.onrender.com/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      return { success: true, user };
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || "An error occurred");
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Register Function
  const register = async (name, email, password, role = "teacher") => {
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password, role });
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error.response?.data?.message || "An error occurred");
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.get(`${API_BASE_URL}/auth/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data?.message || "An error occurred");
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // Fetch user details when token exists
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User API Response:", response.data); // Log the response
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  // Handle user privileges (checking roles)
  const hasPrivilege = (role) => user?.role === role;

  // Request Password Reset
  const requestPasswordReset = async (email) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/request-reset`, { email });
      return { success: true, message: "Password reset link sent" };
    } catch (error) {
      console.error("Password reset error:", error.response?.data?.message || "An error occurred");
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Reset Password
  const resetPassword = async (token, newPassword) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, newPassword });
      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      console.error("Reset password error:", error.response?.data?.message || "An error occurred");
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Profile Image Update
  const updateProfileImage = async (imageFile) => {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "Not authenticated" };

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/update-profile-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response.data);
      return { success: true, message: "Profile image updated", user: response.data };
    } catch (error) {
      console.error("Profile image update error:", error.response?.data?.message || "An error occurred");
      return { success: false, message: error.response?.data?.message };
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchUserDetails,
        hasPrivilege,
        requestPasswordReset,
        resetPassword,
        updateProfileImage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
