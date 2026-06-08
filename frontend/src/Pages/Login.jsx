import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
   FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";
import { authAPI } from "../services/api";
import "../Assets/css/auth.css";
import logo from "../Assets/images/image.png"

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await authAPI.login({
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      });

      const { token, user } = res.data;
      const userData = { ...user, token };
      const storage = form.rememberMe ? localStorage : sessionStorage;

      if (user.role === "admin") {
        storage.setItem("hn_admin", JSON.stringify(userData));
        navigate("/admin");
      } else {
        storage.setItem("hn_user", JSON.stringify(userData));
        navigate("/dashboard");
      }
    } catch (err) {
      setApiError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
                  <img src={logo} alt="HealthNest Logo" className="logo-image" />
                </div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Enter your credentials to continue</p>

        {apiError && <div className="alert alert-error">{apiError}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-icon-wrap">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-icon-wrap password-toggle">
              <FaLock className="input-icon" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <div className="remember-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.rememberMe}
                onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing in..." : <><FaSignInAlt /> Sign In</>}
          </button>
        </form>

        <div className="auth-footer-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
