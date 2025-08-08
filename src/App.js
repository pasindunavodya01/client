import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import MultiStepRegistration from "./components/MultiStepRegistration";
import AddPaymentForm from "./components/AddPaymentForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRegister from "./pages/AdminRegister";
import ViewStudents from "./components/ViewStudents";
import ManagePayments from "./components/ManagePayments";
import ManageCourses from "./components/ManageCourses";
import AdminRegisterAdmin from "./pages/AdminRegisterAdmin";
import ViewAdmins from "./components/ViewAdmins";


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div
      className={`${
        isLoginPage
          ? "min-h-screen flex items-center justify-center px-4 bg-gray-100"
          : "bg-gray-100 min-h-screen"
      }`}
    >
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={
            <div className="w-full max-w-md">
              <Login />
            </div>
          }
        />

        {/* Admin Registration (for testing) */}
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Admin Dashboard */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* View All Students */}
        <Route 
          path="/admin/view-students" 
          element={
            <ProtectedRoute requiredRole="admin">
              <ViewStudents />
            </ProtectedRoute>
          } 
        />

        {/* Manage Payments */}
        <Route 
          path="/admin/manage-payments" 
          element={
            <ProtectedRoute requiredRole="admin">
              <ManagePayments />
            </ProtectedRoute>
          } 
        />

        {/* Manage Courses */}
        <Route 
          path="/admin/manage-courses" 
          element={
            <ProtectedRoute requiredRole="admin">
              <ManageCourses />
            </ProtectedRoute>
          } 
        />

        {/* Student Dashboard */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Multi-Step Student Registration */}
        <Route 
          path="/admin/register-student" 
          element={
            <ProtectedRoute requiredRole="admin">
              <MultiStepRegistration />
            </ProtectedRoute>
          } 
        />

        {/* Add Payment Form */}
        <Route 
          path="/admin/payments/add" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AddPaymentForm />
            </ProtectedRoute>
          } 
        />

        {/* Admin Register New Admin */}
        <Route 
          path="/admin/register-admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminRegisterAdmin />
            </ProtectedRoute>
          } 
        />


<Route
  path="/admin/view-admins"
  element={
    <ProtectedRoute requiredRole="admin">
      <ViewAdmins />
    </ProtectedRoute>
  }
/>

      </Routes>
    </div>
  );
}


export default App;
