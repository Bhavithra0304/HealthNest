import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { FaCalendarCheck, FaUserMd, FaClock } from "react-icons/fa";
import { getCurrentUser } from "../Components/ProtectedRoute";
import { appointmentAPI, doctorAPI } from "../services/api";
import "../Assets/css/pages.css";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const departments = [
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

const Appointment = () => {
  const user = getCurrentUser();
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    console.log("Fetching doctors from Appointment.jsx");

    doctorAPI
      .getAll("?status=Active&limit=100", { signal: controller.signal })
      .then((res) => setDoctors(res.data?.doctors || []))
      .catch((err) => {
        if (err.name !== "AbortError") setDoctors([]);
      });

    return () => controller.abort();
  }, []);

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.department) e.department = "Select a department";
    if (!form.doctor) e.doctor = "Select a doctor";
    if (!form.date) e.date = "Select a date";
    if (!form.time) e.time = "Select a time slot";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await appointmentAPI.book(form);
      setSuccess(true);
      setErrors({});
    } catch (err) {
      setApiError(
        err.message || "Failed to book appointment. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const doctorOptions =
    doctors.length > 0
      ? doctors.map((d) => `${d.name} – ${d.specialization}`)
      : [
          "Dr. Sarah Johnson – Cardiologist",
          "Dr. Michael Chen – Neurologist",
          "Dr. Emily Davis – Orthopedic Surgeon",
          "Dr. Robert Wilson – Pediatrician",
          "Dr. Lisa Park – Dermatologist",
          "Dr. James Martinez – Oncologist",
          "Dr. Anna Thompson – Ophthalmologist",
          "Dr. David Kumar – Pulmonologist",
        ];

  return (
    <div>
      <Header />
      <div className="page-hero">
        <h1>Book an Appointment</h1>
        <p>Schedule your visit with our expert doctors</p>
      </div>

      <section className="page-section">
        <div className="container" style={{ maxWidth: "800px" }}>
          {success ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                background: "var(--surface)",
                borderRadius: "var(--radius)",
                border: "1.5px solid var(--border)",
              }}
            >
              <FaCalendarCheck
                style={{
                  fontSize: "4rem",
                  color: "var(--secondary)",
                  marginBottom: "1rem",
                }}
              />
              <h2 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>
                Appointment Booked!
              </h2>
              <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
                Your appointment has been successfully scheduled. You will
                receive a confirmation soon.
              </p>
              <div
                style={{
                  background: "var(--surface-2)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.25rem",
                  textAlign: "left",
                  marginBottom: "1.5rem",
                }}
              >
                <p>
                  <strong>Doctor:</strong> {form.doctor}
                </p>
                <p>
                  <strong>Date:</strong> {form.date}
                </p>
                <p>
                  <strong>Time:</strong> {form.time}
                </p>
                <p>
                  <strong>Department:</strong> {form.department}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSuccess(false);
                    setForm({
                      name: user?.name || "",
                      email: user?.email || "",
                      phone: "",
                      department: "",
                      doctor: "",
                      date: "",
                      time: "",
                      reason: "",
                    });
                  }}
                >
                  Book Another
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                  style={{
                    border: "1.5px solid var(--border)",
                    background: "var(--surface-2)",
                  }}
                >
                  Go to My Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="appointment-form-card">
              <h2>
                <FaCalendarCheck
                  style={{ marginRight: "0.5rem", color: "var(--secondary)" }}
                />
                Appointment Details
              </h2>

              {apiError && <div className="alert alert-error">{apiError}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={set("name")}
                    />
                    {errors.name && <p className="error-msg">{errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                    {errors.email && (
                      <p className="error-msg">{errors.email}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                    {errors.phone && (
                      <p className="error-msg">{errors.phone}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={form.department}
                      onChange={set("department")}
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="error-msg">{errors.department}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      <FaUserMd style={{ marginRight: "0.3rem" }} />
                      Preferred Doctor
                    </label>
                    <select value={form.doctor} onChange={set("doctor")}>
                      <option value="">Select Doctor</option>
                      {doctorOptions.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                    {errors.doctor && (
                      <p className="error-msg">{errors.doctor}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      <FaClock style={{ marginRight: "0.3rem" }} />
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={set("date")}
                    />
                    {errors.date && <p className="error-msg">{errors.date}</p>}
                  </div>
                  <div className="form-group">
                    <label>Time Slot</label>
                    <select value={form.time} onChange={set("time")}>
                      <option value="">Select Time</option>
                      {timeSlots.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    {errors.time && <p className="error-msg">{errors.time}</p>}
                  </div>
                  <div className="form-group full-width">
                    <label>Reason for Visit (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      value={form.reason}
                      onChange={set("reason")}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "0.5rem",
                  }}
                  disabled={loading}
                >
                  <FaCalendarCheck />{" "}
                  {loading ? "Booking..." : "Confirm Appointment"}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Appointment;
