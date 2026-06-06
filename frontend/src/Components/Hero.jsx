import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUserMd,
  FaHeartbeat,
  FaAward,
  FaClock,
  FaCheckCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import "../Assets/css/home.css";

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      {/* Left */}
      <div className="hero-text">
        <div className="hero-tag">
          <FaHeartbeat /> Trusted Healthcare Since 2005
        </div>
        <h1>
          Your Health Is Our <span className="highlight">Top Priority</span>
        </h1>
        <p>
          Experience world-class medical care with our team of 200+ expert
          doctors, cutting-edge technology, and compassionate staff — available
          24/7 for you.
        </p>
        <div className="hero-actions">
          <Link to="/appointment" className="hero-btn-primary">
            <FaCalendarCheck /> Book Appointment
          </Link>
          <Link to="/doctors" className="hero-btn-outline">
            <FaUserMd /> Meet Our Doctors
          </Link>
        </div>
        <div className="hero-trust">
          {[
            { icon: <FaCheckCircle />, text: "JCI Accredited" },
            { icon: <FaAward />, text: "Award Winning" },
            { icon: <FaClock />, text: "24/7 Support" },
          ].map((t, i) => (
            <div className="hero-trust-item" key={i}>
              {t.icon} {t.text}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card-grid">
          {[
            { icon: <FaUserMd />, number: "200+", label: "Expert Doctors" },
            {
              icon: <FaHeartbeat />,
              number: "50K+",
              label: "Patients Treated",
            },
            { icon: <FaAward />, number: "25+", label: "Departments" },
            { icon: <FaClock />, number: "24/7", label: "Emergency Care" },
          ].map((item, i) => (
            <div className="hero-stat-card" key={i}>
              <div className="icon">{item.icon}</div>
              <span className="number">{item.number}</span>
              <span className="label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-emergency-card">
          <div className="pulse">
            <FaPhoneAlt />
          </div>
          <div>
            <strong>Emergency Hotline</strong>
            <span>+1 (800) 911-0000 — Available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
