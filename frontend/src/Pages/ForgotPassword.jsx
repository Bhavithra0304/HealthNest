import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHospital, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { authAPI } from "../services/api";
import "../Assets/css/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); return; }

    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setError("");
      setSuccess(true);
    } catch (err) {
      setError(err.message || "No account found with this email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <Link
            to="/"
            className="logo"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "0.5rem", fontSize: "1.5rem", fontWeight: "800",
              color: "var(--primary)", textDecoration: "none",
            }}
          >
            <FaHospital style={{ color: "var(--secondary)" }} />
            Health<span style={{ color: "var(--secondary)" }}>Nest</span>
          </Link>
        </div>

        <h2 className="auth-title">Forgot Password?</h2>
        <p className="auth-subtitle">
          Enter your registered email to receive reset instructions
        </p>

        {success ? (
          <div>
            <div className="alert alert-success">
              Password reset instructions have been sent to <strong>{email}</strong>. Please check your inbox.
            </div>
            <Link
              to="/login"
              className="btn-primary"
              style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-icon-wrap">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              <FaPaperPlane /> {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="auth-footer-text" style={{ marginTop: "1.25rem" }}>
          Remember your password? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
