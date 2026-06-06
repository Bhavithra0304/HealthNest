import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Services from "../Pages/Services";
import Doctors from "../Pages/Doctors";
import Contact from "../Pages/Contact";
import FAQ from "../Pages/FAQ";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsAndConditions from "../Pages/TermsAndConditions";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import Appointment from "../Pages/Appointment";
import AdminDashboard from "../Pages/AdminDashboard";
import ManageDoctors from "../Pages/ManageDoctors";
import ManagePatients from "../Pages/ManagePatients";
import ManageAppointments from "../Pages/ManageAppointments";
import NotFound from "../Pages/NotFound";
import ProtectedRoute from "../Components/ProtectedRoute";
import UserDashboard from "../Pages/UserDashboard";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/appointment" element={<ProtectedRoute> <Appointment /></ProtectedRoute> }/>
      <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute> }/>
      <Route path="/admin/doctors" element={<ProtectedRoute adminOnly><ManageDoctors /></ProtectedRoute>}/>
      <Route path="/admin/patients" element={<ProtectedRoute adminOnly><ManagePatients /></ProtectedRoute>}/>
      <Route path="/admin/appointments" element={<ProtectedRoute adminOnly><ManageAppointments /></ProtectedRoute>}/>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
