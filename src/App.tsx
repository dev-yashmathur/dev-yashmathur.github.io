import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import IncrezioHabitTrackerPrivacyPage from './pages/IncrezioHabitTrackerPrivacyPage';
import Footer from './components/Footer/Footer';

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/increzio-habit-tracker/privacy" element={<IncrezioHabitTrackerPrivacyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
