<template>
  <section class="flex flex-col justify-center items-center h-screen">
    <ColorModeButton class="mb-4"/>
    <NuxtLink to="/step1">
      <UButton       
        class="h-16 px-6 items-center flex justify-center text-2xl mx-2 mt-4"
        trailing-icon="i-lucide-arrow-right"
        label="Iniciar nova edição"
      />
    </NuxtLink>
    <NuxtLink v-if="hasData" to="/step5" class="mt-6">
      <UButton
      label="Resultado Final"
      variant="outline"
      trailing-icon="i-lucide-crown"
      color="neutral"
      class="flex"
      />
    </NuxtLink>
 
    <UButton
      label="Limpar dados locais"
      variant="outline"
      trailing-icon="i-lucide-trash"
      color="neutral"
      @click="clearData"
      class="absolute bottom-0 mb-4"
    />
  </section>  
</template>

<script lang="ts" setup>
import { UButton } from '#components';
import { useFormState } from '~/composables/useFormState';
import { computed } from 'vue';

const { names, notes, sumOfNotes } = useFormState();

const hasData = computed(() => {
  return names.value.length > 0 || Object.keys(notes.value).length > 0 || Object.keys(sumOfNotes.value).length > 0;
});

function clearData() {
  names.value = [];
  Object.keys(notes.value).forEach(key => delete notes.value[key]);
  Object.keys(sumOfNotes.value).forEach(key => delete sumOfNotes.value[key]);
}

 definePageMeta({
     layout: 'noBack',
   });
</script>

<style>

</style>