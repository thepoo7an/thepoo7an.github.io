import { useEffect } from 'react';

export function useAmbientTouch(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    // Prefers reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animFrameId: number | null = null;
    let isLoopRunning = false;

    // Touch positions (pixels relative to viewport)
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;

    // Tilt for 3D parallax (-1 to 1)
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    // Soft intensity / opacity: subtle ambient sheen, never harsh or opaque
    let targetOpacity = 0;
    let currentOpacity = 0;

    let isTouchActive = false;

    const tick = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const dTiltX = targetTiltX - currentTiltX;
      const dTiltY = targetTiltY - currentTiltY;
      const dOpacity = targetOpacity - currentOpacity;

      // Smooth fluid interpolation (gentle floating reaction)
      currentX += dx * 0.12;
      currentY += dy * 0.12;
      currentTiltX += dTiltX * 0.06;
      currentTiltY += dTiltY * 0.06;
      currentOpacity += dOpacity * 0.10;

      const targetEl = containerRef.current;
      if (targetEl) {
        targetEl.style.setProperty('--touch-x', `${currentX.toFixed(1)}px`);
        targetEl.style.setProperty('--touch-y', `${currentY.toFixed(1)}px`);
        targetEl.style.setProperty('--touch-opacity', currentOpacity.toFixed(3));
        if (!prefersReducedMotion) {
          targetEl.style.setProperty('--tilt-x', currentTiltX.toFixed(4));
          targetEl.style.setProperty('--tilt-y', currentTiltY.toFixed(4));
        }
      }

      // Check if settled to stop running the RAF loop and conserve 100% CPU when idle
      const isSettled =
        Math.abs(dx) < 0.25 &&
        Math.abs(dy) < 0.25 &&
        Math.abs(dTiltX) < 0.001 &&
        Math.abs(dTiltY) < 0.001 &&
        Math.abs(dOpacity) < 0.003;

      if (isSettled && targetOpacity === 0 && !isTouchActive) {
        isLoopRunning = false;
        animFrameId = null;
        return;
      }

      animFrameId = requestAnimationFrame(tick);
    };

    const startLoopIfNeeded = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animFrameId = requestAnimationFrame(tick);
      }
    };

    const updateInteraction = (clientX: number, clientY: number, isActive: boolean) => {
      isTouchActive = isActive;

      targetX = clientX;
      targetY = clientY;

      // On first contact, avoid jumping across the screen
      if (currentX === -500 || currentY === -500) {
        currentX = clientX;
        currentY = clientY;
      }

      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      targetTiltX = ((clientX / w) - 0.5) * 2;
      targetTiltY = ((clientY / h) - 0.5) * 2;

      // Subtle, soft specular sheen: 0.35 when touching, 0.15 on desktop hover
      targetOpacity = isActive ? 0.35 : 0.15;

      startLoopIfNeeded();
    };

    const endInteraction = () => {
      isTouchActive = false;
      targetOpacity = 0;
      targetTiltX = 0;
      targetTiltY = 0;
      startLoopIfNeeded();
    };

    // Touch Event Handlers (mobile primary)
    let lastTouchTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      lastTouchTime = Date.now();
      const touch = e.touches[0];
      updateInteraction(touch.clientX, touch.clientY, true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      lastTouchTime = Date.now();
      const touch = e.touches[0];
      updateInteraction(touch.clientX, touch.clientY, true);
    };

    const handleTouchEnd = () => {
      lastTouchTime = Date.now();
      endInteraction();
    };

    // Pointer Event Handlers (desktop & stylus)
    const handlePointerDown = (e: PointerEvent) => {
      if (Date.now() - lastTouchTime < 100) return;
      updateInteraction(e.clientX, e.clientY, true);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (Date.now() - lastTouchTime < 100) return;
      const isActive = e.buttons > 0 || e.pointerType === 'touch';
      updateInteraction(e.clientX, e.clientY, isActive);
    };

    const handlePointerUp = () => {
      if (Date.now() - lastTouchTime < 100) return;
      endInteraction();
    };

    const handlePointerLeave = () => {
      endInteraction();
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);

      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [containerRef]);
}
