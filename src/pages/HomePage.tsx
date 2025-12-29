import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from '../components/Hero/HeroSection';
import Timeline from '../components/Timeline/Timeline';
import ProjectCarousel from '../components/Projects/ProjectCarousel';
import ArticleMagazineStand from '../components/Articles/ArticleMagazineStand';
// import Bookshelf from '../components/GoodReads/Bookshelf';
import { NewBookshelf } from '../components/Bookshelf/bookshelf';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import YMLogoBlack from '../assets/images/YMLogoBlack.png'
import '../App.css';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#timeline', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#articles', label: 'Articles' },
  { href: '#good-reads', label: 'Good Reads' },
];

const HomePage: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (desktop) {
        setIsNavOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavToggle = () => setIsNavOpen(prev => !prev);
  const handleLinkClick = () => setIsNavOpen(false);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  return (
    <AnimatePresence>

      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <header className="site-header">
          <nav className="primary-nav" aria-label="Primary navigation">
            <div className="container nav-container">
              <div className="nav-logo" aria-label="Site home">
                <img className="nav-logo-img" src={YMLogoBlack} aria-label='Yash Mathur Logo as YM' alt='YM Logo formed from pixelated datapoints' />
              </div>
              {/* <span>[In development]</span> */}
              <button
                className="nav-toggle"
                type="button"
                onClick={handleNavToggle}
                aria-expanded={isNavOpen}
                aria-controls="primary-navigation"
              >
                <span className="nav-toggle-bar" aria-hidden="true" />
                <span className="nav-toggle-bar" aria-hidden="true" />
                <span className="nav-toggle-bar" aria-hidden="true" />
                <span className="sr-only">Toggle navigation</span>
              </button>
              <ul
                id="primary-navigation"
                className={`nav-links ${isNavOpen ? 'open' : ''}`}
                aria-hidden={!isDesktop && !isNavOpen}
              >
                {navLinks.map((item) => (
                  <li key={item.href} className="nav-item">
                    <a
                      href={item.href}
                      onClick={handleLinkClick}
                      tabIndex={isDesktop || isNavOpen ? 0 : -1}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </header>

        <main id="main-content" role="main">
          <HeroSection />
          <Timeline />
          <ProjectCarousel />
          <ArticleMagazineStand />
          {/* <Bookshelf /> */}
          {/* <NewBookshelf /> */}
        </main>

        <ScrollToTop />
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
