import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Screen2 from './components/Screen2';
import MobileTabBar from './components/MobileTabBar';
import { initAnalytics, trackSectionView } from './utils/analytics';

export const AppContent: React.FC = () => {
  // Initialize Analytics and monitor in-page section navigation
  useEffect(() => {
    initAnalytics();

    const handleHashChange = () => {
      const section = window.location.hash || '#main-content';
      trackSectionView(section);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Screen2 />
      <MobileTabBar />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
