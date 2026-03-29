<script setup lang="ts">
import {
  hasYouTubeApiKey,
  useTrendingVideosQuery,
  warnIfYouTubeApiKeyMissing,
} from "@/composables/trendingVideosQuery";

const { data: videos, isLoading, error } = useTrendingVideosQuery();

warnIfYouTubeApiKeyMissing();

const errorMessage = computed(() => {
  if (!hasYouTubeApiKey) return "Set VITE_YOUTUBE_API_KEY in .env.local to use this page.";
  if (error.value) {
    return error.value.message;
  }
  return null;
});
</script>

<template>
  <main class="app-page">
    <h1 class="page-title">Trending on YouTube</h1>

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
        <Card class="surface-card h-full hover:shadow-lg">
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
