<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="text-center lg:text-left">
    <h1 class="font-medium text-[2.6rem] relative -top-2.5 text-primary">{{ msg }}</h1>
    <h3 class="text-xl">
      You've successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>
