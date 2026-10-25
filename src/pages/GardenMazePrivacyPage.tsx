import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteShell from '../components/SiteShell/SiteShell';
import { usePageMeta } from '../utils/usePageMeta';
import './IncrezioHabitTrackerPrivacyPage.css';

const GardenMazePrivacyPage: React.FC = () => {
  usePageMeta('The Garden Maze privacy policy', 'The Garden Maze privacy policy.');
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const lastUpdated = 'October 22, 2026';

  return (
    <SiteShell>
    <div className="privacy-page">
      <header className="privacy-header">
        <div className="privacy-header__content">
          <Link to="/projects/garden-maze" className="privacy-back-link">
            ← Back to The Garden Maze project
          </Link>
          <span className="privacy-app-label">The Garden Maze</span>
        </div>
      </header>

      <main className="privacy-main" id="main-content">
        <section className="privacy-hero">
          <div className="privacy-hero__content">
            <h1>Privacy Policy</h1>
            <p className="privacy-last-updated">Last updated: {lastUpdated}</p>
            <p className="privacy-intro">
              The Garden Maze (the first-person maze game, also known as FirstPersonMaze) does not collect
              any data about you. There are no accounts, no tracking and no ads. You walk the mazes, and
              what happens in them stays on your device.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-card">
            <h2>Data We Collect</h2>
            <p>None. Specifically, The Garden Maze:</p>
            <ul className="privacy-list">
              <li>Does not collect, store or transmit any personal information to us or to anyone else.</li>
              <li>Does not require an account, sign-in or email address.</li>
              <li>Does not use your camera, microphone, location, contacts or photos.</li>
              <li>Does not send gameplay data, device identifiers or usage statistics off your device.</li>
              <li>Plays fully offline.</li>
            </ul>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-card">
            <h2>What Stays on Your Device</h2>
            <p>
              To remember your progress between sessions, the game saves a small amount of information locally
              on your device: the coins you have collected, the themes you have unlocked, your hints, and your
              best coin counts on each level. This information is never sent anywhere. Uninstalling the game
              removes it.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-card">
            <h2>Third-Party Services</h2>
            <p>
              The game does not include analytics, crash reporting, advertising networks, social sign-in or any
              other third-party tracking tools, and it does not offer real-money purchases. Coins are earned in
              play and spent in the in-game shop only.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-card">
            <h2>Children</h2>
            <p>
              Because the game collects no data from anyone, it does not knowingly collect personal information
              from children either.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-card">
            <h2>Changes to This Policy</h2>
            <p>
              If a future version adds anything that changes this, such as online features, this policy will be
              updated and the change clearly described before that version is released.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-card">
            <h2>Questions</h2>
            <p>
              If you have any questions about this privacy policy, please reach out through the contact links
              on the main portfolio site.
            </p>
          </div>
        </section>
      </main>


    </div>
    </SiteShell>
  );
};

export default GardenMazePrivacyPage;
