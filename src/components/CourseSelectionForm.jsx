import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseSelectionForm = ({ prev, next, formData }) => {
  const [courses, setCourses] = useState([]);
  // Initialize selectedCourses with existing courses if any
  const [selectedCourses, setSelectedCourses] = useState(formData?.courses || []);
  const navigate = useNavigate();

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
        console.log("Available courses:", res.data); // Debug log
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const toggleCourse = (id) => {
    console.log("Toggling course:", id); // Debug log
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      courses: selectedCourses
    };
    next(updatedFormData);
  };

  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
          <p className="text-red-500">No courses available to select.</p>
          <button
            type="button"
            className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={prev}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="max-w-2xl w-full bg-white p-6 shadow-md rounded-md mx-auto relative">
        <button
          type="button"
          className="absolute top-4 right-4 bg-red-400 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => navigate('/admin/dashboard')}
        >
          Cancel
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#b30d0d] text-center">Select Courses</h2>
        {/* Debug section */}
        <div className="mb-4 text-sm text-gray-500">
          <p>Selected courses: {JSON.stringify(selectedCourses)}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {courses.map((course) => (
            <label key={course.course_id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={course.course_id}
                checked={selectedCourses.includes(course.course_id)}
                onChange={() => toggleCourse(course.course_id)}
              />
              {course.course_name} - Rs.{course.amount}
            </label>
          ))}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={prev}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-firebrick text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Next: Payment →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseSelectionForm;
