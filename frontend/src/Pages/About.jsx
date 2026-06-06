import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import StatsSection from "../Components/StatsSection";
import { FaHospital, FaCheckCircle } from "react-icons/fa";
import "../Assets/css/pages.css";

const features = [
  "Advanced Medical Technology & Equipment",
  "200+ Specialized Doctors & Specialists",
  "24/7 Emergency & Critical Care",
  "International Quality Standards (JCI Accredited)",
  "Patient-Centered Compassionate Care",
  "Affordable & Transparent Pricing",
];

const About = () => (
  <div>
    <Header />
    <div className="page-hero">
      <h1>About HealthNest</h1>
      <p>Your trusted partner in health and wellness since 2005</p>
    </div>

    <section className="page-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Delivering Excellence in Healthcare</h2>
            <p>
              HealthNest was founded in 2005 with a singular mission: to make
              world-class healthcare accessible to everyone. Over the past 18+
              years, we have grown into one of the most trusted hospital
              networks, serving over 50,000 patients annually.
            </p>
            <p>
              Our team of 200+ expert doctors across 25+ specialties work
              collaboratively to deliver personalized, evidence-based treatment
              plans for every patient. We combine cutting-edge technology with
              compassionate care to achieve the best possible health outcomes.
            </p>
            <div className="about-features">
              {features.map((f, i) => (
                <div className="about-feature" key={i}>
                  <FaCheckCircle />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <FaHospital className="big-icon" />
          </div>
        </div>
      </div>
    </section>

    <StatsSection />
    <section className="page-section">
      <div className="container">
        <div className="grid-2">
          <div
            style={{
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                color: "var(--primary)",
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              Our Mission
            </h3>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: "1.75",
                fontSize: "0.95rem",
              }}
            >
              To provide compassionate, high-quality, and affordable healthcare
              services to every patient regardless of their background, ensuring
              dignity and respect throughout their healthcare journey.
            </p>
          </div>
          <div
            style={{
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                color: "var(--secondary)",
                fontSize: "1.2rem",
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              Our Vision
            </h3>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: "1.75",
                fontSize: "0.95rem",
              }}
            >
              To be the most trusted and innovative healthcare provider, setting
              new standards in patient care, medical research, and community
              wellness across the nation.
            </p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
