import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    course_name: '',
    amount: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load courses');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        // Update existing course
        await axios.put(`http://localhost:5000/api/courses/${editingCourse.course_id}`, formData);
        alert('Course updated successfully!');
      } else {
        // Add new course
        await axios.post('http://localhost:5000/api/courses', formData);
        alert('Course added successfully!');
      }
      
      setFormData({ course_name: '', amount: '' });
      setEditingCourse(null);
      setShowAddForm(false);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      course_name: course.course_name,
      amount: course.amount.toString()
    });
    setShowAddForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
        alert('Course deleted successfully!');
        fetchCourses();
      } catch (err) {
        setError(err.response?.data?.error || 'Delete failed');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ course_name: '', amount: '' });
    setEditingCourse(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-md mt-6">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="max-w-4xl w-full bg-white p-6 shadow-md rounded-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#b30d0d]">Manage Courses</h2>
          <div className="space-x-2">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-deepRed text-white px-4 py-2 rounded hover:bg-darkRed"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-firebrick text-white px-4 py-2 rounded hover:bg-darkRed"
            >
              Add New Course
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Course Name</label>
                <input
                  type="text"
                  name="course_name"
                  value={formData.course_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (Rs.)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Courses List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course ID
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount (Rs.)
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.course_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.course_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.course_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rs. {parseFloat(course.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.course_id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {courses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No courses found. Add your first course!
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
