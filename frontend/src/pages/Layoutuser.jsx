import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./Layout.css"; // you can style similar to admin

const LayoutUser = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <h4 className="brand">User Panel</h4>
        <ul>
          <li>
            <NavLink to="/user/dashboard" className="nav-link">
              <span className="icon">📊</span>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/employee" className="nav-link">
              <span className="icon">👥</span>
              <span className="text">Employee</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/department" className="nav-link">
              <span className="icon">🏢</span>
              <span className="text">Department</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/leave" className="nav-link">
              <span className="icon">📝</span>
              <span className="text">Leave</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/salary" className="nav-link">
              <span className="icon">💰</span>
              <span className="text">Salary</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <span className="welcome">Welcome, User</span>
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* Render child page */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutUser;
