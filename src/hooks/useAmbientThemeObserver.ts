import { useEffect, useRef, useState, useCallback } from 'react';

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

/**
 * Parses hex, rgb, or rgba color strings into numeric R, G, B components.
 */
function parseColorToRgb(colorStr: string): RgbColor | null {
  const trimmed = colorStr.trim().toLowerCase();
  if (!trimmed) return null;

  // Hex: #ffffff or #fff
  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    }
    if (hex.length >= 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
  }

  // rgb(...) or rgba(...)
  const rgbMatch = trimmed.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (rgbMatch) {
    return {
      r: Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10))),
      g: Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10))),
      b: Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10))),
    };
  }

  return null;
}

export interface OrbGradients {
  spotlight: string;
  orb1: string;
  orb2: string;
  orb3: string;
  orb4: string;
}

export interface UseAmbientThemeObserverResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  currentTheme: string;
  accentColor: string;
  orbGradients: OrbGradients;
}

/**
 * Observes the 'data-theme' attribute (and computed accent styles) on document.documentElement.
 * Dynamically derives and injects harmonized ambient gradient color stops
 * to keep the kinetic mesh orbs synchronized with current and future theme accent changes.
 */
export function useAmbientThemeObserver(): UseAmbientThemeObserverResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }
    return 'dark';
  });
  const [accentColor, setAccentColor] = useState<string>('#2997ff');
  const [orbGradients, setOrbGradients] = useState<OrbGradients>({
    spotlight: '',
    orb1: '',
    orb2: '',
    orb3: '',
    orb4: '',
  });

  const syncThemeAndColors = useCallback(() => {
    if (typeof document === 'undefined') return;

    const rootEl = document.documentElement;
    const theme = rootEl.getAttribute('data-theme') || 'dark';
    const computedStyles = window.getComputedStyle(rootEl);

    // Read active accent color with cascading fallbacks for future custom themes
    const rawAccent =
      computedStyles.getPropertyValue('--accent').trim() ||
      computedStyles.getPropertyValue('--link').trim() ||
      computedStyles.getPropertyValue('--btn').trim() ||
      (theme === 'light' ? '#0066cc' : '#2997ff');

    const parsedAccent = parseColorToRgb(rawAccent) || {
      r: theme === 'light' ? 0 : 41,
      g: theme === 'light' ? 102 : 151,
      b: theme === 'light' ? 204 : 255,
    };
    const { r, g, b } = parsedAccent;

    const isLight = theme === 'light';

    // Pure Metallic, Liquid Silver & Platinum Chrome Palette (مشکی نقره‌ای متالیک)
    // Top Studio Spotlight Aura: focused behind the hero headline and brand navigation
    const spotlight = isLight
      ? 'radial-gradient(ellipse 85% 60% at 50% 0%, rgba(190, 205, 225, 0.38) 0%, rgba(220, 230, 242, 0.18) 45%, transparent 78%)'
      : 'radial-gradient(ellipse 85% 65% at 50% -5%, rgba(255, 255, 255, 0.20) 0%, rgba(210, 220, 235, 0.10) 32%, rgba(140, 150, 175, 0.03) 58%, transparent 80%)';

    // Orb 1: Specular metallic chrome / platinum sheen (Upper Hero)
    const orb1 = isLight
      ? 'radial-gradient(circle, rgba(180, 195, 215, 0.38) 0%, rgba(215, 225, 238, 0.18) 42%, transparent 72%)'
      : 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(215, 225, 240, 0.12) 36%, rgba(130, 140, 160, 0.03) 58%, transparent 72%)';

    // Orb 2: Liquid metallic silver sheen (Middle Center)
    const orb2 = isLight
      ? 'radial-gradient(circle, rgba(165, 180, 205, 0.32) 0%, rgba(210, 220, 235, 0.14) 45%, transparent 72%)'
      : 'radial-gradient(circle, rgba(230, 238, 252, 0.22) 0%, rgba(185, 195, 212, 0.09) 40%, rgba(100, 110, 130, 0.02) 62%, transparent 75%)';

    // Orb 3: Gunmetal titanium / cold metallic resonance (Lower Left)
    const orb3 = isLight
      ? 'radial-gradient(circle, rgba(175, 190, 210, 0.30) 0%, rgba(215, 225, 240, 0.12) 48%, transparent 75%)'
      : 'radial-gradient(circle, rgba(200, 210, 228, 0.18) 0%, rgba(150, 160, 180, 0.07) 42%, rgba(80, 90, 105, 0.02) 65%, transparent 75%)';

    // Orb 4: Subtle ambient floating mercury pool (Center Right)
    const orb4 = isLight
      ? 'radial-gradient(circle, rgba(170, 185, 210, 0.28) 0%, rgba(210, 225, 240, 0.12) 44%, transparent 72%)'
      : 'radial-gradient(circle, rgba(240, 245, 255, 0.18) 0%, rgba(180, 190, 210, 0.08) 38%, rgba(90, 100, 120, 0.02) 60%, transparent 72%)';

    const nextGradients: OrbGradients = { spotlight, orb1, orb2, orb3, orb4 };

    setCurrentTheme(theme);
    setAccentColor(rawAccent);
    setOrbGradients(nextGradients);

    // Apply directly to the background container element if mounted
    const target = containerRef.current || rootEl;
    if (target) {
      target.style.setProperty('--ambient-spotlight', spotlight);
      target.style.setProperty('--ambient-orb-1', orb1);
      target.style.setProperty('--ambient-orb-2', orb2);
      target.style.setProperty('--ambient-orb-3', orb3);
      target.style.setProperty('--ambient-orb-4', orb4);
      target.style.setProperty('--ambient-accent-rgb', `${r}, ${g}, ${b}`);
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Initial sync
    syncThemeAndColors();

    const rootEl = document.documentElement;

    // Observe data-theme and style changes on the html root element
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'data-theme' || mutation.attributeName === 'style')
        ) {
          shouldUpdate = true;
          break;
        }
      }
      if (shouldUpdate) {
        syncThemeAndColors();
      }
    });

    observer.observe(rootEl, {
      attributes: true,
      attributeFilter: ['data-theme', 'style'],
    });

    // Also listen for system color-scheme shifts if applicable
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => syncThemeAndColors();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    return () => {
      observer.disconnect();
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, [syncThemeAndColors]);

  return {
    containerRef,
    currentTheme,
    accentColor,
    orbGradients,
  };
}
