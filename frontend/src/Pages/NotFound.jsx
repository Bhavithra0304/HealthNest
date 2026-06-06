import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { FaHome, FaSearch } from "react-icons/fa";
import "../Assets/css/pages.css";

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" className="btn-primary">
            <FaHome /> Go Home
          </Link>
          <Link to="/contact" className="btn-secondary">
            <FaSearch /> Contact Support
          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default NotFound;
