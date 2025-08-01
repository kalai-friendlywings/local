import React, { useState } from 'react';
// Removed: import { ChevronDown } from 'lucide-react'; // This import was causing an error

// Team members data
const teamMembers = [
  { name: 'Kalaiyarasan', role: 'Founder & CEO', image: 'https://placehold.co/150x150/FCA5A5/DC2626?text=K' }, // Placeholder image with initials
  { name: 'Mugunthan', role: 'Product Manager', image: 'https://placehold.co/150x150/FCA5A5/DC2626?text=M' },
  { name: 'Hariharan', role: 'Lead Developer', image: 'https://placehold.co/150x150/FCA5A5/DC2626?text=H' },
];

// FAQ data
const faqs = [
  { question: 'What is Doom Shop?', answer: 'Doom Shop connects you with nearby stores for convenient in-store pickups, streamlining your shopping experience.' },
  { question: 'How do I order?', answer: 'Simply search for the items you need, select your preferred nearby store, and place your order for quick and easy pickup.' },
  { question: 'Is Doom Shop available in my area?', answer: 'We are rapidly expanding! Please check our app or website for the most up-to-date information on service availability in your location.' },
  { question: 'What payment methods are accepted?', answer: 'We support a variety of payment methods, including credit/debit cards and popular digital wallets, for a seamless checkout experience.' },
];

