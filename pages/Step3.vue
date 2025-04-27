<template>
  <section class="flex flex-col justify-between min-h-[80vh] p-4">
    <div class="flex flex-col items-center">
      <span class="text-highlighted text-3xl font-bold mb-4 self-center">{{ currentName }}</span>
    </div>
    <div class="flex flex-col items-center">
      <div v-for="index in juradosNumber" :key="index" class="mb-4">
        <UFormField :label="`Jurado ${index}`" class="my-2">
          <UInput id="vote-${index}"
          label="`Jurado ${index}`"
          size="xl" 
          type="number"
          v-model.number="currentNotes[index - 1]"
          placeholder="Nota"
          class="rounded w-64" 
          />
        </UFormField>
      </div>
    </div>
    <UButton @click="nextNameOrNavigate" size="xl" class="p-2 text-white rounded px-3 py-2 bg-secondary self-center">
      <span v-if="nextName">Próximo: {{ nextName }}</span>
      <span v-else>Finalizar Rodada</span>
    </UButton>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useFormState } from '~/composables/useFormState';

const { names, saveNotes, juradosNumber } = useFormState();
const route = useRoute();
const startIndex = route.query.startIndex ? parseInt(route.query.startIndex as string) : 0;
const currentIndex = ref(startIndex);
const currentNotes = ref<number[]>(Array(juradosNumber.value).fill(0));
const router = useRouter();

// watch(juradosNumber, (newValue) => {
//   currentNotes.value = Array(newValue).fill(0);
// });

const currentName = computed(() => names.value[currentIndex.value] || '');

const nextName = computed(() => {
  if (names.value.length === 0) return '';
  const nextIndex = (currentIndex.value + 1) % names.value.length;
  return nextIndex === startIndex ? '' : names.value[nextIndex];
});

function nextNameOrNavigate() {
  if (names.value.length > 0) {
    saveNotes(currentName.value, currentNotes.value);
    currentNotes.value = Array(juradosNumber.value).fill(0);
    if ((currentIndex.value + 1) % names.value.length === startIndex) {
      router.push('/step4');
    } else {
      currentIndex.value = (currentIndex.value + 1) % names.value.length;
    }
  }
}
</script>

<style>

</style>