<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { ofetch } from "ofetch";
import { logger } from "@/utils/logger";

const log = logger.withTag("youtube");

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const hasKey = API_KEY && API_KEY !== "your-api-key-here";

const {
  data: videos,
  isLoading,
  error,
} = useQuery<Video[]>({
  queryKey: ["youtube", "trending"],
  queryFn: async () => {
    const data = await ofetch("https://www.googleapis.com/youtube/v3/videos", {
      query: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 12,
        key: API_KEY,
      },
    });
    return data.items.map(
      (item: {
        id: string;
        snippet: {
          title: string;
          thumbnails: { medium: { url: string } };
          channelTitle: string;
          publishedAt: string;
        };
      }) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
      }),
    );
  },
  enabled: hasKey,
  staleTime: 5 * 60 * 1000,
  retry: 1,
});

if (!hasKey) {
  log.warn("YouTube API key not configured. Set VITE_YOUTUBE_API_KEY in .env.local");
}

const errorMessage = computed(() => {
  if (!hasKey) return "Set VITE_YOUTUBE_API_KEY in .env.local to use this page.";
  if (error.value) {
    log.error("Failed to fetch YouTube videos", error.value);
    return error.value.message;
  }
  return null;
});
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-0">
      Trending on YouTube
    </h1>

    <div v-if="isLoading" class="flex justify-center py-12">
      <ProgressSpinner />
    </div>

    <Message v-else-if="errorMessage" severity="error">{{ errorMessage }}</Message>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <a
        v-for="video in videos"
        :key="video.id"
        :href="`https://www.youtube.com/watch?v=${video.id}`"
        target="_blank"
        rel="noopener"
        class="no-underline"
      >
        <Card class="h-full hover:shadow-lg transition-shadow">
          <template #header>
            <img :src="video.thumbnail" :alt="video.title" class="w-full rounded-t-lg" />
          </template>
          <template #title>{{ video.title }}</template>
          <template #subtitle>{{ video.channelTitle }} &middot; {{ video.publishedAt }}</template>
        </Card>
      </a>
    </div>
  </main>
</template>
