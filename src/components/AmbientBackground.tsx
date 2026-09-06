import React from 'react';
import { useAmbientThemeObserver } from '../hooks/useAmbientThemeObserver';
import { useAmbientTouch } from '../hooks/useAmbientTouch';

export const AmbientBackground: React.FC = () => {
  const { containerRef, currentTheme, accentColor } = useAmbientThemeObserver();
  useAmbientTouch(containerRef);

  return (
    <div
      ref={containerRef}
      className="ambient-bg"
      aria-hidden="true"
      data-ambient-theme={currentTheme}
      data-accent-color={accentColor}
    >
      {/* Top Cinematic Studio Spotlight Aura */}
      <div className="ambient-spotlight" />

      {/* Interactive Soft Liquid Chrome Touch Glow (Subtle Specular Sheen) */}
      <div className="ambient-touch-glow" />

      {/* Floating Ambient Mesh Orbs with Fluid Floating Animations & Tilt */}
      <div className="ambient-mesh">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
        <div className="ambient-orb ambient-orb-4" />
      </div>

      {/* Cinematic Vignette for Depth Framing */}
      <div className="ambient-vignette" />

      {/* Analog 35mm Micro-Grain Texture */}
      <div className="ambient-grain" />
    </div>
  );
};

