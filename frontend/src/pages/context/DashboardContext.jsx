import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, deptRes, leaveRes] = await Promise.all([
          axios.get("http://localhost:3000/api/employees"),
          axios.get("http://localhost:3000/api/departments"),
          axios.get("http://localhost:3000/api/leaves"),
        ]);
        setEmployees(empRes.data || []);
        setDepartments(deptRes.data || []);
        setLeaves(leaveRes.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{ employees, setEmployees, departments, setDepartments, leaves, setLeaves }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
