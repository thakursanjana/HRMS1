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
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/admindashboard"
              end
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              📊 Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admindashboard/employeedashboard"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              👥 Employees
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admindashboard/department"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              🏢 Departments
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admindashboard/leave"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              📝 Leaves
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admindashboard/salary"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              💰 Salary
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
              localStorage.removeItem("role");
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
