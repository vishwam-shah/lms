import React from 'react';
import styles from './Hero.module.css'; // Import the CSS module

import people from '../../../public/assets/people.png';
import ai from '../../../public/assets/ai.png';
import Image from 'next/image';

const Header = () => {
  return (
    <div className={styles.gpt3Header}>
      <div className={styles.gpt3HeaderContent}>
        <h1 className={styles.gradientText}>LMS: Professional E-Learning Made Simple</h1>
        <p>
          Experience a modern Learning Management System designed for students and educators. Easily enroll in courses, track your progress, and connect with a vibrant learning community. For institutions and instructors, our platform also includes a powerful admin dashboard for seamless course and user management.
        </p>

        <div className={styles.gpt3HeaderContentInput}>
          <input className={styles.gpt3HeaderContentInputInput} type="email" placeholder="Your Email Address" />
          <button className={styles.gpt3HeaderContentInputButton} type="submit">Get Started</button>
        </div>

        <div className={styles.gpt3HeaderContentPeople}>
          <Image className={styles.gpt3HeaderContentPeopleImg} src={people} alt="People" />
          <p>500k+ learners and educators trust our LMS for a professional, easy-to-use online education experience.</p>
        </div>
      </div>

      <div className={styles.gpt3HeaderImage}>
        <Image 
          src={ai} 
          alt="AI" 
          priority 
          quality={60} 
          sizes="(max-width: 700px) 100vw, 50vw" 
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default Header;
