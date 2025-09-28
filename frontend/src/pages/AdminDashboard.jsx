import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUsers, FaBuilding, FaMoneyBill, FaClipboardList, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import "./AdminDashboard.css"; // Custom CSS for additional styling

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    monthlyPay: 0,
    leaveApplied: 0,
    leaveApproved: 0,
    leavePending: 0,
    leaveRejected: 0,
  });

  // Fetch dashboard data (dummy for now, replace API endpoints later)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await axios.get("http://localhost:3000/api/employees");
        const departments = await axios.get("http://localhost:3000/api/departments");
        const leaves = await axios.get("http://localhost:3000/api/leaves");

        setStats({
          totalEmployees: employees.data.length,
          totalDepartments: departments.data.length,
          monthlyPay: employees.data.reduce((sum, emp) => sum + (emp.salary || 0), 0),
          leaveApplied: leaves.data.length,
          leaveApproved: leaves.data.filter((l) => l.status === "Approved").length,
          leavePending: leaves.data.filter((l) => l.status === "Pending").length,
          leaveRejected: leaves.data.filter((l) => l.status === "Rejected").length,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h3 className="fw-bold mb-4">Dashboard Overview</h3>

      {/* Top Stats */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaUsers size={30} className="text-success mb-2" />
            <h5>Total Employees</h5>
            <span className="fw-bold fs-4">{stats.totalEmployees}</span>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaBuilding size={30} className="text-warning mb-2" />
            <h5>Total Departments</h5>
            <span className="fw-bold fs-4">{stats.totalDepartments}</span>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaMoneyBill size={30} className="text-danger mb-2" />
            <h5>Monthly Pay</h5>
            <span className="fw-bold fs-4">${stats.monthlyPay}</span>
          </div>
        </div>
      </div>

      {/* Leave Details */}
      <h4 className="fw-bold mb-3">Leave Details</h4>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaClipboardList size={30} className="text-info mb-2" />
            <h6>Leave Applied</h6>
            <span className="fw-bold fs-5">{stats.leaveApplied}</span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaCheckCircle size={30} className="text-success mb-2" />
            <h6>Leave Approved</h6>
            <span className="fw-bold fs-5">{stats.leaveApproved}</span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaHourglassHalf size={30} className="text-warning mb-2" />
            <h6>Leave Pending</h6>
            <span className="fw-bold fs-5">{stats.leavePending}</span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaTimesCircle size={30} className="text-danger mb-2" />
            <h6>Leave Rejected</h6>
            <span className="fw-bold fs-5">{stats.leaveRejected}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
