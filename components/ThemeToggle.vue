<script setup>
import { Moon } from "lucide-vue-next";
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <button
    @click="toggleColorMode"
    class="md:p-3 p-2 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    :class="[
      colorMode.value === 'dark'
        ? 'bg-primary text-yellow-300hover:bg-gray-700'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    ]"
    :aria-label="
      colorMode.value === 'dark'
        ? 'Switch to light mode'
        : 'Switch to dark mode'
    "
  >
    <Moon :size="20" />
  </button>
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors duration-1000 ease-in-out;
}
</style>
