import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaTachometerAlt,
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { logout, getAdminSession } from "./ProtectedRoute";
import "../Assets/css/admin.css";

const navItems = [
  { to: "/admin", icon: <FaTachometerAlt />, label: "Dashboard", end: true },
  { to: "/admin/doctors", icon: <FaUserMd />, label: "Doctors" },
  { to: "/admin/patients", icon: <FaUsers />, label: "Patients" },
  {
    to: "/admin/appointments",
    icon: <FaCalendarCheck />,    label: "Appointments",
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const admin = getAdminSession();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <FaHospital />
          </div>
          <div className="sidebar-logo-text">
            Health<span>Nest</span>
          </div>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <span className="sidebar-admin-badge">
            <FaShieldAlt style={{ fontSize: "0.62rem" }} /> Admin Panel
          </span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">AD</div>
        <div className="sidebar-user-info">
          <strong>{admin?.name || "Administrator"}</strong>
          <span>Super Admin</span>
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

export default AdminSidebar;
