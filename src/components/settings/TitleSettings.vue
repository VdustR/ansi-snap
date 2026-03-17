<script setup lang="ts">
import { useSettings } from "../../composables/useSettings";
import TextInput from "../ui/TextInput.vue";
import SelectInput from "../ui/SelectInput.vue";
import SliderInput from "../ui/SliderInput.vue";

const { settings, updateSetting } = useSettings();

const alignOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Title</h3>
    <TextInput
      label="Title Text"
      :model-value="settings.titleText"
      placeholder="Optional window title"
      @update:model-value="updateSetting('titleText', $event)"
    />
    <SelectInput
      label="Alignment"
      :model-value="settings.titleAlign"
      :options="alignOptions"
      @update:model-value="updateSetting('titleAlign', $event as typeof settings.titleAlign)"
    />
    <TextInput
      label="Font Family"
      :model-value="settings.titleFontFamily"
      @update:model-value="updateSetting('titleFontFamily', $event)"
    />
    <SliderInput
      label="Font Size"
      :model-value="settings.titleFontSize"
      :min="8"
      :max="24"
      :step="1"
      unit="px"
      @update:model-value="updateSetting('titleFontSize', $event)"
    />
  </section>
</template>

<style scoped>
@import "./settings-shared.css";
</style>
