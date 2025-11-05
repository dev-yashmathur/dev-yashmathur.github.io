import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import IncrezioHabitTrackerPrivacyPage from './pages/IncrezioHabitTrackerPrivacyPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/increzio-habit-tracker/privacy" element={<IncrezioHabitTrackerPrivacyPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default App;
