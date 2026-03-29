<script setup lang="ts">
import type { TextWithLinksPart } from "@/components/TextWithLinks.vue";

interface TimelineItem {
  icon: string;
  title: string;
  parts: TextWithLinksPart[];
}
const items: TimelineItem[] = [
  {
    icon: "pi pi-book",
    title: "Documentation",
    parts: [
      "Vue's ",
      { text: "official documentation", url: "https://vuejs.org/" },
      " provides you with all information you need to get started.",
    ],
  },
  {
    icon: "pi pi-wrench",
    title: "Tooling",
    parts: [
      "This project is served and bundled with ",
      { text: "Vite", url: "https://vite.dev/guide/features.html" },
      ". The recommended IDE setup is ",
      { text: "VSCode", url: "https://code.visualstudio.com/" },
      " + ",
      { text: "Vue - Official", url: "https://github.com/vuejs/language-tools" },
      ". If you need to test your components and web pages, check out ",
      { text: "Vitest", url: "https://vitest.dev/" },
      " and ",
      { text: "Cypress", url: "https://www.cypress.io/" },
      " / ",
      { text: "Playwright", url: "https://playwright.dev/" },
      ".",
    ],
  },
  {
    icon: "pi pi-box",
    title: "Ecosystem",
    parts: [
      "Get official tools and libraries for your project: ",
      { text: "Pinia", url: "https://pinia.vuejs.org/" },
      ", ",
      { text: "Vue Router", url: "https://router.vuejs.org/" },
      ", ",
      { text: "Vue Test Utils", url: "https://test-utils.vuejs.org/" },
      ", and ",
      { text: "Vue Dev Tools", url: "https://github.com/vuejs/devtools" },
      ". If you need more resources, we suggest paying ",
      { text: "Awesome Vue", url: "https://github.com/vuejs/awesome-vue" },
      " a visit.",
    ],
  },
  {
    icon: "pi pi-users",
    title: "Community",
    parts: [
      "Got stuck? Ask your question on ",
      { text: "Vue Land", url: "https://chat.vuejs.org" },
      " (our official Discord server), or ",
      { text: "StackOverflow", url: "https://stackoverflow.com/questions/tagged/vue.js" },
      ". You should also follow the official ",
      { text: "@vuejs.org", url: "https://bsky.app/profile/vuejs.org" },
      " Bluesky account or the ",
      { text: "@vuejs", url: "https://x.com/vuejs" },
      " X account for latest news in the Vue world.",
    ],
  },
  {
    icon: "pi pi-heart",
    title: "Support Vue",
    parts: [
      "As an independent project, Vue relies on community backing for its sustainability. You can help us by ",
      { text: "becoming a sponsor", url: "https://vuejs.org/sponsor/" },
      ".",
    ],
  },
];
</script>

<template>
  <main class="app-page">
    <Timeline :value="items" layout="vertical" align="left">
      <template #marker="{ item }">
        <span class="timeline-marker-chip">
          <i :class="item.icon" />
        </span>
      </template>
      <template #content="{ item }">
        <div class="mb-4">
          <h3 class="mb-1 text-xl font-semibold text-surface-900 dark:text-surface-0">
            {{ item.title }}
          </h3>
          <p class="page-copy">
            <TextWithLinks :parts="item.parts" />
          </p>
        </div>
      </template>
    </Timeline>
  </main>
</template>
