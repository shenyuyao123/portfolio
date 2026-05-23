"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { uploadMedia, type UploadResult } from "@/app/actions/upload";
import { listMedia, deleteMedia, type MediaItem } from "@/app/actions/manage";

export default function ManagePage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const items = await listMedia();
    setMedia(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleUpload(files: FileList | File[]) {
    setUploading(true);
    setUploadResults([]);
    const formData = new FormData();
    const fileArr = Array.from(files);
    fileArr.forEach((f) => formData.append("files", f));
    const results = await uploadMedia(formData);
    setUploadResults(results);
    setUploading(false);
    refresh();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDelete() {
    if (selected.size === 0) return;
    const urls = Array.from(selected);
    await deleteMedia(urls);
    setSelected(new Set());
    refresh();
  }

  function toggleSelect(url: string) {
    const next = new Set(selected);
    if (next.has(url)) next.delete(url);
    else next.add(url);
    setSelected(next);
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* Upload Zone */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="font-display text-xl font-bold mb-4">Upload Media</h2>

        <div
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer ${
            dragOver
              ? "border-[var(--brand-magenta)] bg-[var(--brand-magenta-light)]/10"
              : "border-gray-200 hover:border-[var(--brand-magenta-light)] hover:bg-[var(--surface-primary)]"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files.length > 0) handleUpload(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />
          <div className="text-4xl mb-3">📁</div>
          <p className="text-[var(--text-secondary)] font-medium">
            Drag & drop images or videos here, or click to browse
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            JPEG, PNG, WebP, GIF (max 20MB) · MP4, WebM (max 200MB)
          </p>
        </div>

        {uploading && (
          <div className="mt-4 flex items-center gap-3 text-[var(--text-secondary)]">
            <div className="w-5 h-5 border-2 border-[var(--brand-magenta)] border-t-transparent rounded-full animate-spin" />
            Uploading...
          </div>
        )}

        {uploadResults.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadResults.map((r, i) => (
              <div
                key={i}
                className={`text-sm px-4 py-2 rounded-lg ${
                  r.success
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {r.success ? `✓ ${r.name} uploaded` : `✗ ${r.name}: ${r.error}`}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Media List */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold">
            Media Library ({media.length})
          </h2>
          {selected.size > 0 && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete Selected ({selected.size})
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-16 text-[var(--text-muted)]">
            <div className="text-5xl mb-4">🎨</div>
            <p className="text-lg">No media yet. Upload your first photo or video above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((item) => (
              <div
                key={item.url}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group border-2 transition-all ${
                  selected.has(item.url)
                    ? "border-[var(--brand-magenta)] ring-2 ring-[var(--brand-magenta-light)]"
                    : "border-transparent hover:border-gray-200"
                }`}
                onClick={() => toggleSelect(item.url)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
                {selected.has(item.url) && (
                  <div className="absolute inset-0 bg-[var(--brand-magenta)]/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--brand-magenta)] text-white flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white font-medium uppercase">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}