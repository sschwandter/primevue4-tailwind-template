<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";

const { isDark, toggleTheme } = useTheme();

const menuItems = [
  { label: "Home", to: "/" },
  { label: "Videos", to: "/videos" },
  { label: "About", to: "/about" },
];
</script>

<template>
  <Menubar :model="menuItems">
    <template #item="{ item }">
      <RouterLink
        :to="item.to"
        class="px-3 py-2 text-surface-700 dark:text-surface-0 no-underline hover:text-primary"
      >
        {{ item.label }}
      </RouterLink>
    </template>
    <template #start>
      <img alt="Vue logo" src="@/assets/logo.svg" width="40" height="40" class="mr-4" />
    </template>
    <template #end>
      <button
        class="bg-transparent border-none cursor-pointer text-xl p-2 text-surface-900 dark:text-surface-0"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" />
      </button>
    </template>
  </Menubar>

  <RouterView />
</template>
