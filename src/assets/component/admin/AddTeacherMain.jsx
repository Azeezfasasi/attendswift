import { useState } from "react";
import { useProfile } from "../../contextAPI/ProfileContext";

const AddTeacherMain = () => {
  const { register } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    
    const response = await register(formData.name, formData.email, formData.password, formData.role);
    
    if (response.success) {
      setMessage({ type: "success", text: "User registered successfully!" });
      setFormData({ name: "", email: "", password: "", role: "teacher" });
    } else {
      setMessage({ type: "error", text: response.message });
    }
  };

  return (
    <div className="container-bg-color container-border border max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="login-label-text text-2xl font-semibold text-gray-800 mb-4">Add New User</h2>

      {message && (
        <div className={`p-3 mb-4 rounded-md text-sm ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="login-label-text block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-bg-border w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="login-label-text block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-bg-border w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="login-label-text block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-bg-border w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="login-label-text block text-gray-700 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-bg-border w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddTeacherMain;
