import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FAQAccordion from "../Components/FAQAccordion";

const faqs = [
  {
    question: "How do I book an appointment at HealthNest?",
    answer:
      'You can book an appointment by registering/logging in and visiting the "Book Appointment" page. Fill in your details, choose a doctor and preferred time slot, and submit.',
  },
  {
    question: "What insurance plans do you accept?",
    answer:
      "We accept most major insurance plans including Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, and United Healthcare. Please contact our billing department for specific coverage details.",
  },
  {
    question: "Are emergency services available 24/7?",
    answer:
      "Yes, our emergency department operates 24 hours a day, 7 days a week, 365 days a year. Our emergency hotline is +1 (800) 911-0000.",
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Log in to your account and manage your appointments from the dashboard.",
  },
  {
    question: "How do I get my test results?",
    answer:
      "Test results are available through your patient portal. You will receive a notification when results are ready, typically within 24-48 hours for most tests.",
  },
  {
    question: "Do you offer telemedicine / online consultations?",
    answer:
      "Yes, we offer video consultations for follow-up visits and non-emergency consultations. Book a telemedicine appointment through our portal.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring a valid government-issued ID, your insurance card, a list of current medications, previous medical records if available, and any referral letters from your primary care physician.",
  },
  {
    question: "How do I contact my doctor after hours?",
    answer:
      "For urgent medical concerns after hours, call our 24/7 nurse hotline at +1 (800) 123-4567. For emergencies, call 911 or visit our emergency department directly.",
  },
];

const FAQ = () => (
  <div>
    <Header />
    <div className="page-hero">
      <h1>Frequently Asked Questions</h1>
      <p>Find quick answers to common questions about HealthNest</p>
    </div>
    <section className="page-section">
      <div className="container" style={{ maxWidth: "800px" }}>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
    <Footer />
  </div>
);

export default FAQ;
