import React, { useState, useEffect, useRef } from 'react';
import { Play, ExternalLink, Radio } from 'lucide-react';
import { YouTubeVideoData, INITIAL_YOUTUBE_DATA, fetchLiveYouTubeRelease } from '../data/youtube';
import { trackWorkPreview } from '../utils/analytics';

interface YouTubeWorkCardProps {
  key?: React.Key;
  isEn: boolean;
  onOpenLightbox: (ytData: YouTubeVideoData, triggerEl: HTMLButtonElement | null) => void;
}

export const YouTubeWorkCard: React.FC<YouTubeWorkCardProps> = ({ isEn, onOpenLightbox }) => {
  const [video, setVideo] = useState<YouTubeVideoData>(INITIAL_YOUTUBE_DATA);
  const [thumbSrc, setThumbSrc] = useState(
    INITIAL_YOUTUBE_DATA.maxresThumbnailUrl || INITIAL_YOUTUBE_DATA.thumbnailUrl
  );
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Background live revalidation (Method 3 client freshness)
  useEffect(() => {
    let isMounted = true;
    fetchLiveYouTubeRelease().then((liveData) => {
      if (isMounted && liveData && liveData.videoId !== video.videoId) {
        setVideo(liveData);
        setThumbSrc(liveData.maxresThumbnailUrl || liveData.thumbnailUrl);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [video.videoId]);

  const handleOpen = () => {
    trackWorkPreview(`youtube-${video.videoId}`, 'lightbox');
    onOpenLightbox(video, triggerRef.current);
  };

  const handleThumbError = () => {
    // Fallback to standard quality thumbnail if maxres is unavailable
    if (thumbSrc !== video.thumbnailUrl) {
      setThumbSrc(video.thumbnailUrl);
    }
  };

  return (
    <article
      className="work-card rv in work-card-youtube"
      aria-label={isEn ? `YouTube Short: ${video.title}` : `شورت یوتیوب: ${video.title}`}
    >
      <div className="work-media-container" style={{ aspectRatio: '9/16' }}>
        {/* Cover Thumbnail */}
        <img
          src={thumbSrc}
          alt={video.title}
          className="work-card-thumb"
          loading="lazy"
          decoding="async"
          onError={handleThumbError}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Ambient Dark Gradient Layer */}
        <div className="work-card-overlay" aria-hidden="true" />

        {/* YouTube Live / Release Badge */}
        <div className="yt-card-badge">
          <span className="yt-live-dot" aria-hidden="true" />
          <svg className="yt-icon-svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="yt-badge-text">
            {isEn ? 'LATEST ON YOUTUBE' : 'جدیدترین ویدیو در یوتیوب'}
          </span>
        </div>

        {/* Play Action Trigger */}
        <div className="work-card-actions">
          <button
            ref={triggerRef}
            type="button"
            className="work-card-play-btn"
            onClick={handleOpen}
            aria-label={isEn ? `Play YouTube Short: ${video.title}` : `پخش شورت یوتیوب: ${video.title}`}
          >
            <Play className="w-5 h-5 fill-current" aria-hidden="true" />
          </button>
        </div>

        {/* Bottom Card Info */}
        <div className="work-card-meta">
          <span className="work-card-spec">
            <Radio className="w-3 h-3 text-red-500 shrink-0 inline-block" aria-hidden="true" />
            <span>{isEn ? 'YouTube Shorts • @thepoo7an' : 'یوتیوب شورتز • @thepoo7an'}</span>
          </span>
          <h3 className="work-card-title">{video.title}</h3>

          <div className="yt-card-links">
            <button
              type="button"
              className="yt-preview-btn"
              onClick={handleOpen}
            >
              {isEn ? 'Preview' : 'پیش‌نمایش'}
            </button>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-watch-btn"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <span>{isEn ? 'Open in YouTube' : 'مشاهده در یوتیوب'}</span>
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default YouTubeWorkCard;
