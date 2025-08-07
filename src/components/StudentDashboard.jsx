import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError('No user logged in');
          setLoading(false);
          return;
        }

        // Get student data using Firebase UID
        const response = await axios.get(`http://localhost:5000/api/students/profile/${user.uid}`);
        setStudentData(response.data.student);
        setCourses(response.data.courses);
        setPayments(response.data.payments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to load student data');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-firebrick">Student Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Student Information */}
        {studentData && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {studentData.name}</p>
                <p><strong>Admission Number:</strong> {studentData.admission_number}</p>
                <p><strong>Batch:</strong> {studentData.batch}</p>
                <p><strong>Email:</strong> {studentData.email}</p>
              </div>
              <div>
                <p><strong>WhatsApp:</strong> {studentData.whatsapp_number}</p>
                <p><strong>Phone:</strong> {studentData.residential_tel}</p>
                <p><strong>Gender:</strong> {studentData.gender}</p>
                <p><strong>School:</strong> {studentData.school}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enrolled Courses */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
          {courses.length > 0 ? (
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.course_id} className="border p-3 rounded">
                  <h3 className="font-semibold">{course.course_name}</h3>
                  <p className="text-gray-600">Amount: Rs. {course.amount}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No courses enrolled</p>
          )}
        </div>

        {/* Payment History */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          {payments.length > 0 ? (
            <div className="space-y-3">
              {payments.map((payment, index) => (
                <div key={index} className="border p-3 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Course: {payment.course_name}</p>
                      <p className="text-sm text-gray-600">Type: {payment.payment_type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Paid: Rs. {payment.amount_paid}</p>
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
  );
}
