import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './IncrezioHabitTrackerPrivacyPage.css';

const IncrezioHabitTrackerPrivacyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const lastUpdated = 'January 27, 2025';

  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <div className="container privacy-header__content">
          <Link to="/projects/increzio-habit-tracker" className="privacy-back-link">
            ← Back to Increzio project
          </Link>
          <span className="privacy-app-label">Increzio Habit Tracker</span>
        </div>
      </header>

      <main className="privacy-main" id="main-content">
        <section className="privacy-hero">
          <div className="container privacy-hero__content">
            <h1>Privacy Policy</h1>
            <p className="privacy-last-updated">Last updated: {lastUpdated}</p>
            <p className="privacy-intro">
              Increzio Habit Tracker is designed with privacy at its core. The app keeps your progress,
              habits, and daily reflections on your device so you can focus on building consistent habits
              without worrying about where your data is going.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="container privacy-card">
            <h2>Data Collection & Storage</h2>
            <p>
              We strongly believe your habit data belongs to you. That&apos;s why Increzio Habit Tracker:
            </p>
            <ul className="privacy-list">
              <li>Does not collect, store, or transmit any personal data to our servers.</li>
              <li>Keeps all habit entries, streaks, and preferences locally on your device.</li>
              <li>Operates without requiring an account or sign-in.</li>
            </ul>
            <p>
              In short, we do not store or save any user data on our end. Your habit history never leaves
              your device.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="container privacy-card">
            <h2>Third-Party Services</h2>
            <p>
              The app does not integrate analytics, advertising networks, or any third-party tracking tools.
              No external services receive or process your usage data.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="container privacy-card">
            <h2>Your Control</h2>
            <p>
              You have full control over your habit data. If you uninstall the app, all locally stored information
              is removed along with it. Future versions may offer optional backups, but they will always be opt-in
              and clearly communicated before any data ever leaves your device.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="container privacy-card">
            <h2>Questions</h2>
            <p>
              If you have any questions about this privacy policy or suggestions for how we can make privacy even
              stronger, please reach out through the contact links on the main portfolio site.
            </p>
          </div>
        </section>
      </main>

      <footer className="privacy-footer">
        <div className="container privacy-footer__content">
          <p>Made with care to protect your progress.</p>
          <Link to="/" className="privacy-footer__link">
            Visit the portfolio →
          </Link>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default IncrezioHabitTrackerPrivacyPage;
