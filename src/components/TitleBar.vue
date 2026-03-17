<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div v-if="props.text" class="title-bar" data-ansi-snap="title">
    {{ props.text }}
  </div>
</template>

<style scoped>
.title-bar {
  position: absolute;
  inset: 0;
  line-height: 36px;
  color: var(--title-color);
  opacity: var(--title-opacity);
  font-family: var(--title-font);
  font-size: var(--title-size);
  font-weight: var(--title-weight);
  text-align: var(--title-align);
  padding: var(--title-padding);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  pointer-events: none;
}
</style>
