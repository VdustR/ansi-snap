<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label: string;
  options: { value: string; label: string }[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <label class="select-input">
    <span class="select-label">{{ props.label }}</span>
    <select :value="props.modelValue" class="select" @change="onChange">
      <option v-for="opt in props.options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.select-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.select-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.select {
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: #e0e0e0;
  outline: none;
  cursor: pointer;
}

.select:focus {
  border-color: rgba(255, 255, 255, 0.4);
}
</style>
