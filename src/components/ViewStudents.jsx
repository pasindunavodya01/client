import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  useEffect(() => {
    // Filter students based on search term
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.admission_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students/all');
      setStudents(response.data.students);
      setFilteredStudents(response.data.students);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students');
      setLoading(false);
    }
  };

  const handleStudentClick = async (student) => {
    try {
      // Fetch detailed student information including courses and payments
      const response = await axios.get(`http://localhost:5000/api/students/profile/${student.uid}`);
      setSelectedStudent(response.data);
      setShowStudentDetails(true);
    } catch (err) {
      console.error('Error fetching student details:', err);
      setError('Failed to load student details');
    }
  };

  const closeStudentDetails = () => {
    setShowStudentDetails(false);
    setSelectedStudent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-firebrick">View All Students</h1>
          <Link
            to="/admin/dashboard"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-600 mb-2">Search Students</label>
              <input
                type="text"
                placeholder="Search by admission number, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setSearchTerm('')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.uid} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.admission_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.batch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.whatsapp_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleStudentClick(student)}
                        className="text-firebrick hover:text-deepRed font-semibold"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Details Modal */}
        {showStudentDetails && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-firebrick">
                    Student Details - {selectedStudent.student.name}
                  </h2>
                  <button
                    onClick={closeStudentDetails}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Student Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {selectedStudent.student.name}</p>
                      <p><strong>Admission Number:</strong> {selectedStudent.student.admission_number}</p>
                      <p><strong>Email:</strong> {selectedStudent.student.email}</p>
                      <p><strong>Batch:</strong> {selectedStudent.student.batch}</p>
                      <p><strong>Gender:</strong> {selectedStudent.student.gender}</p>
                      <p><strong>NIC Number:</strong> {selectedStudent.student.nic_number}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <p><strong>WhatsApp:</strong> {selectedStudent.student.whatsapp_number}</p>
                      <p><strong>Phone:</strong> {selectedStudent.student.residential_tel}</p>
                      <p><strong>School:</strong> {selectedStudent.student.school}</p>
                      <p><strong>Address:</strong> {selectedStudent.student.address}</p>
                    </div>
                  </div>
                </div>

                {/* Enrolled Courses */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Enrolled Courses</h3>
                  {selectedStudent.courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedStudent.courses.map((course) => (
                        <div key={course.course_id} className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold">{course.course_name}</h4>
                          <p className="text-gray-600">Amount: Rs. {course.amount}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No courses enrolled</p>
                  )}
                </div>

                {/* Payment History */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Payment History</h3>
                  {selectedStudent.payments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedStudent.payments.map((payment, index) => (
                        <div key={index} className="bg-green-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">Course: {payment.course_name}</p>
                              <p className="text-sm text-gray-600">Type: {payment.payment_type}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">Paid: Rs. {payment.amount_paid}</p>
                              <p className="text-sm text-gray-600">Due: Rs. {payment.amount_due}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No payment history available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
