<template>
  <header class="mb-4 flex justify-between items-center p-2 bg-gray-100 dark:bg-neutral-900 dark:border-gray-700 shadow-md">
    <div class="flex items-center">
      <UIcon v-if="!noback" @click="goBack" class="cursor-pointer" name="i-lucide-arrow-left" />
      <div v-else class="w-8" />
      <span class="ml-2">Voltar</span>
    </div>
    <ColorModeButton class="ml-10" />
  </header>
</template>

<script setup>
const route = useRoute();
const props = defineProps({
  noback: {
    type: Boolean,
    default: false,
  },
});

const goBack = () => {
  const currentPath = route.path;
  const segments = currentPath.split('/');
  
  if (segments.length > 1) {
    const currentStep = parseInt(segments[segments.length - 1].replace('step', ''));
    if (!isNaN(currentStep) && currentStep > 1) {
      navigateTo(`/step${currentStep - 1}`);
    } else {
      window.location.href = '/';
    }
  } else {
    window.location.href = '/';
  }
};
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style> 