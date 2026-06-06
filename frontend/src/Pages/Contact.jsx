import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane,
} from "react-icons/fa";
import { contactAPI } from "../services/api";
import "../Assets/css/pages.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      await contactAPI.submit(form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      setApiError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="page-hero">
        <h1>Contact Us</h1>
        <p>We're here to help. Reach out to us anytime.</p>
      </div>

      <section className="page-section">
        <div className="container">
          <div className="grid-2" style={{ gap: "3rem" }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Send a Message
              </h2>
              {success && (
                <div className="alert alert-success">
                  Message sent! We'll get back to you within 24 hours.
                </div>
              )}
              {apiError && <div className="alert alert-error">{apiError}</div>}
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text" placeholder="John Doe" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <p className="error-msg">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email" placeholder="john@example.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <p className="error-msg">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text" placeholder="How can we help?" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                  {errors.subject && <p className="error-msg">{errors.subject}</p>}
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={5} placeholder="Write your message..." value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message && <p className="error-msg">{errors.message}</p>}
                </div>
                <button
                  type="submit" className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={loading}
                >
                  <FaPaperPlane /> {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
            <div>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Get In Touch
              </h2>
              <div className="contact-info-card">
                <h3>Contact Information</h3>
                {[
                  { icon: <FaMapMarkerAlt />, label: "Address", value: "123 Health Avenue, Medical District, City - 100001" },
                  { icon: <FaPhoneAlt />, label: "Phone", value: "+1 (800) 123-4567 | Emergency: +1 (800) 911-0000" },
                  { icon: <FaEnvelope />, label: "Email", value: "info@healthnest.com" },
                  { icon: <FaClock />, label: "Working Hours", value: "Mon-Fri: 8AM – 8PM | Emergency: 24/7" },
                ].map((item, i) => (
                  <div className="contact-detail-item" key={i}>
                    <div className="contact-detail-icon">{item.icon}</div>
                    <div>
                      <h4>{item.label}</h4>
                      <p>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
