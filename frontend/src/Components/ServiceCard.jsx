import React from "react";

const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="service-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default ServiceCard;
