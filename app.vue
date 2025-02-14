<template>
  <div>
    <ToastNotification ref="toastRef" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { $toaster } = useNuxtApp();
const toastRef = ref(null);

onMounted(() => {
  $toaster.show = (message, type) => {
    toastRef.value?.showToast(message, type);
  };
});
</script>