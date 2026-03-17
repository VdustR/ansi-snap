<script setup lang="ts">
import { useSettings } from "../../composables/useSettings";
import { chromeStyleOptions } from "../../constants/chromeStyles";
import SelectInput from "../ui/SelectInput.vue";

const { settings, updateSetting } = useSettings();
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Window Chrome</h3>
    <SelectInput
      label="Style"
      :model-value="settings.chromeStyle"
      :options="chromeStyleOptions"
      @update:model-value="updateSetting('chromeStyle', $event as typeof settings.chromeStyle)"
    />
  </section>
</template>

<style scoped>
@import "./settings-shared.css";
</style>
