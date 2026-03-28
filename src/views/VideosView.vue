<script setup lang="ts">
import { ref, onMounted } from "vue";
import Card from "primevue/card";
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

const videos = ref<Video[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

async function fetchVideos() {
  if (!API_KEY || API_KEY === "your-api-key-here") {
    error.value = "Set VITE_YOUTUBE_API_KEY in .env.local to use this page.";
    loading.value = false;
    return;
  }

  try {
    const params = new URLSearchParams({
      part: "snippet",
      chart: "mostPopular",
      maxResults: "12",
      key: API_KEY,
    });
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params}`);
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error?.message ?? `HTTP ${res.status}`);
    }
    const data = await res.json();
    videos.value = data.items.map(
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
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to fetch videos";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchVideos);
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-0">
      Trending on YouTube
    </h1>

    <div v-if="loading" class="flex justify-center py-12">
      <ProgressSpinner />
    </div>

    <Message v-else-if="error" severity="error">{{ error }}</Message>

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
