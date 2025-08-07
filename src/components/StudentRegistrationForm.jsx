import React, { useState } from "react";
import axios from "axios"; // For sending data to backend if needed

const StudentRegistrationForm = ({ next }) => {
  const [formData, setFormData] = useState({
    admission_number: "",
    batch: "",
    name: "",
    gender: "",
    nic_number: "",
    email: "",
    whatsapp_number: "",
    residential_tel: "",
    address: "",
    school: "",
    password: "", // Added password field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Optional: Save student info immediately to backend
      // const response = await axios.post('http://localhost:5000/api/students/register', formData);
      // console.log('Saved:', response.data);

      // Pass data to MultiStep wrapper to go to next step
      next(formData);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-[#b30d0d]">Student Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="admission_number"
          value={formData.admission_number}
          onChange={handleChange}
          placeholder="Admission Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          placeholder="Batch"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            /> Male
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            /> Female
          </label>
        </div>

        <input
          type="text"
          name="nic_number"
          value={formData.nic_number}
          onChange={handleChange}
          placeholder="NIC Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="whatsapp_number"
          value={formData.whatsapp_number}
          onChange={handleChange}
          placeholder="WhatsApp Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="residential_tel"
          value={formData.residential_tel}
          onChange={handleChange}
          placeholder="Residential Telephone"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="school"
          value={formData.school}
          onChange={handleChange}
          placeholder="School"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-firebrick text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Next: Select Courses →
        </button>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
