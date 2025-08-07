import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseSelectionForm = ({ prev, next, formData }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const toggleCourse = (id) => {
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next({ ...formData, courses: selectedCourses });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#b30d0d]">Select Courses</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {courses.map((course) => (
          <label key={course.course_id} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={course.course_id}
              checked={selectedCourses.includes(course.course_id)}
              onChange={() => toggleCourse(course.course_id)}
            />
            {course.course_name} - ${course.amount}
          </label>
        ))}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={prev}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-firebrick text-white px-4 py-2 rounded"
          >
            Next: Payment →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseSelectionForm;