export default function App() {
  // State to manage which FAQ item is open
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Function to toggle FAQ item visibility
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    // Main container for the About page
    <div className="about-container">
      {/* Embedded CSS for styling */}
      <style>
        {`
        /* General Styles */
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .about-container {
          min-height: 100vh;
          background-color: #f8fafc; /* bg-gray-50 */
          color: #334155; /* text-gray-800 */
          padding: 3rem 1rem; /* py-12 px-4 */
        }

        /* Introduction Section */
        .intro-section {
          text-align: center;
          max-width: 896px; /* max-w-4xl */
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 4rem; /* mb-16 */
          padding: 1.5rem; /* p-6 */
          background-color: #ffffff; /* bg-white */
          border-radius: 1rem; /* rounded-2xl */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
          border: 1px solid #f3f4f6; /* border border-gray-100 */
        }

        .intro-header {
          font-size: 3rem; /* text-5xl */
          font-weight: 800; /* font-extrabold */
          color: #dc2626; /* text-red-600 */
          margin-bottom: 1rem; /* mb-4 */
          letter-spacing: -0.025em; /* tracking-tight */
        }

        .intro-paragraph {
          font-size: 1.25rem; /* text-xl */
          color: #4b5563; /* text-gray-600 */
          line-height: 1.625; /* leading-relaxed */
          max-width: 672px; /* max-w-2xl */
          margin-left: auto;
          margin-right: auto;
        }

        /* Team Section */
        .team-section {
          text-align: center;
          max-width: 1152px; /* max-w-6xl */
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 4rem; /* mb-16 */
        }

        .team-header {
          font-size: 2.25rem; /* text-4xl */
          font-weight: 700; /* font-bold */
          color: #111827; /* text-gray-900 */
          margin-bottom: 2.5rem; /* mb-10 */
        }

        .team-members-grid {
          display: grid;
          grid-template-columns: 1fr; /* grid-cols-1 */
          gap: 2rem; /* gap-8 */
        }

        @media (min-width: 768px) { /* md */
          .team-members-grid {
            grid-template-columns: repeat(2, 1fr); /* md:grid-cols-2 */
          }
        }

        @media (min-width: 1024px) { /* lg */
          .team-members-grid {
            grid-template-columns: repeat(3, 1fr); /* lg:grid-cols-3 */
          }
        }

        .team-member-card {
          background-color: #ffffff; /* bg-white */
          border-radius: 1rem; /* rounded-2xl */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
          padding: 2rem; /* p-8 */
          height: 100%; /* h-full */
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: scale(1);
          transition: all 0.3s ease-in-out;
          border: 1px solid #f3f4f6; /* border border-gray-100 */
        }

        .team-member-card:hover {
          transform: scale(1.05); /* hover:scale-105 */
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* hover:shadow-2xl */
        }

        .team-member-image {
          border-radius: 9999px; /* rounded-full */
          width: 8rem; /* w-32 */
          height: 8rem; /* h-32 */
          object-fit: cover;
          margin-bottom: 1.5rem; /* mb-6 */
          border: 4px solid #ef4444; /* border-4 border-red-500 */
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md */
        }

        .team-member-name {
          font-size: 1.5rem; /* text-2xl */
          font-weight: 600; /* font-semibold */
          color: #111827; /* text-gray-900 */
          margin-bottom: 0.5rem; /* mb-2 */
        }

        .team-member-role {
          color: #dc2626; /* text-red-600 */
          font-size: 1.125rem; /* text-lg */
          font-weight: 500; /* font-medium */
        }

        /* FAQ Section */
        .faq-section {
          max-width: 896px; /* max-w-4xl */
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 4rem; /* mb-16 */
          padding: 1.5rem; /* p-6 */
          background-color: #ffffff; /* bg-white */
          border-radius: 1rem; /* rounded-2xl */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
          border: 1px solid #f3f4f6; /* border border-gray-100 */
        }

        .faq-header {
          font-size: 2.25rem; /* text-4xl */
          font-weight: 700; /* font-bold */
          color: #111827; /* text-gray-900 */
          text-align: center;
          margin-bottom: 2.5rem; /* mb-10 */
        }

        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 1rem; /* space-y-4 */
        }

        .faq-item {
          border: 1px solid #e5e7eb; /* border border-gray-200 */
          border-radius: 0.5rem; /* rounded-lg */
          overflow: hidden;
        }

        .faq-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1.25rem; /* p-5 */
          text-align: left;
          background-color: #f9fafb; /* bg-gray-50 */
          cursor: pointer;
          border: none;
          transition: background-color 0.2s ease-in-out;
          border-top-left-radius: 0.5rem; /* rounded-t-lg */
          border-top-right-radius: 0.5rem; /* rounded-t-lg */
        }

        .faq-button:hover {
          background-color: #f3f4f6; /* hover:bg-gray-100 */
        }

        .faq-button:focus {
          outline: none;
        }

        .faq-question {
          font-size: 1.125rem; /* text-lg */
          font-weight: 500; /* font-medium */
          color: #334155; /* text-gray-800 */
        }

        .faq-icon {
          width: 1.5rem; /* w-6 */
          height: 1.5rem; /* h-6 */
          color: #4b5563; /* text-gray-600 */
          transform-origin: center;
          transition: transform 0.3s ease-in-out;
          /* SVG specific styles */
          flex-shrink: 0; /* Prevent icon from shrinking */
        }

        .faq-icon.rotate-180 {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 1.25rem; /* p-5 */
          color: #4b5563; /* text-gray-700 */
          background-color: #ffffff; /* bg-white */
          border-top: 1px solid #e5e7eb; /* border-t border-gray-200 */
        }

        /* Testimonials Section */
        .testimonial-section {
          text-align: center;
          max-width: 768px; /* max-w-3xl */
          margin-left: auto;
          margin-right: auto;
          padding: 2rem; /* p-8 */
          background: linear-gradient(to bottom right, #ef4444, #b91c1c); /* bg-gradient-to-br from-red-500 to-red-700 */
          color: #ffffff; /* text-white */
          border-radius: 1rem; /* rounded-2xl */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
        }

        .testimonial-header {
          font-size: 2.25rem; /* text-4xl */
          font-weight: 700; /* font-bold */
          margin-bottom: 2rem; /* mb-8 */
        }

        .testimonial-content {
          display: flex;
          justify-content: center;
        }

        .testimonial-quote {
          position: relative;
          padding: 1.5rem; /* p-6 */
          background-color: rgba(255, 255, 255, 0.1); /* bg-white bg-opacity-10 */
          border-radius: 0.75rem; /* rounded-xl */
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); /* shadow-inner */
          border: 1px solid rgba(255, 255, 255, 0.2); /* border border-white border-opacity-20 */
          backdrop-filter: blur(4px); /* backdrop-blur-sm */
          width: 100%;
        }

        .testimonial-quote p {
          font-size: 1.25rem; /* text-xl */
          font-style: italic;
          line-height: 1.625; /* leading-relaxed */
          margin-bottom: 1.5rem; /* mb-6 */
        }

        .testimonial-quote .blockquote-footer {
          font-size: 1.125rem; /* text-lg */
          font-weight: 600; /* font-semibold */
          color: rgba(255, 255, 255, 0.8); /* text-white text-opacity-80 */
        }

        /* Responsive adjustments for smaller screens */
        @media (max-width: 640px) { /* sm */
          .about-container {
            padding: 2rem 1rem;
          }
          .intro-header {
            font-size: 2.5rem; /* Adjust for smaller screens */
          }
          .intro-paragraph {
            font-size: 1rem;
          }
          .team-header, .faq-header, .testimonial-header {
            font-size: 2rem; /* Adjust for smaller screens */
          }
          .team-member-card {
            padding: 1.5rem;
          }
          .team-member-image {
            width: 6rem;
            height: 6rem;
          }
          .team-member-name {
            font-size: 1.25rem;
          }
          .team-member-role {
            font-size: 0.9rem;
          }
          .faq-question {
            font-size: 1rem;
          }
          .testimonial-quote p {
            font-size: 1rem;
          }
          .testimonial-quote .blockquote-footer {
            font-size: 0.9rem;
          }
        }
        `}
      </style>

      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="intro-section"
      >
        <h1 className="intro-header">About Doom Shop</h1>
        <p className="intro-paragraph">
          At Doom Shop, our mission is to empower local businesses by making them more accessible to you,
          offering a seamless and convenient in-store pickup experience.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
          hidden: { opacity: 0, y: 50 }
        }}
        className="team-section"
      >
        <h2 className="team-header">Our Visionary Team</h2>
        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-member-col"
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
              transition={{ duration: 0.5 }}
            >
              <div className="team-member-card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member-image"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/FCA5A5/DC2626?text=User" }} // Fallback for image loading errors
                />
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="faq-section"
      >
        <h2 className="faq-header">Frequently Asked Questions</h2>
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-button"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaqIndex === index}
              >
                <span className="faq-question">{faq.question}</span>
                {/* Replaced Lucide icon with inline SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`faq-icon ${openFaqIndex === index ? 'rotate-180' : 'rotate-0'}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openFaqIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="faq-answer"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="testimonial-section"
      >
        <h2 className="testimonial-header">What Our Customers Say</h2>
        <div className="testimonial-content">
          <blockquote className="testimonial-quote">
            <p>"Doom Shop has revolutionized my local shopping! It saved me hours of waiting and
              made pickups incredibly efficient and convenient. Highly recommended!"</p>
            <footer className="blockquote-footer">
              — A Happy Customer
            </footer>
          </blockquote>
        </div>
      </motion.div>
    </div>
  );
}
