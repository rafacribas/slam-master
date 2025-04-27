<template>
  <section class="flex flex-col justify-between min-h-[90vh] p-4">
    <div class="flex flex-col items-center">
      <span class="text-highlighted text-3xl font-bold mb-12 self-center">Registrar Poetas</span>
      <div class="flex flex-col items-center">
        <UButton  
          class="mb-12 bg-green-600 justify-center px-3 py-2 text-white rounded"
          label="Adicionar Poeta"
          trailing-icon="i-lucide-plus"
          @click="addNameField" 
        />
        <span class="mt-2 mb-2 text-sm text-muted ">Quantidade de jurados</span>
        <UInput
          type="number"
          size="xl"
          v-model.number="juradosNumber"
          placeholder=""
          class="rounded w-64 mb-4 px-18"
          min="1"
        />
        <span class="mt-2 -mb-2 text-sm text-muted ">Poetas Registrados: {{ registeredNamesCount }}</span>
        <UFormField v-for="(name, index) in names" :key="index">
          <UInput type="text" size="xl" v-model="names[index]" placeholder="Nome" class="p-4 rounded w-64" />
        </UFormField>
      </div>
    </div>
    <NuxtLink to="/step2" class="self-center mt-8" @click.native="removeEmptyNames">
      <UButton class="p-2 text-white rounded  px-3 py-2" size="xl" color="secondary" label="Iniciar competição"/>
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useFormState } from '~/composables/useFormState';

const { names, juradosNumber, addName } = useFormState();

const registeredNamesCount = computed(() => {
  return names.value.filter(name => name.trim() !== '').length;
});

// add nuxt layout
definePageMeta({
  layout: 'default',
});

function addNameField() {
  addName();
}

function removeEmptyNames() {
  names.value = names.value.filter(name => name.trim() !== '');
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style> 