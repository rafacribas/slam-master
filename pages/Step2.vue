<template>
  <section class="flex flex-col justify-between min-h-[90vh ] p-4">
    <div class="flex flex-col items-center">
      <span class="text-highlighted text-3xl font-bold mb-12 self-center">Sortear Poeta</span>
      <UButton 
        :class="['p-2 text-white rounded px-7 py-3', highlightedIndex !== null ? 'bg-blue-600' : 'bg-green-600']"
        size="xl" 
        :label="highlightedIndex !== null ? 'Sortear Novamente' : 'Sortear'"
        @click="highlightRandomName"
      />
      <span v-if="highlightedIndex !== null" class="mt-4 text-xl">
        Poeta sorteado: {{ names[highlightedIndex] }}
      </span>
    </div>
    <ul class="flex flex-col items-center rounded-lg p-4">
      <li 
        v-for="(name, index) in names"
        :key="index"
        :class="{'bg-green-600 light:text-white': index === highlightedIndex, 'dark:bg-neutral-800 light:bg-neutral-200': index !== highlightedIndex}"
        class="mb-2 text-center max-w-[500px] md:h-14 text-xl flex items-center justify-center w-full mx-3 rounded-lg h-10 my-2"
      >
        {{ name }}
      </li>
    </ul>
    <NuxtLink :to="{ path: '/step3', query: { startIndex: highlightedIndex } }" class="self-center mt-8">
      <UButton 
        class="p-2 text-white rounded px-3 py-2 bg-blue-600"
        size="xl"
        :label="`Iniciar ${names[highlightedIndex] ? `com ${names[highlightedIndex]}` : ''}`"
        :disabled="highlightedIndex === null"
      />
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>

const { names } = useFormState();
const highlightedIndex = ref<number | null>(null);

function highlightRandomName() {
  if (names.value.length > 0) {
    highlightedIndex.value = Math.floor(Math.random() * names.value.length);
  }
}
</script>

<style>
.bg-primary {
  background-color: var(--primary-color);
}
</style> 