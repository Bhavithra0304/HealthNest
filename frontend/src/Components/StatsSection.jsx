import React from "react";
import { FaUserMd, FaUsers, FaHospital, FaAward } from "react-icons/fa";

const stats = [
  { icon: <FaUserMd />, number: "200+", label: "Expert Doctors" },
  { icon: <FaUsers />, number: "50,000+", label: "Patients Served" },
  { icon: <FaHospital />, number: "25+", label: "Departments" },
  { icon: <FaAward />, number: "18+", label: "Years of Excellence" },
];

const StatsSection = () => (
  <section className="stats-section">
    <div className="container">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon">{stat.icon}</div>
            <span className="stat-number">{stat.number}</span>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
