<script lang="ts">
/**
 * Renders an array of text and link parts as inline content.
 * Use this instead of v-html when you need to mix plain text with styled hyperlinks.
 *
 * @example
 * <TextWithLinks :parts="['Read the ', { text: 'docs', url: 'https://vuejs.org/' }, '.']" />
 */
export type TextWithLinksPart = string | { text: string; url: string };
</script>

<script setup lang="ts">
defineProps<{
  parts: TextWithLinksPart[];
}>();
</script>

<template>
  <template v-for="(part, i) in parts" :key="i">
    <a
      v-if="typeof part === 'object'"
      :href="part.url"
      target="_blank"
      rel="noopener"
      class="text-primary hover:underline"
      >{{ part.text }}</a
    >
    <template v-else>{{ part }}</template>
  </template>
</template>
