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
      <RouterLink v-slot="{ href, navigate }" custom :to="item.to">
        <a :href="href" @click="navigate">
          {{ item.label }}
        </a>
      </RouterLink>
    </template>
    <template #start>
      <img alt="Vue logo" src="@/assets/logo.svg" width="40" height="40" class="mr-4" />
    </template>
    <template #end>
      <Button
        rounded
        text
        severity="secondary"
        size="small"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
        @click="toggleTheme"
      />
    </template>
  </Menubar>

  <RouterView />
</template>
