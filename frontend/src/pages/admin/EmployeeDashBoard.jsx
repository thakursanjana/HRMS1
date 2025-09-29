import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./employeedashboard.css";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
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
      setEmployees((prev) => [...prev, res.data]);
      alert("Employee added successfully ✅");
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Error saving employee ❌");
    }
  };

  // Edit employee
  const handleEditEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/employees/${selectedEmployee._id}`,
        formData
      );
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === selectedEmployee._id ? res.data : emp))
      );
      alert("Employee updated ✅");
      setShowEditModal(false);
      resetForm();
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("Error updating employee ❌");
    }
  };

  // Reset form
  const resetForm = () => {
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
    setSelectedEmployee(null);
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
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
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

                    <button
                      className="btn btn-success btn-sm me-1"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setFormData(emp);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setShowSalaryModal(true);
                      }}
                    >
                      Salary
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setShowLeaveModal(true);
                      }}
                    >
                      Leave
                    </button>
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
      </div>

      {/* ------------------ Add Employee Modal ------------------ */}
      {showAddModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Add New Employee</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddEmployee} className="row g-3">
                  {/* reuse inputs */}
                  {["name","email","employeeId","dob","gender","maritalStatus","designation","department","salary","password","role"].map((field) => (
                    <div className="col-md-6" key={field}>
                      <input
                        type={field==="salary"?"number":field==="dob"?"date":"text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="form-control"
                        placeholder={field}
                        required
                      />
                    </div>
                  ))}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowAddModal(false)}
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

      {/* ------------------ Edit Employee Modal ------------------ */}
      {showEditModal && selectedEmployee && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditEmployee} className="row g-3">
                  {["name","email","employeeId","dob","gender","maritalStatus","designation","department","salary","role"].map((field) => (
                    <div className="col-md-6" key={field}>
                      <input
                        type={field==="salary"?"number":field==="dob"?"date":"text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="form-control"
                        placeholder={field}
                        required
                      />
                    </div>
                  ))}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ Salary Modal ------------------ */}
      {showSalaryModal && selectedEmployee && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3 text-center">
              <h5>Salary Slip</h5>
              <p><b>Name:</b> {selectedEmployee.name}</p>
              <p><b>Department:</b> {selectedEmployee.department}</p>
              <p><b>Designation:</b> {selectedEmployee.designation}</p>
              <p><b>Salary:</b> ₹ {selectedEmployee.salary}</p>
              <button
                className="btn btn-secondary"
                onClick={() => setShowSalaryModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ Leave Modal ------------------ */}
      {showLeaveModal && selectedEmployee && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3 text-center">
              <h5>Leave Information</h5>
              <p><b>Name:</b> {selectedEmployee.name}</p>
              {/* Placeholder leave info */}
              <p>Total Leaves Taken: 2</p>
              <p>Pending Requests: 1</p>
              <p>Approved Leaves: 1</p>
              <button
                className="btn btn-secondary"
                onClick={() => setShowLeaveModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
