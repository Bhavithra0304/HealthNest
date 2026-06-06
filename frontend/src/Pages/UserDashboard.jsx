import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaUserEdit,
  FaLock,
  FaSignOutAlt,
  FaUserMd,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaTimes,
  FaPrint,
  FaCreditCard,
  FaExclamationCircle,
  FaTachometerAlt,
  FaSave,
} from "react-icons/fa";
import { getCurrentUser, logout } from "../Components/ProtectedRoute";
import { appointmentAPI, billAPI, patientAPI, authAPI } from "../services/api";
import "../Assets/css/dashboard.css";

const STATUS_ICON = {
  Pending: <FaHourglassHalf style={{ color: "#f59e0b" }} />,
  Confirmed: <FaCheckCircle style={{ color: "#18a999" }} />,
  Completed: <FaCheckCircle style={{ color: "#3b82f6" }} />,
  Cancelled: <FaTimesCircle style={{ color: "#ef4444" }} />,
  Rejected: <FaTimesCircle style={{ color: "#ef4444" }} />,
};

const PAYMENT_STATUS_STYLE = {
  Paid: { background: "#d1fae5", color: "#065f46" },
  Unpaid: { background: "#fef3c7", color: "#92400e" },
  Waived: { background: "#dbeafe", color: "#1e40af" },
};

