import React from 'react';
import { useAmbientThemeObserver } from '../hooks/useAmbientThemeObserver';

export const AmbientBackground: React.FC = () => {
  const { containerRef, currentTheme, accentColor } = useAmbientThemeObserver();

  return (
    <div
      ref={containerRef}
      className="ambient-bg"
      aria-hidden="true"
      data-ambient-theme={currentTheme}
      data-accent-color={accentColor}
    >
      <div className="ambient-mesh">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>
      <div className="ambient-grain" />
    </div>
  );
};

