<script setup lang="ts">
import { RouterView } from "vue-router";
import { useDark } from "@vueuse/core";
import Menubar from "primevue/menubar";

const isDark = useDark();
const toggleDark = () => (isDark.value = !isDark.value);

const menuItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];
</script>

<template>
  <Menubar :model="menuItems">
    <template #start>
      <img alt="Vue logo" src="@/assets/logo.svg" width="40" height="40" class="mr-4" />
    </template>
    <template #end>
      <button
        class="bg-transparent border-none cursor-pointer text-xl p-2 text-surface-900 dark:text-surface-0"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleDark"
      >
        <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" />
      </button>
    </template>
  </Menubar>

  <RouterView />
</template>
