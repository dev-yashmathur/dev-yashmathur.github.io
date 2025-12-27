import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../../utils/config';
import Robot from '../../assets/images/Robot.png'
import './HeroSection.css';

const HeroSection = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Cycle through taglines every 4 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTaglineIndex((prevIndex) => (prevIndex + 1) % config.taglines.length);
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={fadeInUp} className="hero-name" id="hero-title">
              <span>{config.name}</span>
            </motion.h1>

            <motion.div
              key={taglineIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-tagline"
              role="status"
              aria-live="polite"
            >
              <p>{config.taglines[taglineIndex]}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="hero-cta">
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
                aria-label={`Connect with ${config.name} on LinkedIn`}
              >
                Let's get in touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-graphic"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            aria-hidden="true"
          >
            <img src={Robot} alt="Robot illustration" className="hero-robot-image" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
