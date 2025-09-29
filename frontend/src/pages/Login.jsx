import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Hardcoded admin check (bypass backend)
    if (form.email === "admin123@gmail.com" && form.password === "admin123") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("token", "admin-token"); // dummy token
      navigate("/admindashboard");
      return;
    }

    // 🔹 For all other users, go to backend
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "user");
      navigate("/user/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid credentials");
    }
  };


  return (
    <div className="login-page">
      {/* Header */}
      <div className="login-header">
        <h1>Employee Management System</h1>
      </div>

      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          {msg && <p className="message">{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
