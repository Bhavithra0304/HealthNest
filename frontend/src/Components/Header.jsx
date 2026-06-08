import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserShield,
  FaChevronDown,
} from "react-icons/fa";
import { getCurrentUser, getAdminSession, logout } from "./ProtectedRoute";
import "../Assets/css/header.css";
import logo from "../Assets/images/image.png";

const Header = () => {
  console.log(logo);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const user = getCurrentUser();
  const admin = getAdminSession();
  const activeUser = admin || user;

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  const initials = activeUser
    ? (activeUser.name || activeUser.email).slice(0, 2).toUpperCase()
    : "";

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="HealthNest Logo" className="logo-image" />
          HealthNest
        </Link>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)} end>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/services" onClick={() => setMenuOpen(false)}>
            Services
          </NavLink>
          <NavLink to="/doctors" onClick={() => setMenuOpen(false)}>
            Doctors
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
          {admin && (
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
              <FaUserShield style={{ marginRight: "4px" }} />
              Admin
            </NavLink>
          )}
        </nav>
        <div className="header-actions">
          {activeUser ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <button
                className="user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="user-avatar">{initials}</div>
                <span>{activeUser.name || "User"}</span>
                <FaChevronDown style={{ fontSize: "0.75rem" }} />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {!admin && (
                    <Link
                      to="/appointment"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaCalendarCheck /> Book Appointment
                    </Link>
                  )}
                  {admin && (
                    <Link to="/admin" onClick={() => setDropdownOpen(false)}>
                      <FaUserShield /> Admin Panel
                    </Link>
                  )}
                  <div className="dropdown-divider" />
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-secondary"
                style={{ padding: "0.5rem 1.1rem" }}
              >
                Login
              </Link>
            </>
          )}

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <>
                <span />
                <span />
                <span />
              </>
            ) : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
