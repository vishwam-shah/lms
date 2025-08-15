import React from 'react';
import styles from './Hero.module.css'; // Import the CSS module

import people from '../../../public/assets/people.png';
import ai from '../../../public/assets/ai.png';
import Image from 'next/image';

const Header = () => {
  return (
    <div className={styles.gpt3Header}>
      <div className={styles.gpt3HeaderContent}>
        <h1 className={styles.gradientText}>Lets Build Something With GPT-3 OpenAI</h1>
        <p>Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.</p>

        <div className={styles.gpt3HeaderContentInput}>
          <input className={styles.gpt3HeaderContentInputInput} type="email" placeholder="Your Email Address" />
          <button className={styles.gpt3HeaderContentInputButton} type="submit">Get Started</button>
        </div>

        <div className={styles.gpt3HeaderContentPeople}>
          <Image className={styles.gpt3HeaderContentPeopleImg} src={people} alt="People" />
          <p>500k+ people Already visited us.View Courses</p>
        </div>
      </div>

      <div className={styles.gpt3HeaderImage}>
        <Image src={ai} alt="AI" />
      </div>
    </div>
  );
};

export default Header;
