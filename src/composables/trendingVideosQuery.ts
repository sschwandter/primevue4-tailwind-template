import { useQuery } from "@tanstack/vue-query";
import { ofetch } from "ofetch";
import { logger } from "@/utils/logger";

const log = logger.withTag("youtube");
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface YouTubeVideoResponseItem {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeTrendingVideosResponse {
  items: YouTubeVideoResponseItem[];
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

export const hasYouTubeApiKey = Boolean(API_KEY && API_KEY !== "your-api-key-here");

export function useTrendingVideosQuery() {
  return useQuery<Video[]>({
    queryKey: ["youtube", "trending"],
    queryFn: async () => {
      try {
        const data = await ofetch<YouTubeTrendingVideosResponse>(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            query: {
              part: "snippet",
              chart: "mostPopular",
              maxResults: 12,
              key: API_KEY,
            },
          },
        );

        return data.items.map((item) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channelTitle: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        }));
      } catch (queryError) {
        log.error("Failed to fetch YouTube videos", queryError);
        throw queryError;
      }
    },
    enabled: hasYouTubeApiKey,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function warnIfYouTubeApiKeyMissing() {
  if (!hasYouTubeApiKey) {
    log.warn("YouTube API key not configured. Set VITE_YOUTUBE_API_KEY in .env.local");
  }
}
