import React, { useState, useEffect } from "react";
import DoctorSidebar from "../Components/DoctorSidebar";
import { FaSearch, FaCalendarCheck } from "react-icons/fa";
import { appointmentAPI } from "../services/api";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await appointmentAPI.getDoctorAppointments();

      setAppointments(res.data || []);
    } catch (err) {
      console.error(err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await appointmentAPI.updateStatus(id, status);

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id
            ? {
                ...a,
                status,
              }
            : a
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = appointments.filter(
    (a) =>
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <DoctorSidebar />

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-title">
            <h1>My Appointments</h1>
            <p>Manage your appointments</p>
          </div>
        </div>

        <div className="admin-content">
          <div className="data-table-wrap">
            <div className="table-header">
              <div className="table-header-left">
                <h2>Appointments</h2>
                <p>{filtered.length} records</p>
              </div>

              <div className="table-search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <p>Loading appointments...</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((a) => (
                      <tr key={a._id}>
                        <td>{a.name}</td>

                        <td>{a.department}</td>

                        <td>{a.date}</td>

                        <td>{a.time}</td>

                        <td>
                          <select
                            value={a.status}
                            onChange={(e) =>
                              updateStatus(a._id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <FaCalendarCheck />
                        No appointments found
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

export default DoctorAppointments;