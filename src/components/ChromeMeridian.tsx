import React, { useEffect, useState } from 'react';

export const ChromeMeridian: React.FC = () => {
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  // Pause animations when document.hidden (Page Visibility API) to save battery/GPU
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className={`chrome-meridian ${!isDocumentVisible ? 'cm-paused' : ''}`}
      aria-hidden="true"
    >
      <div className="cm-stage">
        {/* Faint conical light sweep (chrome highlight) */}
        <div className="cm-sweep-layer" />

        {/* Outer Ring - slow clockwise rotation */}
        <div className="cm-ring cm-ring-outer" />

        {/* Middle Ring with two tiny orbiting beat-like dots - counter-clockwise */}
        <div className="cm-ring cm-ring-middle">
          <span className="cm-dot cm-dot-1" />
          <span className="cm-dot cm-dot-2" />
        </div>

        {/* Inner Ring - clockwise */}
        <div className="cm-ring cm-ring-inner" />

        {/* Soft radial vignette so edges fade into --bg */}
        <div className="cm-vignette" />
      </div>
    </div>
  );
};

export default ChromeMeridian;
