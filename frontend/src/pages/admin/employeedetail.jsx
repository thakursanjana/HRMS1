import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./employeedetail.css";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error("Error fetching employee:", err));
  }, [id]);

  if (!employee) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 d-flex justify-content-center">
      <div className="card shadow p-4 text-center" style={{ maxWidth: "600px", width: "100%" }}>
        {/* Circular Profile Placeholder */}
        <div className="profile-circle mx-auto mb-3"></div>

        <h4 className="fw-bold mb-3">Employee Details</h4>

        <div className="text-start">
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Employee ID:</strong> {employee.employeeId}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Date of Birth:</strong> {employee.dob}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
          <p><strong>Designation:</strong> {employee.designation}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Role:</strong> {employee.role}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
