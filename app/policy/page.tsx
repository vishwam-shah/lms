'use client'
import React from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';

const Policy = () => {
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(3); // Policy is item 3 in nav
  const [route, setRoute] = React.useState("Login");

  return (
    <div>
      <Heading 
        title="Privacy Policy - E-Learning" 
        description="Our privacy policy and terms of service" 
        keywords="Privacy Policy, Terms, E-Learning, Legal" 
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
            Privacy Policy
          </h1>
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                enroll in courses, or contact us for support.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, and communicate with you about your account and our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@e-learning.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
