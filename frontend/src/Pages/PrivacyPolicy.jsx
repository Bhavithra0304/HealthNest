import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Assets/css/pages.css';

const PrivacyPolicy = () => (
  <div>
    <Header />
    <div className="page-hero">
      <h1>Privacy Policy</h1>
      <p>Last updated: January 1, 2024</p>
    </div>
    <section className="page-section">
      <div className="container">
        <div className="policy-content">
          <h2>1. Information We Collect</h2>
          <p>We collect personal information you provide when registering, booking appointments, or contacting us. This includes your name, email address, phone number, date of birth, and medical history relevant to your care.</p>

          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul>
            <li>Schedule and manage your appointments</li>
            <li>Provide and coordinate your medical care</li>
            <li>Send appointment reminders and health updates</li>
            <li>Process billing and insurance claims</li>
            <li>Improve our services and patient experience</li>
          </ul>

          <h2>3. Data Protection</h2>
          <p>We implement industry-standard security measures including SSL encryption, secure data storage, and strict access controls to protect your personal and medical information in compliance with HIPAA regulations.</p>

          <h2>4. Sharing of Information</h2>
          <p>We do not sell or rent your personal information. We may share data with treating physicians, insurance providers (with your consent), and regulatory authorities as required by law.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or request deletion of your personal data. Contact our Privacy Officer at privacy@healthnest.com for any data-related requests.</p>

          <h2>6. Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience and analyze site traffic. You may disable cookies in your browser settings, though some features may not function properly.</p>

          <h2>7. Contact Us</h2>
          <p>For privacy concerns, email us at privacy@healthnest.com or call +1 (800) 123-4567.</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default PrivacyPolicy;
