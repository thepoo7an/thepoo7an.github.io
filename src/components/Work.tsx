import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { WorkItem } from '../data/works';
import { WorkLightbox } from './WorkLightbox';
import { YouTubeWorkCard } from './YouTubeWorkCard';
import { YouTubeVideoData } from '../data/youtube';
import { TikTokWorkCard } from './TikTokWorkCard';
import { TikTokVideo } from '../data/tiktok';
import { InstagramWorkCard } from './InstagramWorkCard';
import { InstagramReel, INITIAL_INSTAGRAM_DATA } from '../data/instagram';
import { Shuffle, AlertCircle } from 'lucide-react';
import {
  fetchRandomInstagramReelIds,
  fetchShuffledInstagramReels,
  createInstagramReelFromId,
} from '../utils/instagram';

export const Work: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const lastActiveTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxModalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Dynamic Instagram reels state & shuffle mechanism
  const [instagramReel, setInstagramReel] = useState<InstagramReel | null>(() => {
    const list = INITIAL_INSTAGRAM_DATA.reels || [];
    return list.length > 0 ? list[0] : null;
  });
  const [isShufflingReels, setIsShufflingReels] = useState(false);

  // Shuffle mechanism to dynamically fetch & rotate reels from public profile
  const handleShuffleReels = useCallback(async () => {
    setIsShufflingReels(true);
    try {
      // 1. Fetch randomized reel IDs from public Instagram profile
      const randomIds = await fetchRandomInstagramReelIds({
        excludeId: instagramReel?.id,
        count: 6,
      });

      // 2. Retrieve corresponding shuffled reel objects
      const shuffled = await fetchShuffledInstagramReels({
        excludeId: instagramReel?.id,
      });

      if (shuffled.length > 0) {
        setInstagramReel(shuffled[0]);
      } else if (randomIds.length > 0) {
        setInstagramReel(createInstagramReelFromId(randomIds[0]));
      }
    } catch (err) {
      console.warn('Error shuffling Instagram reels:', err);
    } finally {
      setTimeout(() => {
        setIsShufflingReels(false);
      }, 300);
    }
  }, [instagramReel?.id]);

  // On mount, dynamically fetch & shuffle to display a fresh reel from the public profile
  useEffect(() => {
    let isMounted = true;
    fetchShuffledInstagramReels().then((shuffled) => {
      if (isMounted && shuffled.length > 0) {
        setInstagramReel(shuffled[0]);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenYouTubeLightbox = (ytData: YouTubeVideoData, triggerEl: HTMLButtonElement | null) => {
    lastActiveTriggerRef.current = triggerEl;
    setActiveItem({
      id: `youtube-${ytData.videoId}`,
      category: 'reels',
      primarySrc: ytData.maxresThumbnailUrl || ytData.thumbnailUrl,
      fallbacks: [ytData.thumbnailUrl],
      labelFa: ytData.title,
      labelEn: ytData.title,
      specFa: 'یوتیوب شورتز • @thepoo7an',
      specEn: 'YouTube Shorts • @thepoo7an',
      isYouTube: true,
      youtubeId: ytData.videoId,
      youtubeUrl: ytData.url,
      youtubeEmbedUrl: ytData.embedUrl,
    });
  };

  const handleOpenTikTokLightbox = (ttData: TikTokVideo, triggerEl: HTMLButtonElement | null) => {
    lastActiveTriggerRef.current = triggerEl;
    setActiveItem({
      id: `tiktok-${ttData.id}`,
      category: 'reels',
      primarySrc: ttData.thumbnailUrl || '',
      fallbacks: [],
      labelFa: ttData.title || 'ویدیوی تیک‌تاک',
      labelEn: ttData.title || 'TikTok Video',
      specFa: 'تیک‌تاک • @thepoo7an',
      specEn: 'TikTok • @thepoo7an',
      isTikTok: true,
      tiktokId: ttData.id,
      tiktokUrl: ttData.url,
    });
  };

  const handleOpenInstagramLightbox = (igData: InstagramReel, triggerEl: HTMLButtonElement | null) => {
    lastActiveTriggerRef.current = triggerEl;
    setActiveItem({
      id: `instagram-${igData.id}`,
      category: 'reels',
      primarySrc: igData.thumbnailUrl || '',
      fallbacks: igData.fallbackThumbnailUrl ? [igData.fallbackThumbnailUrl] : [],
      labelFa: igData.title || 'ریلز اینستاگرام',
      labelEn: igData.titleEn || igData.title || 'Instagram Reel',
      specFa: 'اینستاگرام • @thepoo7an',
      specEn: 'Instagram • @thepoo7an',
      isInstagram: true,
      instagramId: igData.code,
      instagramUrl: igData.url,
      instagramEmbedUrl: igData.embedUrl,
    });
  };

  const closeModal = useCallback(() => {
    setActiveItem(null);
    // Return focus to the originating card trigger button
    if (lastActiveTriggerRef.current) {
      lastActiveTriggerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!activeItem) return;

    // Focus close button on modal open
    const initialFocusTimer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      // Trap Tab focus inside modal
      if (e.key === 'Tab' && lightboxModalRef.current) {
        const focusable = lightboxModalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(initialFocusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, closeModal]);

  return (
    <section className="work-sec" id="work" aria-label={isEn ? 'Selected output' : 'نمونه خروجی'}>
      <div className="work-header">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="rv">
              {isEn ? 'Selected output' : 'نمونه خروجی'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono">
              {isEn ? 'Live feeds from YouTube Shorts, Instagram & TikTok' : 'پخش مستقیم خروجی از یوتیوب شورتز، اینستاگرام و تیک‌تاک'}
            </p>
          </div>

          {/* Dynamic Instagram Shuffle Reels trigger */}
          <button
            type="button"
            className={`work-cat-btn shuffle-btn ${isShufflingReels ? 'shuffling' : ''}`}
            onClick={handleShuffleReels}
            disabled={isShufflingReels}
            aria-label={isEn ? 'Shuffle Instagram Reels' : 'تغییر تصادفی ریلزهای اینستاگرام'}
            title={isEn ? 'Shuffle Instagram Reels' : 'تغییر تصادفی ریلزهای اینستاگرام'}
          >
            <Shuffle className={`w-3.5 h-3.5 text-rose-400 ${isShufflingReels ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{isEn ? 'Shuffle Reels' : 'تغییر تصادفی ریلز'}</span>
          </button>
        </div>

        {/* VPN Pay Attention Notice */}
        <div
          className="work-vpn-notice rv d1"
          role="note"
          aria-label={isEn ? 'Pay Attention: VPN Required' : 'توجه: نیاز به فیلترشکن برای بارگذاری'}
        >
          <div className="work-vpn-badge">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span className="pulse-dot" aria-hidden="true" />
            <span>{isEn ? 'Pay Attention' : 'توجه / Pay Attention'}</span>
          </div>
          <p className="work-vpn-text">
            {isEn
              ? 'Please turn on your VPN to load and view live portfolio media, images, and embeds smoothly.'
              : 'برای لود شدن و باز شدن کامل عکس‌ها و ویدیوهای نمونه‌کارها، حتماً فیلترشکن (VPN) خود را روشن کنید.'}
          </p>
        </div>
      </div>

      <div className="work-grid">
        {/* Latest YouTube Release */}
        <YouTubeWorkCard
          key="youtube-latest-card"
          isEn={isEn}
          onOpenLightbox={handleOpenYouTubeLightbox}
        />

        {/* Dynamic Instagram Reel Showcase */}
        <InstagramWorkCard
          key={`instagram-${instagramReel?.id || 'showcase'}`}
          isEn={isEn}
          reel={instagramReel}
          isShuffling={isShufflingReels}
          onShuffle={handleShuffleReels}
          onOpenLightbox={handleOpenInstagramLightbox}
        />

        {/* TikTok Channel Showcase */}
        <TikTokWorkCard
          key="tiktok-showcase-card"
          isEn={isEn}
          onOpenLightbox={handleOpenTikTokLightbox}
        />
      </div>

      {/* Lightbox Modal */}
      <WorkLightbox
        activeItem={activeItem}
        isEn={isEn}
        closeBtnRef={closeBtnRef}
        lightboxModalRef={lightboxModalRef}
        onClose={closeModal}
      />
    </section>
  );
};

export default Work;
