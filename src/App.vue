<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useDark } from "@vueuse/core";

const isDark = useDark();
const toggleDark = () => (isDark.value = !isDark.value);
</script>

<template>
  <header
    class="leading-normal max-h-screen relative lg:flex lg:items-center lg:px-[calc(theme(spacing.section)/2)]"
  >
    <img
      alt="Vue logo"
      class="block mx-auto mb-8 lg:mx-0 lg:mr-8 lg:mb-0"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="lg:flex lg:items-start lg:flex-wrap">
      <div class="text-center lg:text-left">
        <h1 class="font-medium text-[2.6rem] text-primary">You did it!</h1>
        <h3 class="text-xl">
          You've successfully created a project with
          <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
        </h3>
      </div>

      <nav
        class="w-full text-xs text-center mt-8 lg:text-left lg:-ml-4 lg:text-base lg:py-4 lg:mt-4"
      >
        <RouterLink
          to="/"
          class="inline-block px-4 border-l border-surface-200 dark:border-surface-700 first:border-0"
          >Home</RouterLink
        >
        <RouterLink
          to="/about"
          class="inline-block px-4 border-l border-surface-200 dark:border-surface-700"
          >About</RouterLink
        >
      </nav>
    </div>

    <button
      class="absolute top-0 right-0 bg-transparent border-none cursor-pointer text-xl p-2 text-surface-900 dark:text-surface-0"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggleDark"
    >
      <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" />
    </button>
  </header>

  <RouterView />
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--p-text-color);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
