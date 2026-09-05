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
  orb1: string;
  orb2: string;
  orb3: string;
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
    orb1: '',
    orb2: '',
    orb3: '',
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

    const isLight = theme === 'light';

    // Orb 1: Specular metallic chrome / silver sheen
    const orb1 = isLight
      ? 'radial-gradient(circle, rgba(0, 0, 0, 0.035) 0%, rgba(120, 125, 140, 0.012) 45%, transparent 70%)'
      : 'radial-gradient(circle, rgba(245, 245, 247, 0.075) 0%, rgba(180, 185, 195, 0.025) 45%, transparent 70%)';

    // Orb 2: Graphite / metallic smoke
    const orb2 = isLight
      ? 'radial-gradient(circle, rgba(185, 195, 210, 0.45) 0%, rgba(220, 225, 235, 0.15) 50%, transparent 72%)'
      : 'radial-gradient(circle, rgba(160, 165, 180, 0.058) 0%, rgba(110, 115, 125, 0.02) 48%, transparent 72%)';

    // Orb 3: Dynamic chromatic resonance orb adapting to current or future theme accents
    const { r, g, b } = parsedAccent;
    const orb3 = isLight
      ? `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.042) 0%, rgba(${r}, ${g}, ${b}, 0.012) 45%, transparent 70%)`
      : `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.062) 0%, rgba(${Math.round(r * 0.5)}, ${Math.round(g * 0.5)}, ${Math.round(b * 0.7)}, 0.018) 45%, transparent 70%)`;

    const nextGradients: OrbGradients = { orb1, orb2, orb3 };

    setCurrentTheme(theme);
    setAccentColor(rawAccent);
    setOrbGradients(nextGradients);

    // Apply directly to the background container element if mounted
    const target = containerRef.current || rootEl;
    if (target) {
      target.style.setProperty('--ambient-orb-1', orb1);
      target.style.setProperty('--ambient-orb-2', orb2);
      target.style.setProperty('--ambient-orb-3', orb3);
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
