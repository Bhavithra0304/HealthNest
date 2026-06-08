import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaUserPlus,
} from "react-icons/fa";
import { authAPI } from "../services/api";
import "../Assets/css/auth.css";
import logo from "../Assets/images/image.png"

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email format";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, "")))
      e.phone = "Enter a valid phone number";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!termsAccepted) {
      setApiError("Please accept the Terms & Conditions and Privacy Policy");
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      await authAPI.register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        termsAccepted,
      });

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setApiError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide">
        <div className="auth-logo">
          <img src={logo} alt="HealthNest Logo" className="logo-image" />
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join HealthNest for seamless healthcare</p>

        {success && (
          <div className="alert alert-success">
            Account created successfully! Redirecting to login...
          </div>
        )}
        {apiError && <div className="alert alert-error">{apiError}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="name-row">
            <div className="form-group">
              <label>First Name</label>
              <div className="input-icon-wrap">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="John"
                  value={form.firstName}
                  onChange={set("firstName")}
                />
              </div>
              {errors.firstName && (
                <p className="error-msg">{errors.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <div className="input-icon-wrap">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={set("lastName")}
                />
              </div>
              {errors.lastName && (
                <p className="error-msg">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-icon-wrap">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
              />
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-icon-wrap">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                value={form.phone}
                onChange={set("phone")}
              />
            </div>
            {errors.phone && <p className="error-msg">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-icon-wrap password-toggle">
              <FaLock className="input-icon" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={set("password")}
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

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-icon-wrap">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="error-msg">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />

            <label htmlFor="terms">
              I agree to the
              <a href="/terms" target="_blank">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" target="_blank">
                Privacy Policy
              </a>
            </label>
          </div>
          <button type="submit" className="btn-primary">
            <FaUserPlus /> Create Account
          </button>
        </form>

        <div className="auth-footer-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
