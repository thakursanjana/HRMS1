import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./employeedashboard.css";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
  });

  // Fetch employees from DB
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        dob: dayjs(formData.dob).format("DD-MM-YYYY"),
      };

      const res = await axios.post(
        "http://localhost:3000/api/employees",
        formattedData,
        { headers: { "Content-Type": "application/json" } }
      );

      setEmployees((prevEmployees) => [...prevEmployees, res.data]);
      alert("Employee added successfully ✅");
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        employeeId: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        designation: "",
        department: "",
        salary: "",
        password: "",
        role: "",
      });
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Error saving employee ❌");
    }
  };

  return (
    <div className="p-4">
      {/* Search + Add */}
      <div className="top-actions">
        <input
          type="text"
          className="form-control"
          placeholder="Search By Employee ID"
        />
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add New Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className="card shadow">
        <table className="table table-hover text-center align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>S No</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() =>
                        navigate(`/admindashboard/employee/${emp._id}`)
                      }
                    >
                      View
                    </button>

                    <button className="btn btn-success btn-sm me-1">Edit</button>
                    <button className="btn btn-warning btn-sm me-1">
                      Salary
                    </button>
                    <button className="btn btn-danger btn-sm">Leave</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination-info">
          <span>Rows: {employees.length}</span>
          <span>
            1-{employees.length} of {employees.length}
          </span>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Add New Employee</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddEmployee} className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="col-md-6">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>
                  {/* Employee ID */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Employee ID"
                      required
                    />
                  </div>
                  {/* DOB */}
                  <div className="col-md-6">
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  {/* Gender */}
                  <div className="col-md-6">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  {/* Marital Status */}
                  <div className="col-md-6">
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Marital Status</option>
                      <option>Single</option>
                      <option>Married</option>
                    </select>
                  </div>
                  {/* Designation */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Designation"
                      required
                    />
                  </div>
                  {/* Department */}
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Department"
                      required
                    />
                  </div>
                  {/* Salary */}
                  <div className="col-md-6">
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Salary"
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className="col-md-6">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  {/* Role */}
                  <div className="col-md-6">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Role</option>
                      <option>Employee</option>
                      <option>Manager</option>
                      <option>Admin</option>
                    </select>
                  </div>

                  {/* Footer Buttons */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
