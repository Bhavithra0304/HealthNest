import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaHospital,
  FaArrowUp,
  FaCalendarDay,
  FaClipboardList,
  FaBell,
} from "react-icons/fa";
import { dashboardAPI } from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const depts = stats?.departmentLoad || [];
  const activities = stats?.recentActivities || [];

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const loadStats = async () => {
      try {
        const res = await dashboardAPI.get({ signal: controller.signal });
        if (mounted) {
          setStats(res.data);
          console.log(res);
        }
      } catch (err) {
        if (err.name !== "AbortError" && mounted) setStats(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadStats();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log("Stats:", stats);
  }, [stats]);

  const totalPatients = stats?.totalPatients ?? 0;
  const totalDoctors = stats?.totalDoctors ?? 0;
  const todayAppointments = stats?.todayAppointments ?? 0;
  const pending = stats?.pendingAppointments ?? 0;
  const recentAppts = stats?.recentAppointments ?? [];

  const cards = [
    {
      icon: <FaUsers />,
      label: "Total Patients",
      value: totalPatients,
      trend: "+12%",
      color: "blue",
    },
    {
      icon: <FaUserMd />,
      label: "Total Doctors",
      value: totalDoctors,
      trend: "+2",
      color: "green",
    },
    {
      icon: <FaCalendarCheck />,
      label: "Appointments Today",
      value: todayAppointments,
      trend: `${pending} pending`,
      color: "orange",
    },
    {
      icon: <FaHospital />,
      label: "Departments",
      value: depts.length,
      trend: "Active",
      color: "purple",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-title">
            <h1>Dashboard Overview</h1>
            <p>Welcome back, Administrator</p>
          </div>
          <div className="topbar-right">
            <div className="topbar-date">
              <FaCalendarDay />
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#f0f4f8",
                  border: "1.5px solid #d9e7f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#5f7285",
                }}
              >
                <FaBell />
              </div>
              {pending > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    width: 16,
                    height: 16,
                    background: "#ef4444",
                    borderRadius: "50%",
                    fontSize: "0.65rem",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {pending}
                </span>
              )}
            </div>
            <div className="topbar-avatar">AD</div>
          </div>
        </div>

        <div className="admin-content">
          {loading ? (
            <p style={{ padding: "2rem", color: "#5f7285" }}>
              Loading dashboard...
            </p>
          ) : (
            <>
              <div className="dashboard-cards">
                {cards.map((c, i) => (
                  <div className={`dash-card ${c.color}`} key={i}>
                    <div className={`dash-card-icon ${c.color}`}>{c.icon}</div>
                    <div className="dash-card-info">
                      <p>{c.label}</p>
                      <h3>{c.value}</h3>
                      <div className="dash-card-trend">
                        <FaArrowUp style={{ fontSize: "0.65rem" }} />
                        {c.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid">
                <div className="data-table-wrap">
                  <div className="table-header">
                    <div className="table-header-left">
                      <h2>Recent Appointments</h2>
                      <p>Latest patient bookings</p>
                    </div>
                    <span
                      className="badge-status pending"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {pending} Pending
                    </span>
                  </div>

                  {recentAppts.length > 0 ? (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Doctor</th>
                          <th>Dept</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAppts.map((a, i) => (
                          <tr key={i}>
                            <td>
                              <div className="table-avatar">
                                <div className="table-avatar-circle">
                                  {a.name
                                    ? a.name.slice(0, 2).toUpperCase()
                                    : "PT"}
                                </div>
                                <strong>{a.name}</strong>
                              </div>
                            </td>
                            <td
                              style={{ fontSize: "0.82rem", color: "#5f7285" }}
                            >
                              {a.doctor?.split("–")[0]?.trim()}
                            </td>
                            <td>{a.department}</td>
                            <td>{a.date}</td>
                            <td>{a.time}</td>
                            <td>
                              <span
                                className={`badge-status ${(a.status || "pending").toLowerCase()}`}
                              >
                                {a.status || "Pending"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div
                      style={{
                        padding: "3rem",
                        textAlign: "center",
                        color: "#5f7285",
                      }}
                    >
                      <FaClipboardList
                        style={{
                          fontSize: "2.5rem",
                          opacity: 0.3,
                          marginBottom: "0.75rem",
                        }}
                      />
                      <p>No appointments yet.</p>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  <div className="activity-panel">
                    <div className="activity-panel-header">
                      <h2>Department Load</h2>
                      <p>Current patient distribution</p>
                    </div>
                    <div className="activity-list">
                      {depts.length > 0 ? (
                        depts.map((dept) => (
                          <div className="dept-item" key={dept._id}>
                            <div className="dept-item-header">
                              <span>{dept._id}</span>

                              <span>{dept.doctors} Doctors</span>
                            </div>

                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{
                                  width: `${Math.min(dept.doctors * 20, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No department data found</p>
                      )}
                    </div>
                  </div>

                  <div className="activity-panel">
                    <div className="activity-panel-header">
                      <h2>Recent Activity</h2>
                      <p>Latest system events</p>
                    </div>
                    <div className="activity-list">
                      {activities.map((activity) => (
                        <div className="activity-item" key={activity._id}>
                          <div className="activity-dot blue">
                            <FaBell />
                          </div>

                          <div className="activity-info">
                            <strong>{activity.title}</strong>

                            <span>
                              {new Date(activity.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
