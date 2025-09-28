import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashBoard";
import EmployeeDetails from "./pages/employeedetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes with layout */}
        <Route path="/admindashboard" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="employeedashboard" element={<EmployeeDashboard />} />
          <Route path="employee/:id" element={<EmployeeDetails />} />
        </Route>


        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
