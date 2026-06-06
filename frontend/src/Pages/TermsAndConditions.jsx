import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Assets/css/pages.css';

const TermsAndConditions = () => (
  <div>
    <Header />
    <div className="page-hero">
      <h1>Terms & Conditions</h1>
      <p>Last updated: January 1, 2024</p>
    </div>
    <section className="page-section">
      <div className="container">
        <div className="policy-content">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the HealthNest website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>

          <h2>2. Use of Services</h2>
          <p>HealthNest services are intended for legitimate healthcare purposes. You agree to:</p>
          <ul>
            <li>Provide accurate and truthful information</li>
            <li>Use the platform only for lawful purposes</li>
            <li>Not attempt to access unauthorized areas of the system</li>
            <li>Maintain the confidentiality of your account credentials</li>
          </ul>

          <h2>3. Medical Disclaimer</h2>
          <p>Information provided on this website is for general informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for medical decisions.</p>

          <h2>4. Appointment Policy</h2>
          <p>Appointments must be cancelled at least 24 hours in advance. Repeated no-shows may result in account suspension. Emergency services are available regardless of prior bookings.</p>

          <h2>5. Payment & Billing</h2>
          <p>All fees are due at the time of service unless prior billing arrangements have been made. We accept most major insurance plans and provide transparent billing statements.</p>

          <h2>6. Intellectual Property</h2>
          <p>All content on the HealthNest platform, including text, graphics, logos, and software, is the property of HealthNest and protected by intellectual property laws.</p>

          <h2>7. Limitation of Liability</h2>
          <p>HealthNest shall not be liable for indirect, incidental, or consequential damages arising from the use of our services beyond what is permitted by applicable law.</p>

          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>

          <h2>9. Contact</h2>
          <p>Questions about these terms? Contact us at legal@healthnest.com or +1 (800) 123-4567.</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default TermsAndConditions;
