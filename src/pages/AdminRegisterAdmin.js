import React, { useState } from "react";
import axios from "axios";

const AdminRegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admins/register", formData);
      alert("Admin registered successfully!");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Register New Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block font-semibold mb-1">{key.replaceAll("_", " ")}</label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Register New Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterAdmin;
