<template>
  <div
    class="fixed top-0 right-0 p-4 z-50 w-full flex flex-col items-center justify-center"
  >
    <TransitionGroup name="toast">
      <!-- <div v-for="toast in toasts" :key="toast.id" class="mb-4 p-4 rounded-md shadow-lg max-w-sm flex items-center"
        :class="toastTypeClasses[toast.type]"> -->
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="mb-4 p-4 rounded-2xl shadow-lg max-w-sm flex items-center bg-white"
      >
        <Icon
          :name="toastTypeIcons[toast.type]"
          :color="toastTypeIconsColor[toast.type]"
          size="20"
          class="mr-2 flex-shrink-0"
        />
        <span>{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const toasts = ref([]);
const toastDuration = 3000; // Duration in milliseconds

const toastTypeClasses = {
  success: "bg-white",
  error: "bg-white",
  info: "bg-white",
};

const toastTypeIcons = {
  success: "mdi:check-circle",
  error: "mdi:alert-circle",
  info: "mdi:information",
};

const toastTypeIconsColor = {
  success: "green",
  error: "red",
  info: "blue",
};

const showToast = (message, type = "info") => {
  const id = Date.now();
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    removeToast(id);
  }, toastDuration);
};

const removeToast = (id) => {
  const index = toasts.value.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
};

// Expose the showToast method to be used by other components
defineExpose({ showToast });

// Clean up any remaining toasts when the component is unmounted
onUnmounted(() => {
  toasts.value = [];
});
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.text-green-500 {
  color: #10b981;
}

.text-red-500 {
  color: #ef4444;
}

.text-blue-500 {
  color: #3b82f6;
}
</style>
