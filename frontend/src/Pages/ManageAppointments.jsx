import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { FaSearch, FaTrash, FaCalendarCheck } from "react-icons/fa";
import { appointmentAPI } from "../services/api";

const ManageAppointments = () => {
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    
    console.log("manageappointments");
    try {
      const res = await appointmentAPI.getAll("?limit=100");
      setAppointments(res.data?.appointments || []);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filtered = appointments.filter(
    (a) =>
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor?.toLowerCase().includes(search.toLowerCase()) ||
      a.department?.toLowerCase().includes(search.toLowerCase()),
  );

  const updateStatus = async (id, status) => {
    try {
      const res = await appointmentAPI.updateStatus(id, status);
      setAppointments(appointments.map((a) => (a._id === id ? res.data : a)));
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await appointmentAPI.delete(id);
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete appointment");
    }
  };

  const pending = appointments.filter((a) => a.status === "Pending").length;
  const confirmed = appointments.filter((a) => a.status === "Confirmed").length;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-title">
            <h1>Manage Appointments</h1>
            <p>View and update all patient appointment records</p>
          </div>
          <div className="topbar-right">
            <span className="badge-status pending">{pending} Pending</span>
            <span className="badge-status active">{confirmed} Confirmed</span>
          </div>
        </div>

        <div className="admin-content">
          <div className="data-table-wrap">
            <div className="table-header">
              <div className="table-header-left">
                <h2>All Appointments</h2>
                <p>{filtered.length} total records</p>
              </div>
              <div className="table-search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search patient, doctor, dept..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              {loading ? (
                <p style={{ padding: "2rem", color: "#5f7285" }}>
                  Loading appointments...
                </p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Department</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length > 0 ? (
                      filtered.map((a, i) => (
                        <tr key={a._id}>
                          <td style={{ color: "#5f7285", fontSize: "0.82rem" }}>
                            {String(i + 1).padStart(2, "0")}
                          </td>
                          <td>
                            <div className="table-avatar">
                              <div className="table-avatar-circle">
                                {a.name?.slice(0, 2).toUpperCase() || "PT"}
                              </div>
                              <div>
                                <strong>{a.name}</strong>
                                <span>{a.email}</span>
                              </div>
                            </div>
                          </td>
                          <td
                            style={{
                              fontSize: "0.82rem",
                              color: "#5f7285",
                              maxWidth: "160px",
                            }}
                          >
                            {a.doctor?.split("–")[0]?.trim()}
                          </td>
                          <td>
                            <span
                              style={{
                                background: "#ede9fe",
                                color: "#5b21b6",
                                padding: "0.2rem 0.6rem",
                                borderRadius: "6px",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                              }}
                            >
                              {a.department}
                            </span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{a.date}</td>
                          <td>{a.time}</td>
                          <td>
                            <select
                              value={a.status || "Pending"}
                              onChange={(e) =>
                                updateStatus(a._id, e.target.value)
                              }
                              style={{
                                border: "1.5px solid #d9e7f2",
                                borderRadius: "7px",
                                padding: "0.3rem 0.5rem",
                                fontSize: "0.8rem",
                                background: "#f7fafd",
                                color: "#17324d",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                outline: "none",
                              }}
                            >
                              <option>Pending</option>
                              <option>Confirmed</option>
                              <option>Completed</option>
                              <option>Cancelled</option>
                              <option>Rejected</option>
                            </select>
                          </td>
                          <td>
                            <div className="action-btns">
                              <button
                                className="btn-icon delete"
                                title="Delete"
                                onClick={() => handleDelete(a._id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          style={{
                            textAlign: "center",
                            padding: "3rem",
                            color: "#5f7285",
                          }}
                        >
                          <FaCalendarCheck
                            style={{
                              fontSize: "2rem",
                              opacity: 0.3,
                              display: "block",
                              margin: "0 auto 0.5rem",
                            }}
                          />
                          {search
                            ? "No appointments match your search."
                            : "No appointments found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
