import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import StatsSection from "../Components/StatsSection";
import DoctorCard from "../Components/DoctorCard";
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaEye,
  FaTooth,
  FaBaby,
  FaPhoneAlt,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaAward,
  FaUserMd,
} from "react-icons/fa";
import "../Assets/css/home.css";

const services = [
  {
    icon: <FaHeartbeat />,
    title: "Cardiology",
    description:
      "Comprehensive heart care with advanced diagnostics and interventional treatment.",
  },
  {
    icon: <FaBrain />,
    title: "Neurology",
    description: "Expert care for brain, spine, and nervous system disorders.",
  },
  {
    icon: <FaBone />,
    title: "Orthopedics",
    description:
      "Complete musculoskeletal care — from joint replacements to sports medicine.",
  },
  {
    icon: <FaEye />,
    title: "Ophthalmology",
    description:
      "Advanced eye care including LASIK, cataract surgery, and vision correction.",
  },
  {
    icon: <FaTooth />,
    title: "Dentistry",
    description:
      "Full-spectrum dental services: cosmetic, implants and orthodontics.",
  },
  {
    icon: <FaBaby />,
    title: "Pediatrics",
    description:
      "Specialized medical care for children from newborns to adolescents.",
  },
];

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 15,
    rating: "4.9",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: 12,
    rating: "4.8",
  },
  {
    name: "Dr. Emily Davis",
    specialty: "Orthopedic Surgeon",
    experience: 10,
    rating: "4.9",
  },
  {
    name: "Dr. Robert Wilson",
    specialty: "Pediatrician",
    experience: 18,
    rating: "5.0",
  },
];

const testimonials = [
  {
    text: "HealthNest saved my life. The cardiology team was exceptional. I received timely, professional care that made all the difference.",
    name: "James Anderson",
    role: "Heart Patient",
    rating: 5,
  },
  {
    text: "The staff here are incredibly compassionate. My daughter received amazing pediatric care. I highly recommend HealthNest to every parent!",
    name: "Maria Garcia",
    role: "Parent",
    rating: 5,
  },
  {
    text: "State-of-the-art facilities and the most knowledgeable doctors I've ever encountered. The online booking is so convenient!",
    name: "David Brown",
    role: "Ortho Patient",
    rating: 5,
  },
];

const whyUs = [
  {
    icon: <FaShieldAlt />,
    title: "JCI Accredited",
    desc: "International Joint Commission accreditation ensuring world-class safety and quality standards.",
  },
  {
    icon: <FaUserMd />,
    title: "200+ Specialists",
    desc: "Expert doctors across 25+ specialties with decades of combined clinical experience.",
  },
  {
    icon: <FaClock />,
    title: "24/7 Emergency Care",
    desc: "Round-the-clock emergency services with rapid response teams always on standby.",
  },
  {
    icon: <FaAward />,
    title: "Award-Winning Care",
    desc: "Recognized nationally for excellence in patient outcomes and healthcare innovation.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Advanced Technology",
    desc: "Latest diagnostic and surgical equipment for precise, minimally invasive treatments.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Patient-First Approach",
    desc: "Every decision centers on your comfort, dignity, and long-term well-being.",
  },
];

const Home = () => (
  <div>
    <Header />
    <Hero />
    <StatsSection />

    <section className="page-section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-label">
            <FaHeartbeat /> Our Specialties
          </span>
          <h2 className="section-title">Comprehensive Medical Services</h2>
          <p className="section-subtitle">
            Expert care across all major disciplines under one trusted roof
          </p>
        </div>
        <div className="grid-3">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="service-arrow">
                Learn more <FaArrowRight style={{ fontSize: "0.75rem" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.75rem" }}>
          <Link to="/services" className="btn-primary">
            View All Services <FaArrowRight style={{ fontSize: "0.8rem" }} />
          </Link>
        </div>
      </div>
    </section>

    <section className="page-section-alt">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-label">
            <FaAward /> Why HealthNest
          </span>
          <h2 className="section-title">Why Patients Choose Us</h2>
          <p className="section-subtitle">
            Trusted by thousands of patients for over 18 years
          </p>
        </div>
        <div className="why-us-grid">
          {whyUs.map((w, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{w.icon}</div>
              <div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="page-section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-label">
            <FaUserMd /> Our Team
          </span>
          <h2 className="section-title">Meet Our Expert Doctors</h2>
          <p className="section-subtitle">
            Highly qualified, experienced and compassionate medical
            professionals
          </p>
        </div>
        <div className="grid-4">
          {doctors.map((d, i) => (
            <DoctorCard key={i} {...d} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.75rem" }}>
          <Link to="/doctors" className="btn-primary">
            View All Doctors <FaArrowRight style={{ fontSize: "0.8rem" }} />
          </Link>
        </div>
      </div>
    </section>

    <section className="testimonials-section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-label">
            <FaStar /> Testimonials
          </span>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle">
            Real stories from real people who experienced HealthNest care
          </p>
        </div>
        <div className="grid-3">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-quote">"</div>
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, j) => (
                  <FaStar key={j} />
                ))}
              </div>
              <p>{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="testimonial-author-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="emergency-banner">
      <div className="container">
        <h2>24/7 Emergency Services Available</h2>
        <p>
          Our emergency response team is always on standby. Don't wait — call us
          immediately.
        </p>
        <a href="tel:+18009110000" className="emergency-btn">
          <FaPhoneAlt /> Call Emergency: +1 (800) 911-0000
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default Home;
