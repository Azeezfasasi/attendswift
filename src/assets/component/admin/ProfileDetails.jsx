import { useState } from "react";
import { useProfile } from "../../contextAPI/ProfileContext";
import axios from "axios";

const ProfileEdit = () => {
  const { user, fetchUserDetails, updateProfileImage } = useProfile();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "teacher",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User not authenticated.");
        return;
      }

      // Update profile details
      await axios.put(
        "https://attendswift-backend.onrender.com/api/auth/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Handle profile image upload
      if (profileImage) {
        const imageData = new FormData();
        imageData.append("profileImage", profileImage);

        await axios.put(
          "https://attendswift-backend.onrender.com/api/auth/update-profile-image",
          imageData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setMessage("Profile updated successfully.");
      fetchUserDetails(); // ✅ Refresh user details
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile.");
      console.error("Profile update error:", error.response?.data || error);
    }
  };

  return (
    <div className="container-bg-color container-border border max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {message && <p className="text-blue-800">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-bg-border w-full border rounded p-2"
          >
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Profile Image */}
        <div>
          <label className="block font-medium">Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
