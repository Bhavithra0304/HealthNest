import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DoctorCard from "../Components/DoctorCard";
import { FaSearch } from "react-icons/fa";
import { BASE_URL } from "../services/api";
const specialties = [
  "All",
  "Cardiologist",
  "Neurologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Dermatologist",
  "Oncologist",
  "Ophthalmologist",
  "Pulmonologist",
  "Gynecologist",
];

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${BASE_URL}/doctors`);
      const data = await response.json();

      console.log("Doctors API Response:", data.data);

      if (data.success) {
        setDoctors(data?.data?.doctors || []);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = doctors.filter((doctor) => {
    const matchSearch =
      doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || doctor.specialization === filter;

    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <>
        <Header />
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            fontSize: "1.2rem",
          }}
        >
          Loading doctors...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Header />

      <div className="page-hero">
        <h1>Our Doctors</h1>
        <p>
          Meet our team of experienced and compassionate medical professionals
        </p>
      </div>

      <section className="page-section">
        <div className="container">
          {/* Filters */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "20px",
                    border: "1.5px solid var(--border)",
                    background:
                      filter === s ? "var(--primary)" : "var(--surface)",
                    color: filter === s ? "#fff" : "var(--text)",
                    fontWeight: "500",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
              }}
            >
              <FaSearch style={{ color: "var(--muted)" }} />

              <input
                type="text"
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "0.9rem",
                  color: "var(--text)",
                  width: "180px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div className="grid-4">
            {filtered.length > 0 ? (
              filtered.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  name={doctor.name}
                  specialty={doctor.specialization}
                  experience={doctor.experience}
                  rating="4.8"
                />
              ))
            ) : (
              <p
                style={{
                  color: "var(--muted)",
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "3rem",
                }}
              >
                No doctors found matching your search.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;
