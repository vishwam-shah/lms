'use client'
import React from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';

const FAQ = () => {
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(4); // FAQ is item 4 in nav
  const [route, setRoute] = React.useState("Login");

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "You can enroll in any course by clicking the 'Enroll Now' button on the course page. You'll need to create an account first if you haven't already."
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes, most of our courses are self-paced, allowing you to learn at your own speed and schedule."
    },
    {
      question: "Do I get a certificate upon completion?",
      answer: "Yes, you'll receive a certificate of completion for each course you successfully finish."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Absolutely! Our platform is fully responsive and works seamlessly on all devices including smartphones and tablets."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and various other payment methods depending on your location."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer a 30-day money-back guarantee for most courses. Please check the specific course terms for details."
    }
  ];

  return (
    <div>
      <Heading 
        title="FAQ - E-Learning" 
        description="Frequently asked questions about our e-learning platform" 
        keywords="FAQ, Questions, E-Learning, Help, Support" 
      />
      <Header
        open={open} 
        setOpen={setOpen} 
        activeItem={activeItem} 
        setRoute={setRoute} 
        route={route}
      />
      <div className="min-h-screen pt-[80px] px-4">
        <div className="max-w-4xl mx-auto py-16">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Feel free to contact our support team.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
