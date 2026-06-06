import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaStar, FaClock } from "react-icons/fa";

const DoctorCard = ({ name, specialty, experience, rating }) => (
  <div className="doctor-card">
    <div className="doctor-img">
      <FaUserMd />
    </div>
    <div className="doctor-info">
      <h3>{name}</h3>
      <p className="doctor-specialty">{specialty}</p>
      <div className="doctor-meta">
        <span>
          <FaClock /> {experience} yrs exp
        </span>
        <span>
          <FaStar style={{ color: "#f59e0b" }} /> {rating}
        </span>
      </div>
      <Link to="/appointment" className="btn-primary">
        Book Appointment
      </Link>
    </div>
  </div>
);

export default DoctorCard;
