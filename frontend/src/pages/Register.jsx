import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", form);
      setMsg(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.log(err.response?.data); // debug
      setMsg(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-bg">
      <h2 className="login-title">Employee Management System</h2>
      <div className="login-card">
        <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="login-row">
            <label htmlFor="email" className="login-label" style={{ minWidth: "90px" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control flex-grow-1"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>
          <div className="login-row">
            <label htmlFor="username" className="login-label" style={{ minWidth: "90px" }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control flex-grow-1"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>
          {/* Password */}
          <div className="login-row">
            <label htmlFor="password" className="login-label" style={{ minWidth: "90px" }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control flex-grow-1"
              placeholder="******"
              value={form.password}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>

          {/* Message */}
          {msg && <p className="text-center mt-2">{msg}</p>}

          {/* Link to Login */}
          <p className="text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
