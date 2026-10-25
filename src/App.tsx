import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const IncrezioHabitTrackerPrivacyPage = lazy(() => import('./pages/IncrezioHabitTrackerPrivacyPage'));
const GardenMazePrivacyPage = lazy(() => import('./pages/GardenMazePrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/increzio-habit-tracker/privacy" element={<IncrezioHabitTrackerPrivacyPage />} />
        <Route path="/garden-maze/privacy" element={<GardenMazePrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
