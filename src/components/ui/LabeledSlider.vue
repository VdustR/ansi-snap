<script setup lang="ts">
import Slider from "primevue/slider";

const props = defineProps<{
  modelValue: number;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();
</script>

<template>
  <label class="labeled-slider">
    <div class="labeled-slider-header">
      <span class="field-label">{{ props.label }}</span>
      <span class="labeled-slider-value">{{ props.modelValue }}{{ props.unit ?? "" }}</span>
    </div>
    <Slider
      :model-value="props.modelValue"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      @update:model-value="emit('update:modelValue', $event as number)"
    />
  </label>
</template>

<style scoped>
@import "../settings/settings-shared.css";

.labeled-slider {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.labeled-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.labeled-slider-value {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-family: monospace;
}
</style>
