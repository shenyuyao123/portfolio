"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.img
        src={src}
        alt="Preview"
        className="max-w-full max-h-[90vh] object-contain rounded-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] as const }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        onClick={onClose}
        aria-label="Close preview"
      >
        ×
      </button>
    </motion.div>
  );
}

export default function PhotoGallery({ items }: { items: MediaItem[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const images = items.filter((i) => i.type === "image");

  if (images.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--text-muted)]">
        <div className="text-5xl mb-4">📷</div>
        <p className="text-lg">No photos yet. Upload some via the admin panel!</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((item, i) => (
          <motion.div
            key={item.url}
            className="break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] as const }}
            onClick={() => setLightboxSrc(item.url)}
          >
            <img
              src={item.url}
              alt={`Photo ${i + 1}`}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>
    </>
  );
}