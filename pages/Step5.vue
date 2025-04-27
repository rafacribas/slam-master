<template>
  <section class="flex flex-col justify-between min-h-screen p-4">
    <div class="flex flex-col items-center">
      <span class="text-highlighted text-3xl font-bold mb-12 self-center">Resultado Final</span>
      <!-- <ul class="flex flex-col items-center">
        <li v-for="(name, index) in sortedNames" :key="index" class="mb-2 text-center text-2xl">
          {{ name }}: {{ sumOfNotes[name] }}
        </li>
      </ul> -->
    </div>
    <div>
      <UTable :data="data" :columns="columns" />
    </div>
    <UButton 
      @click="goHome" 
      class="p-2 text-white rounded px-3 py-2 bg-blue-600 self-center mt-8" 
      size="xl" 
      label="Voltar para o início"
    />
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useFormState } from '~/composables/useFormState';

const { sumOfNotes } = useFormState();

const data = computed(() => {
  return Object.keys(sumOfNotes.value)
    .map((name, index) => ({
      name,
      votes: sumOfNotes.value[name],
      index: index + 1
    }))
    .sort((a, b) => b.votes - a.votes);
});

const columns = [
  {
    header: '#',
    accessorKey: 'index',
    id: 2,
    key: 'name',
    label: 'Poeta'
  },
  {
    header: 'Poeta',
    accessorKey: 'name',
    id: 3,
    key: 'name',
    label: 'Poeta'
  },
  {
    header: 'Pontuação',
    accessorKey: 'votes',
    id: 4,
    key: 'votes',
    label: 'Pontuação'
  }
];

const sortedNames = computed(() => {
  return Object.keys(sumOfNotes.value).sort((a, b) => sumOfNotes.value[b] - sumOfNotes.value[a]);
});

const goHome = () => {
  window.location.href = '/';
};

definePageMeta({
  layout: false,
});
</script>

<style>

</style>