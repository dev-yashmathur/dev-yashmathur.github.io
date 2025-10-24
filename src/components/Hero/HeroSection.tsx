import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../../utils/config';
import './HeroSection.css';

const HeroSection = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Cycle through taglines every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % config.taglines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
            <svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              className="hero-svg"
              aria-hidden="true"
              focusable="false"
            >
              <g>
                {/* Simple developer illustration - placeholder */}
                {/* We would replace this with a proper SVG from the assets folder */}
                <circle cx="150" cy="80" r="50" fill="#f3a89f" opacity="0.8" />
                <rect x="100" y="130" width="100" height="120" rx="5" fill="#6c92f0" opacity="0.9" />
                <circle cx="150" cy="80" r="30" fill="#fff9f5" />
                <rect x="130" y="170" width="40" height="60" rx="5" fill="#fff9f5" />
                <path d="M110 230 L190 230 L150 270 Z" fill="#f3a89f" opacity="0.8" />

                {/* Animated code elements */}
                <motion.rect
                  x="120"
                  y="150"
                  width="60"
                  height="5"
                  rx="2"
                  fill="#fff9f5"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.rect
                  x="120"
                  y="160"
                  width="40"
                  height="5"
                  rx="2"
                  fill="#fff9f5"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                />
                <motion.rect
                  x="120"
                  y="170"
                  width="50"
                  height="5"
                  rx="2"
                  fill="#fff9f5"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
                />
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
