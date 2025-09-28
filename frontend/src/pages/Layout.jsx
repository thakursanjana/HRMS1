import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <h4 className="brand">Employee MS</h4>
        <ul>
          <li>
            {/* Index route = Dashboard */}
            <NavLink to="" className="nav-link" end>
              <span className="icon">📊</span>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="employeedashboard" className="nav-link">
              <span className="icon">👥</span>
              <span className="text">Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="departments" className="nav-link">
              <span className="icon">🏢</span>
              <span className="text">Departments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="leaves" className="nav-link">
              <span className="icon">📝</span>
              <span className="text">Leaves</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="salary" className="nav-link">
              <span className="icon">💰</span>
              <span className="text">Salary</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="setting" className="nav-link">
              <span className="icon">⚙</span>
              <span className="text">Setting</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Section */}
      <div className={`main ${isSidebarOpen ? "" : "collapsed-main"}`}>
        {/* Topbar */}
        <div className="topbar">
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <span className="welcome">Welcome, Admin</span>
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
