"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

export default function VideoGallery({ items }: { items: MediaItem[] }) {
  const videos = items.filter((i) => i.type === "video");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const vid = videoRefs.current[idx];
    if (vid) {
      vid.muted = true;
      vid.play().catch(() => {});
    }
  };

  const handleMouseLeave = (idx: number) => {
    setHoveredIdx(null);
    const vid = videoRefs.current[idx];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--text-muted)]">
        <div className="text-5xl mb-4">🎬</div>
        <p className="text-lg">No videos yet. Upload some via the admin panel!</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {videos.map((item, i) => (
        <motion.div
          key={item.url}
          className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg group bg-black"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el; }}
            src={item.url}
            className="w-full aspect-video object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              hoveredIdx === i ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-[var(--brand-magenta)] ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}