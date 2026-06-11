import React, { useState, useEffect } from "react";
import DoctorSidebar from "../Components/DoctorSidebar";
import { FaSearch, FaUsers } from "react-icons/fa";
import { appointmentAPI } from "../services/api";

const DoctorPatients = () => {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await appointmentAPI.getDoctorPatients();

      setPatients(res.data || []);
    } catch (err) {
      console.error(err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = patients.filter(
    (p) =>
      `${p.name}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <DoctorSidebar />

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-title">
            <h1>My Patients</h1>
            <p>Patients assigned to you</p>
          </div>
        </div>

        <div className="admin-content">
          <div className="data-table-wrap">
            <div className="table-header">
              <div className="table-header-left">
                <h2>Patient Records</h2>
                <p>{filtered.length} patients found</p>
              </div>

              <div className="table-search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search patient..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((p, i) => (
                      <tr key={p._id}>
                        <td>{i + 1}</td>
                        <td>
                          {p.name}
                        </td>

                        <td>{p.phone}</td>

                        <td>{p.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        <FaUsers />
                        No patients found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatients;