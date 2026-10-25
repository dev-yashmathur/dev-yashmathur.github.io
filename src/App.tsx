import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

const PorteePage = lazy(() => import('./pages/portee/PorteePage'));
const BenchPage = lazy(() => import('./pages/bench/BenchPage'));
const GardenMazePage = lazy(() => import('./pages/garden-maze/GardenMazePage'));
const ClassicGamesHubPage = lazy(() => import('./pages/classic-games-hub/ClassicGamesHubPage'));
const IncrezioPage = lazy(() => import('./pages/increzio/IncrezioPage'));
const TambolaPage = lazy(() => import('./pages/tambola/TambolaPage'));
const ShortsGonePage = lazy(() => import('./pages/shorts-gone/ShortsGonePage'));
const IncrezioHabitTrackerPrivacyPage = lazy(() => import('./pages/IncrezioHabitTrackerPrivacyPage'));
const GardenMazePrivacyPage = lazy(() => import('./pages/GardenMazePrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portee" element={<PorteePage />} />
        <Route path="/projects/portee" element={<Navigate to="/portee" replace />} />
        <Route path="/bench" element={<BenchPage />} />
        <Route path="/projects/benchtest" element={<Navigate to="/bench" replace />} />
        <Route path="/garden-maze" element={<GardenMazePage />} />
        <Route path="/projects/garden-maze" element={<Navigate to="/garden-maze" replace />} />
        <Route path="/classic-games-hub" element={<ClassicGamesHubPage />} />
        <Route path="/projects/classic-games-hub" element={<Navigate to="/classic-games-hub" replace />} />
        <Route path="/increzio" element={<IncrezioPage />} />
        <Route path="/projects/increzio-habit-tracker" element={<Navigate to="/increzio" replace />} />
        <Route path="/tambola" element={<TambolaPage />} />
        <Route path="/projects/tambola-desktop-app" element={<Navigate to="/tambola" replace />} />
        <Route path="/shorts-gone" element={<ShortsGonePage />} />
        <Route path="/increzio-habit-tracker/privacy" element={<IncrezioHabitTrackerPrivacyPage />} />
        <Route path="/garden-maze/privacy" element={<GardenMazePrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
