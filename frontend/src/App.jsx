import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout"; // Admin layout
import LayoutUser from "./pages/Layoutuser"; // User layout

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/admin/EmployeeDashBoard";
import EmployeeDetails from "./pages/admin/employeedetail";
import Admindepartment from "./pages/admin/admindepartment";
import Adminsalary from "./pages/admin/Adminsalary";
import Adminleave from "./pages/admin/Adminleave";

// User pages
import Dashboard from "./pages/user/dashboard";
import Employee from "./pages/user/employee";
import Department from "./pages/user/department";
import Leave from "./pages/user/UserLeavePage";
import Salary from "./pages/user/salary";

// Private Route Wrapper
function PrivateRoute({ children, role }) {
  const userRole = localStorage.getItem("role");
  return userRole === role ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page (Landing page will be Register) */}
        <Route path="/" element={<Register />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ------------------ Admin routes ------------------ */}
        <Route
          path="/admindashboard"
          element={
            <PrivateRoute role="admin">
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="employeedashboard" element={<EmployeeDashboard />} />
          <Route path="employee/:id" element={<EmployeeDetails />} />
          <Route path="department" element={<Admindepartment />} />
          <Route path="salary" element={<Adminsalary />} />
          <Route path="leave" element={<Adminleave />} />
        </Route>

        {/* ------------------ User routes ------------------ */}
        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <LayoutUser />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="department" element={<Department />} />
          <Route path="leave" element={<Leave />} />
          <Route path="salary" element={<Salary />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
