import { useState, useEffect, useMemo } from "react";
import { Film } from "lucide-react";
import type { WorkItem } from "../data/works";

export const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export interface WorkThumbnailProps {
  item: WorkItem;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function WorkThumbnail({
  item,
  alt,
  priority = false,
  className = "",
}: WorkThumbnailProps) {
  const candidates = useMemo(
    () => [item.primarySrc, ...(item.fallbacks || [])].filter(Boolean),
    [item.primarySrc, item.fallbacks]
  );
  const [idx, setIdx] = useState(0);
  const [exhausted, setExhausted] = useState(false);

  useEffect(() => {
    setIdx(0);
    setExhausted(false);
  }, [item.id]);

  if (exhausted || !candidates[idx]) {
    return (
      <div className="size-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-center p-6 text-center gap-3">
        <Film className="size-8 text-zinc-400" aria-hidden="true" />
        <span className="text-xs font-medium text-zinc-300 line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={candidates[idx]}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width="600"
      height="750"
      onError={() => {
        if (idx + 1 < candidates.length) {
          setIdx((prev) => prev + 1);
        } else {
          setExhausted(true);
        }
      }}
      className={className}
    />
  );
}
