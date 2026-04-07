import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a standard YouTube URL (watch, shorts, etc.) into an embeddable URL.
 */
export function getYouTubeEmbedUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  
  // If it's already an embed URL, return it
  if (url.includes("youtube.com/embed/")) return url;

  // regex to extract video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    // return a proper embed URL with parameters that match the Hero's cinematic requirements
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&vq=hd1080`;
  }

  // If it's just the channel or home, it can't be embedded as a video.
  // Use the placeholder video if it doesn't look like a valid video URL
  return undefined;
}
