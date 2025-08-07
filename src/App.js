import { Routes, Route, useLocation } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import MultiStepRegistration from "./components/MultiStepRegistration"; // Updated import
import AddPaymentForm from "./components/AddPaymentForm"; // Import the new component

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
              <AdminLogin />
            </div>
          }
        />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Multi-Step Student Registration */}
        <Route path="/admin/register-student" element={<MultiStepRegistration />} />

        {/* Add Payment Form */}
        <Route path="/admin/payments/add" element={<AddPaymentForm />} />
      </Routes>
    </div>
  );
}

export default App;
