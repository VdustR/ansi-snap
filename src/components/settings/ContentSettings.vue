<script setup lang="ts">
import { useSettings } from "../../composables/useSettings";
import SliderInput from "../ui/SliderInput.vue";
import TextInput from "../ui/TextInput.vue";

const { settings, updateSetting } = useSettings();
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Content</h3>
    <TextInput
      label="Font Family"
      :model-value="settings.contentFontFamily"
      @update:model-value="updateSetting('contentFontFamily', $event)"
    />
    <SliderInput
      label="Font Size"
      :model-value="settings.contentFontSize"
      :min="8"
      :max="32"
      :step="1"
      unit="px"
      @update:model-value="updateSetting('contentFontSize', $event)"
    />
    <SliderInput
      label="Line Height"
      :model-value="settings.contentLineHeight"
      :min="1"
      :max="2.5"
      :step="0.1"
      @update:model-value="updateSetting('contentLineHeight', $event)"
    />
    <SliderInput
      label="Letter Spacing"
      :model-value="settings.contentLetterSpacing"
      :min="-2"
      :max="5"
      :step="0.5"
      unit="px"
      @update:model-value="updateSetting('contentLetterSpacing', $event)"
    />
    <SliderInput
      label="Padding X"
      :model-value="settings.contentPaddingX"
      :min="0"
      :max="64"
      :step="4"
      unit="px"
      @update:model-value="updateSetting('contentPaddingX', $event)"
    />
    <SliderInput
      label="Padding Y"
      :model-value="settings.contentPaddingY"
      :min="0"
      :max="64"
      :step="4"
      unit="px"
      @update:model-value="updateSetting('contentPaddingY', $event)"
    />
  </section>
</template>

<style scoped>
@import "./settings-shared.css";
</style>
