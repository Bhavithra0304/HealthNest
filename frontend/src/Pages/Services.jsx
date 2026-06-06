import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ServiceCard from "../Components/ServiceCard";
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaEye,
  FaTooth,
  FaBaby,
  FaLungs,
  FaStethoscope,
  FaSyringe,
  FaMicroscope,
  FaRadiation,
  FaFlask,
} from "react-icons/fa";

const services = [
  {
    icon: <FaHeartbeat />,
    title: "Cardiology",
    description:
      "Complete heart care including diagnostics, interventional cardiology, and cardiac surgery.",
  },
  {
    icon: <FaBrain />,
    title: "Neurology",
    description:
      "Expert care for brain, spine, and nervous system conditions with advanced neuroimaging.",
  },
  {
    icon: <FaBone />,
    title: "Orthopedics",
    description:
      "Joint replacements, sports injuries, spine surgery and musculoskeletal rehabilitation.",
  },
  {
    icon: <FaEye />,
    title: "Ophthalmology",
    description:
      "Comprehensive eye care from routine exams to LASIK and complex eye surgeries.",
  },
  {
    icon: <FaTooth />,
    title: "Dentistry",
    description:
      "Full dental services: preventive, cosmetic, orthodontics, implants and oral surgery.",
  },
  {
    icon: <FaBaby />,
    title: "Pediatrics",
    description:
      "Specialized medical care for children from newborn through adolescence.",
  },
  {
    icon: <FaLungs />,
    title: "Pulmonology",
    description:
      "Diagnosis and treatment of respiratory and lung diseases including asthma and COPD.",
  },
  {
    icon: <FaStethoscope />,
    title: "Internal Medicine",
    description:
      "Comprehensive adult primary care, chronic disease management and preventive medicine.",
  },
  {
    icon: <FaSyringe />,
    title: "Oncology",
    description:
      "Multidisciplinary cancer care including chemotherapy, radiation and targeted therapy.",
  },
  {
    icon: <FaMicroscope />,
    title: "Pathology & Lab",
    description:
      "Advanced diagnostic laboratory services for accurate and timely test results.",
  },
  {
    icon: <FaRadiation />,
    title: "Radiology",
    description:
      "State-of-the-art imaging: MRI, CT, X-Ray, Ultrasound and Interventional radiology.",
  },
  {
    icon: <FaFlask />,
    title: "Dermatology",
    description:
      "Medical and cosmetic dermatology for skin, hair and nail conditions.",
  },
];

const Services = () => (
  <div>
    <Header />

    <div className="page-hero">
      <h1>Our Medical Services</h1>
      <p>Comprehensive healthcare across 25+ specialties under one roof</p>
    </div>

    <section className="page-section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">
            Expert care in all major medical disciplines
          </p>
        </div>
        <div className="grid-3">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Services;
