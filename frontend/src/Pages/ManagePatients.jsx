import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { FaSearch, FaTrash, FaUsers } from "react-icons/fa";
import { patientAPI } from "../services/api";

const ManagePatients = () => {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    patientAPI
      .getAll("?limit=100")
      .then((res) => setPatients(res.data?.patients || []))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = patients.filter(
    (p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this patient record?")) return;
    try {
      await patientAPI.delete(id);
      setPatients(patients.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete patient");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-title">
            <h1>Manage Patients</h1>
            <p>View all registered patients in the system</p>
          </div>
          <div className="topbar-right">
            <div style={{ background: "#f0f4f8", border: "1.5px solid #d9e7f2", borderRadius: "8px", padding: "0.45rem 1rem", fontSize: "0.85rem", fontWeight: 600, color: "#0f4c81" }}>
              Total: {patients.length} patients
            </div>
          </div>
        </div>

        <div className="admin-content">
          <div className="data-table-wrap">
            <div className="table-header">
              <div className="table-header-left">
                <h2>Patient Records</h2>
                <p>{filtered.length} records found</p>
              </div>
              <div className="table-search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <p style={{ padding: "2rem", color: "#5f7285" }}>Loading patients...</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th><th>Patient</th><th>Phone</th>
                    <th>Registered On</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((p, i) => (
                      <tr key={p._id}>
                        <td style={{ color: "#5f7285", fontSize: "0.82rem" }}>{String(i + 1).padStart(2, "0")}</td>
                        <td>
                          <div className="table-avatar">
                            <div className="table-avatar-circle">
                              {`${p.firstName} ${p.lastName}`.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <strong>{p.firstName} {p.lastName}</strong>
                              <span>{p.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{p.phone || "—"}</td>
                        <td>
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                            : "—"}
                        </td>
                        <td>
                          <span className={`badge-status ${p.status === "active" ? "active" : "pending"}`}>
                            {p.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-icon delete" title="Remove Patient" onClick={() => handleDelete(p._id)}>
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "#5f7285" }}>
                        <FaUsers style={{ fontSize: "2rem", opacity: 0.3, display: "block", margin: "0 auto 0.5rem" }} />
                        {search ? "No patients match your search." : "No patients registered yet."}
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
  );
};

export default ManagePatients;
