/**
 * Google Analytics 4 (gtag.js) Integration
 * 
 * Supports dynamic initialization via VITE_GA_MEASUREMENT_ID,
 * pageview tracking for single-page hash navigation,
 * and key interaction events (Order, Instagram, Telegram, Portfolio preview).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    GA_MEASUREMENT_ID?: string;
  }
}

let isInitialized = false;

export const getMeasurementId = (): string => {
  const envId = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();
  if (envId) return envId;
  if (typeof window !== 'undefined' && window.GA_MEASUREMENT_ID) {
    return window.GA_MEASUREMENT_ID.trim();
  }
  return '';
};

export const initAnalytics = (): void => {
  if (typeof window === 'undefined' || isInitialized) return;

  const measurementId = getMeasurementId();

  // Always ensure dataLayer and gtag are safely declared
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.info(
        '[Analytics] Google Analytics is ready. Set VITE_GA_MEASUREMENT_ID in .env to activate live reporting.'
      );
    }
    return;
  }

  // Prevent duplicate script tags
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    anonymize_ip: true,
  });

  isInitialized = true;
};

export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined') return;

  const measurementId = getMeasurementId();
  if (measurementId && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
): void => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  if (import.meta.env.DEV) {
    console.debug(`[Analytics Event] ${eventName}:`, params);
  }
};

export const trackContactClick = (channel: 'instagram' | 'telegram' | 'order_page' | 'sticky_cta'): void => {
  trackEvent('contact_channel_click', {
    channel,
    page_location: typeof window !== 'undefined' ? window.location.hash || '#home' : '',
  });
};

export const trackWorkPreview = (workId: string, action: 'play' | 'pause' | 'lightbox'): void => {
  trackEvent('portfolio_interaction', {
    work_id: workId,
    action_type: action,
  });
};
