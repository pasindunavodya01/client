import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-firebrick mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/register-student">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Register Students</h2>
            <p className="text-gray-600">Add new students to the system.</p>
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
