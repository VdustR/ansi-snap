<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

function close() {
  offlineReady.value = false;
  needRefresh.value = false;
}
</script>

<template>
  <Transition name="toast">
    <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
      <p v-if="offlineReady">App ready to work offline</p>
      <p v-else>New content available.</p>
      <div class="pwa-toast-actions">
        <button v-if="needRefresh" class="pwa-reload" @click="updateServiceWorker()">Reload</button>
        <button @click="close">Close</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pwa-toast {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 9999;
  padding: 12px 16px;
  background: var(--p-surface-800);
  border: 1px solid var(--p-surface-600);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.3);
  color: var(--p-surface-0);
  font-size: 14px;
  max-width: 320px;
}

.pwa-toast p {
  margin: 0 0 8px;
}

.pwa-toast-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.pwa-toast-actions button {
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid var(--p-surface-500);
  background: transparent;
  color: var(--p-surface-0);
  cursor: pointer;
  font-size: 13px;
}

.pwa-toast-actions .pwa-reload {
  background: var(--p-primary-600);
  border-color: var(--p-primary-600);
}

.pwa-toast-actions button:hover {
  opacity: 0.85;
}

.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
