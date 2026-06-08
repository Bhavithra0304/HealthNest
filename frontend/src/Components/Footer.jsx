import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeartbeat,
  FaChevronRight,
} from "react-icons/fa";
import "../Assets/css/footer.css";
import logo from "../Assets/images/image.png"

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      {/* Brand */}
      <div className="footer-brand">
        <Link to="/" className="logo">
          <img src={logo} alt="HealthNest Logo" className="logo-image" />
        </Link>
        <p>
          HealthNest is committed to delivering world-class healthcare services
          with compassion, precision, and innovation — putting patients first.
        </p>
        <div className="social-links">
          <a href="#!" className="social-link" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#!" className="social-link" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#!" className="social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#!" className="social-link" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul>
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/services", label: "Services" },
            { to: "/doctors", label: "Our Doctors" },
            { to: "/appointment", label: "Book Appointment" },
            { to: "/contact", label: "Contact Us" },
          ].map((link) => (
            <li key={link.to}>
              <Link to={link.to}>
                <FaChevronRight style={{ fontSize: "0.7rem" }} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-col">
        <h4>Resources</h4>
        <ul>
          {[
            { to: "/faq", label: "FAQ" },
            { to: "/privacy-policy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms & Conditions" },
            { to: "/login", label: "Patient Login" },
            { to: "/register", label: "Register" },
          ].map((link) => (
            <li key={link.to}>
              <Link to={link.to}>
                <FaChevronRight style={{ fontSize: "0.7rem" }} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-col">
        <h4>Contact Us</h4>
        <div className="contact-item">
          <FaMapMarkerAlt />
          <span>123 Health Avenue, Medical District, City - 100001</span>
        </div>
        <div className="contact-item">
          <FaPhoneAlt />
          <span>
            +1 (800) 123-4567
            <br />
            Emergency: +1 (800) 911-0000
          </span>
        </div>
        <div className="contact-item">
          <FaEnvelope />
          <span>
            info@healthnest.com
            <br />
            support@healthnest.com
          </span>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>
        © {new Date().getFullYear()} HealthNest. All rights reserved. Made with{" "}
        <FaHeartbeat style={{ color: "#18a999", margin: "0 3px" }} /> for better
        health.
      </p>
      <div className="footer-bottom-links">
        <Link to="/privacy-policy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/faq">FAQ</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
