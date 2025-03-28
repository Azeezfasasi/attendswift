import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function AddSubjectMain() {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    section: '',
    description: ''
  });

  const {t} =useTranslation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting formData: ", formData);

    try {
      const response = await axios.post('https://attendswift-backend.onrender.com/api/subjects', formData);
      alert('Subject added successfully!');
      console.log(response.data);

      // Reset form
      setFormData({
        name: '',
        grade: '',
        section: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding subject:', error);
      alert('Failed to add subject. Please try again.');
    }
  };
  

  return (
    <div className="container-bg-color container-border border w-[95%] lg:w-[70%] bg-[#ffffff] rounded-[5px] flex flex-col gap-2.5 items-start justify-start relative mx-auto lg:mx-0" style={{ boxShadow: "0px 0px 30px 0px rgba(1, 41, 112, 0.1)" }}>
      <div className="w-full lg:w-[100%] pt-5 pr-3 pb-5 pl-3 flex flex-col gap-2 items-start justify-start">

        {/* Title */}
        <div className="logo-link-color text-[#012970] text-left text-lg font-medium">{t("Add a Subject")}</div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-[100%] flex flex-col gap-4">

          {/* Subject Name */}
          <div>
            <label className="login-label-text text-[#444444]">{t("Subject Name")}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="input-bg-border w-full border rounded-md p-2"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="login-label-text text-[#444444]">{t("Grade")}</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="input-bg-border w-full border rounded-md p-2"
            >
              <option value="">{t("Select Grade")}</option>
              <option value="JSS 1">JSS 1</option>
              <option value="JSS 2">JSS 2</option>
              <option value="JSS 3">JSS 3</option>
              <option value="SSS 1">SSS 1</option>
              <option value="SSS 2">SSS 2</option>
              <option value="SSS 3">SSS 3</option>
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="login-label-text text-[#444444]">{t("Section")}</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              className="input-bg-border w-full border rounded-md p-2"
            >
              <option value="">{t("Select Section")}</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="login-label-text text-[#444444]">{t("Description")}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description (Optional)"
              className="input-bg-border w-full border rounded-md p-2"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button type="submit" className="bg-[#0d6efd] text-white rounded-md p-2">{t("Submit")}</button>
            <button type="button" onClick={() => setFormData({ name: '', grade: '', section: '', description: '' })} className="bg-[#6c757d] text-white rounded-md p-2">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubjectMain;