<script setup lang="ts">
import Timeline from 'primevue/timeline'

const items = [
  {
    icon: 'pi pi-book',
    title: 'Documentation',
    content: `Vue's <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a> provides you with all information you need to get started.`,
  },
  {
    icon: 'pi pi-wrench',
    title: 'Tooling',
    content: `This project is served and bundled with <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The recommended IDE setup is <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> + <a href="https://github.com/vuejs/language-tools" target="_blank" rel="noopener">Vue - Official</a>. If you need to test your components and web pages, check out <a href="https://vitest.dev/" target="_blank" rel="noopener">Vitest</a> and <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> / <a href="https://playwright.dev/" target="_blank" rel="noopener">Playwright</a>.`,
  },
  {
    icon: 'pi pi-box',
    title: 'Ecosystem',
    content: `Get official tools and libraries for your project: <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>, <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>, <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If you need more resources, we suggest paying <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a> a visit.`,
  },
  {
    icon: 'pi pi-users',
    title: 'Community',
    content: `Got stuck? Ask your question on <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a> (our official Discord server), or <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener">StackOverflow</a>. You should also follow the official <a href="https://bsky.app/profile/vuejs.org" target="_blank" rel="noopener">@vuejs.org</a> Bluesky account or the <a href="https://x.com/vuejs" target="_blank" rel="noopener">@vuejs</a> X account for latest news in the Vue world.`,
  },
  {
    icon: 'pi pi-heart',
    title: 'Support Vue',
    content: `As an independent project, Vue relies on community backing for its sustainability. You can help us by <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.`,
  },
]
</script>

<template>
  <main class="p-6">
    <Timeline :value="items" layout="vertical" align="left">
      <template #marker="{ item }">
        <span class="flex items-center justify-center size-10 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-950">
          <i :class="item.icon" class="text-surface-700 dark:text-surface-200" />
        </span>
      </template>
      <template #content="{ item }">
        <div class="mb-4">
          <h3 class="text-xl font-medium mb-1 text-surface-900 dark:text-surface-0">{{ item.title }}</h3>
          <p class="text-surface-700 dark:text-surface-200" v-html="item.content" />
        </div>
      </template>
    </Timeline>
  </main>
</template>
