'use client'
import React from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';

const About = () => {
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(2); // About is item 2 in nav
  const [route, setRoute] = React.useState("Login");

  return (
    <div>
      <Heading 
        title="About Us - E-Learning" 
        description="Learn more about our e-learning platform" 
        keywords="About, E-Learning, Education, Online Learning" 
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
            About E-Learning
          </h1>
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
            <p>
              Welcome to E-Learning, your premier destination for online education and skill development. 
              We are committed to providing high-quality, accessible learning experiences for students worldwide.
            </p>
            <p>
              Our platform offers a wide range of courses covering programming, web development, 
              machine learning, and many other cutting-edge technologies. Whether you&apos;re a beginner 
              looking to start your journey or an experienced professional seeking to expand your skills, 
              we have something for everyone.
            </p>
            <p>
              With expert instructors, interactive content, and a supportive community, 
              E-Learning is designed to help you achieve your learning goals efficiently and effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