const TABS = [
  { key: "overview", label: "Overview", icon: <FaTachometerAlt /> },
  { key: "appointments", label: "My Appointments", icon: <FaCalendarCheck /> },
  { key: "bills", label: "Bills & Payments", icon: <FaFileInvoiceDollar /> },
  { key: "profile", label: "My Profile", icon: <FaUserEdit /> },
  { key: "password", label: "Change Password", icon: <FaLock /> },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userEmail = currentUser?.email || "";

  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loadingAppt, setLoadingAppt] = useState(true);
  const [loadingBill, setLoadingBill] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);
  const [payingBillId, setPayingBillId] = useState(null);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });
  const [pwMsg, setPwMsg] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }

    const controller = new AbortController();
    let mounted = true;

    const loadData = async () => {
      setLoadingAppt(true);
      setLoadingBill(true);

      try {
        const [apptRes, billRes, profileRes] = await Promise.all([
          appointmentAPI.getAll("?limit=50", { signal: controller.signal }),
          billAPI.getAll("?limit=50", { signal: controller.signal }),
          patientAPI.getProfile({ signal: controller.signal }),
        ]);

        if (!mounted) return;

        setAppointments(apptRes.data?.appointments || []);
        setBills(billRes.data?.bills || []);

        const profileData = profileRes.data || null;
        setProfile(profileData);
        setProfileForm({
          firstName: profileData?.firstName || "",
          lastName: profileData?.lastName || "",
          phone: profileData?.phone || "",
        });
      } catch (err) {
        if (err.name !== "AbortError" && mounted) {
          setAppointments([]);
          setBills([]);
          setProfile(null);
        }
      } finally {
        if (mounted) {
          setLoadingAppt(false);
          setLoadingBill(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [userEmail, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePayBill = async (billId) => {
    setPayingBillId(billId);
    try {
      alert(
        "Payments are handled by the administrator. Please contact support.",
      );
    } finally {
      setPayingBillId(null);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await patientAPI.updateProfile(profileForm);
      setProfile(res.data);
      setProfileMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setProfileMsg({ type: "error", text: err.message || "Update failed" });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg({ type: "error", text: "New passwords do not match" });
      return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwMsg({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    setSaving(true);
    try {
      await authAPI.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      setPwMsg({ type: "success", text: "Password changed successfully!" });
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwMsg({
        type: "error",
        text: err.message || "Password change failed",
      });
    } finally {
      setSaving(false);
    }
  };

  const totalAppts = useMemo(() => appointments.length, [appointments]);
  const pendingAppts = useMemo(
    () => appointments.filter((a) => a.status === "Pending").length,
    [appointments],
  );
  const completedAppts = useMemo(
    () =>
      appointments.filter((a) => ["Completed", "Confirmed"].includes(a.status))
        .length,
    [appointments],
  );
  const unpaidBills = useMemo(
    () => bills.filter((b) => b.paymentStatus === "Unpaid").length,
    [bills],
  );
  const totalDue = useMemo(
    () =>
      bills
        .filter((b) => b.paymentStatus === "Unpaid")
        .reduce((s, b) => s + (b.totalAmount || 0), 0),
    [bills],
  );

  const initials = currentUser
    ? (currentUser.name || currentUser.email || "U").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="dashboard-layout">
      <div className="dashboard-body">
        <aside className="dash-sidebar">
          <div className="dash-sidebar-user">
            <div className="dash-sidebar-avatar">{initials}</div>
            <div className="dash-sidebar-info">
              <strong>{currentUser?.name || "Patient"}</strong>
              <span>Patient Account</span>
            </div>
          </div>

          <nav className="dash-nav">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`dash-nav-item ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                <span className="dash-nav-icon">{tab.icon}</span>
                {tab.label}
                {tab.key === "bills" && unpaidBills > 0 && (
                  <span className="dash-nav-badge">{unpaidBills}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="dash-sidebar-footer">
            <button onClick={handleLogout} type="button">
              <span className="dash-nav-icon">
                <FaSignOutAlt />
              </span>
              Logout
            </button>
          </div>
        </aside>

        <main className="dash-main">
          <div className="dash-topbar">
            <div>
              <h2>{TABS.find((t) => t.key === activeTab)?.label}</h2>
              <p>
                Welcome back, {currentUser?.name?.split(" ")[0] || "Patient"}
              </p>
            </div>
            <Link
              to="/appointment"
              className="btn-primary"
              style={{ fontSize: "0.85rem", padding: "0.55rem 1.1rem" }}
            >
              <FaCalendarCheck /> Book Appointment
            </Link>
          </div>

          <div className="dash-content">
            {activeTab === "overview" && (
              <>
                <div className="overview-cards">
                  <div className="ov-card">
                    <div className="ov-card-icon blue">
                      <FaCalendarCheck />
                    </div>
                    <div className="ov-card-info">
                      <p>Total Appointments</p>
                      <h3>{totalAppts}</h3>
                    </div>
                  </div>
                  <div className="ov-card">
                    <div className="ov-card-icon orange">
                      <FaHourglassHalf />
                    </div>
                    <div className="ov-card-info">
                      <p>Pending</p>
                      <h3>{pendingAppts}</h3>
                    </div>
                  </div>
                  <div className="ov-card">
                    <div className="ov-card-icon green">
                      <FaCheckCircle />
                    </div>
                    <div className="ov-card-info">
                      <p>Completed</p>
                      <h3>{completedAppts}</h3>
                    </div>
                  </div>
                  <div className="ov-card">
                    <div className="ov-card-icon red">
                      <FaExclamationCircle />
                    </div>
                    <div className="ov-card-info">
                      <p>Unpaid Bills</p>
                      <h3>{unpaidBills}</h3>
                    </div>
                  </div>
                </div>

                <div className="dash-section-card">
                  <div className="dash-section-header">
                    <div>
                      <h3>Recent Appointments</h3>
                      <p>Your latest bookings</p>
                    </div>
                    <button
                      className="btn-view-invoice"
                      onClick={() => setActiveTab("appointments")}
                      type="button"
                    >
                      View All
                    </button>
                  </div>
                  <div className="dash-section-body">
                    {loadingAppt ? (
                      <p style={{ color: "#5f7285", fontSize: "0.9rem" }}>
                        Loading...
                      </p>
                    ) : appointments.length === 0 ? (
                      <div className="empty-state">
                        <FaCalendarCheck />
                        <p>No appointments yet.</p>
                        <Link
                          to="/appointment"
                          className="btn-primary"
                          style={{ fontSize: "0.85rem" }}
                        >
                          Book Your First Appointment
                        </Link>
                      </div>
                    ) : (
                      <div className="appt-list">
                        {appointments.slice(0, 3).map((appt) => (
                          <AppointmentCard key={appt._id} appt={appt} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {unpaidBills > 0 && (
                  <div className="dash-section-card">
                    <div className="dash-section-header">
                      <div>
                        <h3>Outstanding Bills</h3>
                        <p>
                          Total due:{" "}
                          <strong style={{ color: "#ef4444" }}>
                            ₹{totalDue.toLocaleString()}
                          </strong>
                        </p>
                      </div>
                      <button
                        className="btn-view-invoice"
                        onClick={() => setActiveTab("bills")}
                        type="button"
                      >
                        View All Bills
                      </button>
                    </div>
                    <div className="dash-section-body">
                      <div className="bill-list">
                        {bills
                          .filter((b) => b.paymentStatus === "Unpaid")
                          .slice(0, 3)
                          .map((bill) => (
                            <BillCard
                              key={bill._id}
                              bill={bill}
                              onView={() => setSelectedBill(bill)}
                              onPay={handlePayBill}
                              payingId={payingBillId}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "appointments" && (
              <div className="dash-section-card">
                <div className="dash-section-header">
                  <div>
                    <h3>All Appointments</h3>
                    <p>{appointments.length} total records</p>
                  </div>
                  <Link
                    to="/appointment"
                    className="btn-primary"
                    style={{ fontSize: "0.83rem", padding: "0.5rem 1rem" }}
                  >
                    <FaCalendarCheck /> Book New
                  </Link>
                </div>
                <div className="dash-section-body">
                  {loadingAppt ? (
                    <p style={{ color: "#5f7285", fontSize: "0.9rem" }}>
                      Loading...
                    </p>
                  ) : appointments.length === 0 ? (
                    <div className="empty-state">
                      <FaCalendarCheck />
                      <p>You have no appointments yet.</p>
                      <Link
                        to="/appointment"
                        className="btn-primary"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Book an Appointment
                      </Link>
                    </div>
                  ) : (
                    <div className="appt-list">
                      {appointments.map((appt) => (
                        <AppointmentCard key={appt._id} appt={appt} detailed />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "bills" && (
              <div className="dash-section-card">
                <div className="dash-section-header">
                  <div>
                    <h3>Bills & Payments</h3>
                    <p>{bills.length} total bills</p>
                  </div>
                  {unpaidBills > 0 && (
                    <span
                      style={{
                        fontSize: "0.82rem",
                        background: "#fef3c7",
                        color: "#92400e",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "20px",
                        fontWeight: 700,
                      }}
                    >
                      {unpaidBills} Unpaid
                    </span>
                  )}
                </div>
                <div className="dash-section-body">
                  {loadingBill ? (
                    <p style={{ color: "#5f7285", fontSize: "0.9rem" }}>
                      Loading...
                    </p>
                  ) : bills.length === 0 ? (
                    <div className="empty-state">
                      <FaFileInvoiceDollar />
                      <p>
                        No bills generated yet. Bills appear after booking
                        appointments.
                      </p>
                    </div>
                  ) : (
                    <div className="bill-list">
                      {bills.map((bill) => (
                        <BillCard
                          key={bill._id}
                          bill={bill}
                          onView={() => setSelectedBill(bill)}
                          onPay={handlePayBill}
                          payingId={payingBillId}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="dash-section-card">
                <div className="dash-section-header">
                  <div>
                    <h3>My Profile</h3>
                    <p>Manage your personal information</p>
                  </div>
                </div>
                <div className="dash-section-body">
                  <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                    <div className="profile-avatar-large">{initials}</div>
                    <h3 style={{ fontWeight: 700, color: "#17324d" }}>
                      {currentUser?.name}
                    </h3>
                    <p style={{ color: "#5f7285", fontSize: "0.88rem" }}>
                      {currentUser?.email}
                    </p>
                  </div>

                  {profileMsg.text && (
                    <div
                      className={`alert alert-${profileMsg.type === "success" ? "success" : "error"}`}
                      style={{ marginBottom: "1.25rem" }}
                    >
                      {profileMsg.text}
                    </div>
                  )}

                  <form onSubmit={handleUpdateProfile}>
                    <div className="profile-edit-grid">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          value={profileForm.firstName}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          value={profileForm.lastName}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={profile?.email || currentUser?.email}
                          disabled
                          style={{ opacity: 0.6 }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div
                      className="form-group"
                      style={{ marginTop: "0.25rem" }}
                    >
                      <label>Member Since</label>
                      <input
                        type="text"
                        value={
                          profile?.createdAt
                            ? new Date(profile.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )
                            : "—"
                        }
                        disabled
                        style={{ opacity: 0.6 }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={saving}
                    >
                      <FaSave /> {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "password" && (
              <div className="dash-section-card" style={{ maxWidth: 520 }}>
                <div className="dash-section-header">
                  <div>
                    <h3>Change Password</h3>
                    <p>Keep your account secure</p>
                  </div>
                </div>
                <div className="dash-section-body">
                  {pwMsg.text && (
                    <div
                      className={`alert alert-${pwMsg.type === "success" ? "success" : "error"}`}
                      style={{ marginBottom: "1.25rem" }}
                    >
                      {pwMsg.text}
                    </div>
                  )}
                  <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        value={pwForm.currentPassword}
                        onChange={(e) =>
                          setPwForm((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        placeholder="Min. 6 characters"
                        value={pwForm.newPassword}
                        onChange={(e) =>
                          setPwForm((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Repeat new password"
                        value={pwForm.confirmPassword}
                        onChange={(e) =>
                          setPwForm((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={saving}
                    >
                      <FaLock /> {saving ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedBill && (
        <InvoiceModal
          bill={selectedBill}
          onClose={() => setSelectedBill(null)}
          onPay={handlePayBill}
          payingId={payingBillId}
        />
      )}
    </div>
  );
};

const AppointmentCard = ({ appt, detailed = false }) => (
  <div className="appt-card">
    <div className="appt-card-icon">
      <FaUserMd />
    </div>
    <div className="appt-card-info">
      <h4>{appt.doctor}</h4>
      <div
        style={{
          fontSize: "0.8rem",
          color: "#5f7285",
          marginBottom: "0.35rem",
        }}
      >
        {appt.department}
      </div>
      <div className="appt-meta">
        <span>
          <FaCalendarAlt /> {appt.date}
        </span>
        <span>
          <FaClock /> {appt.time}
        </span>
        {detailed && appt.reason && (
          <span>
            <FaMapMarkerAlt /> {appt.reason}
          </span>
        )}
      </div>
    </div>
    <div className="appt-card-actions">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          fontSize: "0.8rem",
          fontWeight: 600,
        }}
      >
        {STATUS_ICON[appt.status]}
        {appt.status}
      </div>
    </div>
  </div>
);

const BillCard = ({ bill, onView, onPay, payingId }) => (
  <div className="bill-card">
    <div className="bill-card-icon">
      <FaFileInvoiceDollar />
    </div>
    <div className="bill-card-info">
      <h4>{bill.doctor}</h4>
      <p>
        {bill.department} &nbsp;|&nbsp; {bill.date} &nbsp;|&nbsp; Invoice:{" "}
        {bill.invoiceNumber}
      </p>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
      }}
    >
      <div className="bill-amount">
        ₹{bill.totalAmount?.toLocaleString()}
        <small style={PAYMENT_STATUS_STYLE[bill.paymentStatus] || {}}>
          {bill.paymentStatus}
        </small>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          className="btn-view-invoice"
          onClick={() => onView(bill)}
          type="button"
        >
          View Invoice
        </button>
        {bill.paymentStatus === "Unpaid" && (
          <button
            className="btn-pay"
            onClick={() => onPay(bill._id)}
            disabled={payingId === bill._id}
            type="button"
          >
            <FaCreditCard />{" "}
            {payingId === bill._id ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>
    </div>
  </div>
);

const InvoiceModal = ({ bill, onClose, onPay, payingId }) => {
  const handlePrint = () => window.print();

  return (
    <div
      className="invoice-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="invoice-modal">
        <div className="invoice-header">
          <div className="invoice-header-top">
            <div>
              <h2>HealthNest</h2>
              <p>Medical Invoice</p>
            </div>
            <button
              className="invoice-close-btn"
              onClick={onClose}
              type="button"
            >
              <FaTimes />
            </button>
          </div>
          <div className="invoice-number">Invoice # {bill.invoiceNumber}</div>
        </div>

        <div className="invoice-body">
          <div className="invoice-info-grid">
            <div className="invoice-info-item">
              <label>Patient Name</label>
              <p>{bill.patientName}</p>
            </div>
            <div className="invoice-info-item">
              <label>Email</label>
              <p>{bill.patientEmail}</p>
            </div>
            <div className="invoice-info-item">
              <label>Doctor</label>
              <p>{bill.doctor}</p>
            </div>
            <div className="invoice-info-item">
              <label>Department</label>
              <p>{bill.department}</p>
            </div>
            <div className="invoice-info-item">
              <label>Appointment Date</label>
              <p>{bill.date}</p>
            </div>
            <div className="invoice-info-item">
              <label>Time</label>
              <p>{bill.time}</p>
            </div>
            <div className="invoice-info-item">
              <label>Payment Status</label>
              <p>
                <span
                  style={{
                    ...PAYMENT_STATUS_STYLE[bill.paymentStatus],
                    padding: "0.2rem 0.6rem",
                    borderRadius: "6px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  {bill.paymentStatus}
                </span>
              </p>
            </div>
            {bill.paymentMethod && (
              <div className="invoice-info-item">
                <label>Payment Method</label>
                <p>{bill.paymentMethod}</p>
              </div>
            )}
          </div>

          <table className="invoice-items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bill.items?.map((item, i) => (
                <tr key={i}>
                  <td>{item.description}</td>
                  <td style={{ textAlign: "right" }}>
                    ₹{item.amount?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-totals">
            <div className="invoice-total-row">
              <span>Subtotal</span>
              <span>₹{bill.subtotal?.toLocaleString()}</span>
            </div>
            {bill.tax > 0 && (
              <div className="invoice-total-row">
                <span>Tax (5%)</span>
                <span>₹{bill.tax?.toLocaleString()}</span>
              </div>
            )}
            {bill.discount > 0 && (
              <div className="invoice-total-row">
                <span>Discount</span>
                <span style={{ color: "#18a999" }}>
                  - ₹{bill.discount?.toLocaleString()}
                </span>
              </div>
            )}
            <div className="invoice-total-row grand-total">
              <span>Total Amount</span>
              <span>₹{bill.totalAmount?.toLocaleString()}</span>
            </div>
          </div>

          {bill.notes && (
            <div
              style={{
                padding: "0.75rem 1rem",
                background: "#f7fafd",
                borderRadius: "8px",
                fontSize: "0.85rem",
                color: "#5f7285",
                marginBottom: "1rem",
              }}
            >
              <strong style={{ color: "#17324d" }}>Notes:</strong> {bill.notes}
            </div>
          )}
        </div>

        <div className="invoice-footer">
          <button
            className="btn-view-invoice"
            onClick={handlePrint}
            type="button"
          >
            <FaPrint /> Print
          </button>
          {bill.paymentStatus === "Unpaid" && (
            <button
              className="btn-pay"
              disabled
              style={{ opacity: 0.65, cursor: "not-allowed" }}
              type="button"
            >
              <FaCreditCard /> Payment handled by Admin
            </button>
          )}
          {bill.paymentStatus === "Paid" && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#065f46",
                fontWeight: 700,
                fontSize: "0.88rem",
              }}
            >
              <FaCheckCircle /> Paid Successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
