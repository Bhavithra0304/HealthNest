import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../Assets/css/pages.css";

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div>
      {faqs.map((faq, i) => (
        <div className={`faq-item ${openIndex === i ? "open" : ""}`} key={i}>
          <button
            className={`faq-question ${openIndex === i ? "active" : ""}`}
            onClick={() => toggle(i)}
          >
            {faq.question}
            <FaPlus
              className={`faq-icon ${openIndex === i ? "rotated" : ""}`}
            />
          </button>
          <div className={`faq-answer ${openIndex === i ? "open" : ""}`}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
