import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./departmentdashboard.css"; // optional styling

const DepartmentDashboard = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "HR", description: "Human Resources Department" },
    { id: 2, name: "IT", description: "Information Technology Department" },
    { id: 3, name: "Finance", description: "Handles company finances" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Department
  const handleAddDepartment = (e) => {
    e.preventDefault();
    const newDept = {
      id: Date.now(), // simple unique ID
      name: formData.name,
      description: formData.description,
    };
    setDepartments((prev) => [...prev, newDept]);
    setShowAddModal(false);
    setFormData({ name: "", description: "" });
  };

  // Delete Department
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
  };

  return (
    <div className="p-4">
      {/* Top Actions */}
      <div className="top-actions d-flex justify-content-between mb-3">
        <h4>Manage Departments</h4>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          + Add Department
        </button>
      </div>

      {/* Department Table */}
      <div className="card shadow">
        <table className="table table-hover text-center align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>S No</th>
              <th>Department Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dept, index) => (
                <tr key={dept.id}>
                  <td>{index + 1}</td>
                  <td>{dept.name}</td>
                  <td>{dept.description}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(dept.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No departments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- Add Department Modal ---------------- */}
      {showAddModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Add Department</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddDepartment} className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Department Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Description"
                      rows="3"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Department
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

export default DepartmentDashboard;
