"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_VIDEO_SIZE = 200 * 1024 * 1024; // 200MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];

export type UploadResult = {
  success: boolean;
  url?: string;
  type?: "image" | "video";
  name?: string;
  error?: string;
};

export async function uploadMedia(formData: FormData): Promise<UploadResult[]> {
  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return [{ success: false, error: "No files provided" }];
  }

  const results = await Promise.all(
    files.map(async (file): Promise<UploadResult> => {
      const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

      if (!isImage && !isVideo) {
        return {
          success: false,
          name: file.name,
          error: `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM`,
        };
      }

      const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
      if (file.size > maxSize) {
        const limit = isVideo ? "200MB" : "20MB";
        return {
          success: false,
          name: file.name,
          error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: ${limit}`,
        };
      }

      try {
        const folder = isVideo ? "videos" : "images";
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const blob = await put(`${folder}/${Date.now()}-${safeName}`, file, {
          access: "public",
        });

        return {
          success: true,
          url: blob.url,
          type: isVideo ? "video" : "image",
          name: file.name,
        };
      } catch {
        return {
          success: false,
          name: file.name,
          error: "Upload failed. Please try again.",
        };
      }
    })
  );

  revalidatePath("/");
  revalidatePath("/manage");
  return results;
}