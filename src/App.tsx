import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { config } from './utils/config';

// Import components
import HeroSection from './components/Hero/HeroSection';
import Timeline from './components/Timeline/Timeline';
import ProjectCarousel from './components/Projects/ProjectCarousel';
import ArticleMagazineStand from './components/Articles/ArticleMagazineStand';
import Bookshelf from './components/GoodReads/Bookshelf';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="loader"
        >
          Loading...
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <header>
            <nav>
              <div className="container">
                <div className="nav-logo">{config.name}</div>
                <div className="nav-links">
                  <a href="#hero">Home</a>
                  <a href="#timeline">Experience</a>
                  <a href="#projects">Projects</a>
                  <a href="#articles">Articles</a>
                  <a href="#good-reads">Good Reads</a>
                </div>
              </div>
            </nav>
          </header>

          <main>
            <HeroSection />
            <Timeline />
            <ProjectCarousel />
            <ArticleMagazineStand />
            <Bookshelf />
          </main>

          <footer>
            <div className="container">
              <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
            </div>
          </footer>

          <ScrollToTop />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;