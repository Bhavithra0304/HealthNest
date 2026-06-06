import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserMd,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { doctorAPI } from "../services/api";

const DEPARTMENTS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Oncology",
  "Ophthalmology",
  "Pulmonology",
  "General Medicine",
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  qualification: "",
  experience: "",
  department: "",
  consultationFee: "",
  status: "Active",
};

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editDoc, setEditDoc] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const fetchDoctors = async () => {
    try {
      const res = await doctorAPI.getAll("?limit=100");
      setDoctors(res.data?.doctors || []);
    } catch {
      setDoctors([]);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditDoc(null);
    setForm(emptyForm);
    setApiError("");
    setShowModal(true);
  };
  const openEdit = (d) => {
    setEditDoc(d);
    setForm({
      name: d.name,
      email: d.email,
      phone: d.phone || "",
      specialization: d.specialization,
      qualification: d.qualification || "",
      experience: d.experience || "",
      department: d.department,
      consultationFee: d.consultationFee || "",
      status: d.status,
    });
    setApiError("");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this doctor from the system?")) return;
    try {
      await doctorAPI.delete(id);
      setDoctors(doctors.filter((d) => d._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete doctor");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);
    try {
      if (editDoc) {
        const res = await doctorAPI.update(editDoc._id, form);
        setDoctors(doctors.map((d) => (d._id === editDoc._id ? res.data : d)));
      } else {
        const res = await doctorAPI.create(form);
        setDoctors([res.data, ...doctors]);
      }
      setShowModal(false);
    } catch (err) {
      setApiError(err.message || "Failed to save doctor");
    } finally {
      setLoading(false);
    }
  };

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-title">
            <h1>Manage Doctors</h1>
            <p>View and manage all registered medical staff</p>
          </div>
          <div className="topbar-right">
            <button
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.1rem",
                fontSize: "0.88rem",
              }}
              onClick={openAdd}
            >
              <FaPlus /> Add Doctor
            </button>
          </div>
        </div>

        <div className="admin-content">
          <div className="data-table-wrap">
            <div className="table-header">
              <div className="table-header-left">
                <h2>All Doctors</h2>
                <p>{filtered.length} doctors registered</p>
              </div>
              <div className="table-search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor</th>
                  <th>Specialty</th>
                  <th>Experience</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr key={d._id}>
                    <td style={{ color: "#5f7285", fontSize: "0.82rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td>
                      <div className="table-avatar">
                        <div className="table-avatar-circle">
                          {d.name.split(" ")[1]?.slice(0, 2).toUpperCase() ||
                            "DR"}
                        </div>
                        <div>
                          <strong>{d.name}</strong>
                          <span>{d.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          background: "#dbeafe",
                          color: "#1e40af",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                        }}
                      >
                        {d.specialization}
                      </span>
                    </td>
                    <td>{d.experience || "—"}</td>
                    <td>{d.department}</td>
                    <td>
                      <span className="badge-status active">{d.status}</span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="btn-icon edit"
                          title="Edit Doctor"
                          onClick={() => openEdit(d)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-icon delete"
                          title="Remove Doctor"
                          onClick={() => handleDelete(d._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "3rem",
                        color: "#5f7285",
                      }}
                    >
                      <FaUserMd
                        style={{
                          fontSize: "2rem",
                          opacity: 0.3,
                          display: "block",
                          margin: "0 auto 0.5rem",
                        }}
                      />
                      No doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "2rem",
              width: "100%",
              maxWidth: "520px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <h2 style={{ margin: 0 }}>
                {editDoc ? "Edit Doctor" : "Add Doctor"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                <FaTimes />
              </button>
            </div>
            {apiError && <div className="alert alert-error">{apiError}</div>}
            <form onSubmit={handleSubmit}>
              {[
                {
                  label: "Full Name",
                  field: "name",
                  type: "text",
                  required: true,
                },
                {
                  label: "Email",
                  field: "email",
                  type: "email",
                  required: true,
                },
                { label: "Phone", field: "phone", type: "tel" },
                {
                  label: "Specialization",
                  field: "specialization",
                  type: "text",
                  required: true,
                },
                {
                  label: "Qualification",
                  field: "qualification",
                  type: "text",
                },
                {
                  label: "Experience (e.g. 5 yrs)",
                  field: "experience",
                  type: "text",
                },
                {
                  label: "Consultation Fee",
                  field: "consultationFee",
                  type: "number",
                },
              ].map(({ label, field, type, required }) => (
                <div className="form-group" key={field}>
                  <label>{label}</label>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={set(field)}
                    required={required}
                  />
                </div>
              ))}
              <div className="form-group">
                <label>Department</label>
                <select
                  value={form.department}
                  onChange={set("department")}
                  required
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={set("status")}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                disabled={loading}
              >
                <FaSave /> {loading ? "Saving..." : "Save Doctor"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
