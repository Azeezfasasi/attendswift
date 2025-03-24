import React, { useState } from "react";
import { useStudents } from "../../contextAPI/StudentContext";

function AddStudentMain() {
  const { addStudent } = useStudents(); // Use useStudents context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    age: "",
    grade: "",
    gender: "",
    section: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      alert("Student added successfully!");
      setFormData({ name: "", email: "", username: "", password: "", grade: "", gender: "", section: "" });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  

  return (
    <div
      className="w-[95%] lg:w-[70%] bg-[#ffffff] rounded-[5px] flex flex-col gap-2.5 items-start justify-start relative mx-auto lg:mx-0"
      style={{ boxShadow: "0px 0px 30px 0px rgba(1, 41, 112, 0.1)" }}
    >
      <div className="w-full lg:w-[100%] pt-5 pr-3 pb-5 pl-3 flex flex-col gap-2 items-start justify-start shrink-0 relative">
        <div className="text-[#012970] text-[24px] text-left font-['Poppins-Medium',_sans-serif] text-lg leading-[21.6px]relative flex items-center justify-start font-bold">
          Add a Student
        </div>
        <form className="w-[100%] lg:w-[100%] flex flex-col gap-4 items-start justify-start shrink-0 relative" onSubmit={handleSubmit}>
          {/* Full name */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[#444444] text-base">Student Full Name</label>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="border rounded-md w-full p-2" />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[#444444] text-base">Student Email</label>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border rounded-md w-full p-2" />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[#444444] text-base">Student Username</label>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="border rounded-md w-full p-2" />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[#444444] text-base">Student Password</label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="border rounded-md w-full p-2" />
          </div>

          {/* Grade */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[#444444] text-base">Student Class</label>
            <select name="grade" value={formData.grade} onChange={handleChange} required className="border rounded-md w-full p-2">
              <option value="">Select Class</option>
              <option value="JSS 1">JSS 1</option>
              <option value="JSS 2">JSS 2</option>
              <option value="JSS 3">JSS 3</option>
              <option value="SSS 1">SSS 1</option>
              <option value="SSS 2">SSS 2</option>
              <option value="SSS 3">SSS 3</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[#444444] text-base">Age</label>
            <input 
            type="text"
            name="age"
            // value={formData.age}
            value={formData.age || ""}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="Student age"
            className="border rounded-md w-full p-2"
          />
          </div>
          
          {/* Gender */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[#444444] text-base">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required className="border rounded-md w-full p-2">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Section */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[#444444] text-base">Student Section</label>
            <select name="section" value={formData.section} onChange={handleChange} required className="border rounded-md w-full p-2">
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            {/* Submit */}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            {/* Reset */}
            <button type="button" onClick={() => setFormData({ name: "", email: "", username: "", password: "", grade: "", section: "" })} className="bg-gray-500 text-white px-4 py-2 rounded-md">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentMain;
