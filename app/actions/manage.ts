"use server";

import { list, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export type MediaItem = {
  url: string;
  type: "image" | "video";
  pathname: string;
  uploadedAt: Date;
};

export async function listMedia(): Promise<MediaItem[]> {
  try {
    const { blobs } = await list();
    return blobs
      .filter((b) => b.pathname.startsWith("images/") || b.pathname.startsWith("videos/"))
      .map((b) => ({
        url: b.url,
        type: (b.pathname.startsWith("videos/") ? "video" : "image") as "image" | "video",
        pathname: b.pathname,
        uploadedAt: b.uploadedAt,
      }))
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  } catch {
    return [];
  }
}

export async function deleteMedia(urls: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    await del(urls);
    revalidatePath("/");
    revalidatePath("/manage");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete media." };
  }
}