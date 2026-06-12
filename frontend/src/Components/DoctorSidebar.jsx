import React from "react";
import { Link,NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/images/image.png";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaSignOutAlt,
  FaUserMd,
} from "react-icons/fa";
import { logout, getDoctorSession } from "./ProtectedRoute";
import "../Assets/css/admin.css";

const navItems = [
  {
    to: "/doctor",
    icon: <FaTachometerAlt />,
    label: "Dashboard",
    end: true,
  },
  {
    to: "/doctor/patients",
    icon: <FaUsers />,
    label: "My Patients",
  },
  {
    to: "/doctor/appointments",
    icon: <FaCalendarCheck />,
    label: "Appointments",
  },
];

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const doctor = getDoctorSession();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Link to="/" className="logo">
          <img src={logo} alt="HealthNest Logo" className="logo-image" />
          HealthNest
        </Link>
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <span className="sidebar-admin-badge">
            <FaUserMd style={{ fontSize: "0.62rem" }} /> Doctor Panel
          </span>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {doctor?.name
            ? doctor.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()
            : "DR"}
        </div>

        <div className="sidebar-user-info">
          <strong>{doctor?.name || "Doctor"}</strong>
          <span>Medical Practitioner</span>
        </div>
      </div>

      <p className="sidebar-section-label">Main Menu</p>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout}>
          <span className="nav-icon">
            <FaSignOutAlt />
          </span>

          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
