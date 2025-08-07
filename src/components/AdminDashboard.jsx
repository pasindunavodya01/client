import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

export default function AdminDashboard() {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-firebrick">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/register-student">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Register Students</h2>
            <p className="text-gray-600">Add new students to the system.</p>
          </div>
        </Link>

        <Link to="/admin/view-students">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">View All Students</h2>
            <p className="text-gray-600">Browse and search student records.</p>
          </div>
        </Link>

        <Link to="/attendance">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Attendance</h2>
            <p className="text-gray-600">Mark and track student attendance.</p>
          </div>
        </Link>

        <Link to="/marks">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Marks & Eligibility</h2>
            <p className="text-gray-600">Check eligibility and update marks.</p>
          </div>
        </Link>

        <Link to="/fees">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Course Fees</h2>
            <p className="text-gray-600">Track online payments and fees.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
