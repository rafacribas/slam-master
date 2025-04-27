<template>
  <section class="flex flex-col justify-between min-h-[80vh] p-4">
    <div class="flex flex-col items-center">
      <span class="text-highlighted text-3xl font-bold mb-12 self-center">Registrar Poetas</span>
      <div class="flex flex-col items-center w-full max-w-xs">
        <span class="mt-2 mb-2 text-sm text-muted ">Quantidade de jurados</span>
        <UInput
          type="number"
          size="xl"
          v-model.number="juradosNumber"
          placeholder=""
          class="rounded w-64 mb-4 px-18"
          min="1"
        />
        <UButton
          class="mt-5 bg-green-600 justify-center px-3 py-2 text-white rounded"
          label="Adicionar Poeta"
          trailing-icon="i-lucide-plus"
          @click="addNameField"
        />
        <span class="mt-2 mb-8 text-sm text-muted ">Poetas Registrados: {{ registeredNamesCount }}</span>
        <UFormField v-for="(name, index) in names" :key="`name-field-${index}`" class="w-full flex justify-center items-center mb-2">
          <UInput
            type="text"
            size="xl"
            v-model="names[index]"
            placeholder="Nome"
            class="flex-grow p-1.5 rounded"
            :ref="(el) => setInputRef(el, index)"
          />
          <UIcon
            name="i-lucide-trash"
            color="red"
            size="xs"
            class="ml-2 p-2" 
            @click="removeNameField(index)"
            aria-label="Remover Poeta"
          />
        </UFormField>
      </div>
    </div>
    <NuxtLink to="/step2" class="self-center mt-8" @click.native="removeEmptyNames">
      <UButton class="p-2 text-white rounded px-3 py-2" size="xl" color="secondary" label="Iniciar competição"/>
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>
import { UIcon } from '#components';
import { computed, ref, nextTick, onBeforeUpdate } from 'vue';
import { useFormState } from '~/composables/useFormState';

const { names, juradosNumber, addName } = useFormState();

// Ref array to hold input component instances
const nameInputRefs = ref<any[]>([]);

// Function to assign refs dynamically based on index
const setInputRef = (el: any, index: number) => {
  // Store the component instance or the element if it's directly available
  if (el) {
    nameInputRefs.value[index] = el;
  }
};

// Clear refs before each update to prevent stale references
onBeforeUpdate(() => {
  nameInputRefs.value = [];
});

const registeredNamesCount = computed(() => {
  return names.value.filter(name => name.trim() !== '').length;
});

// add nuxt layout
definePageMeta({
  layout: 'default',
});

async function addNameField() {
  const newIndex = names.value.length;
  addName();
  await nextTick();

  const inputComponentInstance = nameInputRefs.value[newIndex];
  if (inputComponentInstance) {
    console.log('Attempting to focus input at index:', newIndex, 'Ref:', inputComponentInstance);
    let focusableElement: HTMLElement | null = null;

    // Strategy 1: Check for an 'input' ref (common pattern)
    if (inputComponentInstance.input && typeof inputComponentInstance.input.focus === 'function') {
      console.log('Found focusable element via .input ref');
      focusableElement = inputComponentInstance.input;
    } 
    // Strategy 2: Check for a direct focus method on the component instance
    else if (typeof inputComponentInstance.focus === 'function') {
        console.log('Found direct focus method on component instance');
        // If the component has its own focus method, call it directly
        inputComponentInstance.focus();
        return; // Exit if component handles focus itself
    }
    // Strategy 3: Try accessing the root element ($el) and finding the input inside
    else if (inputComponentInstance.$el) {
      console.log('Trying to find input within component $el');
      focusableElement = inputComponentInstance.$el.querySelector('input');
    }

    // If we found a focusable HTML element, try focusing it
    if (focusableElement && typeof focusableElement.focus === 'function') {
      console.log('Focusing element:', focusableElement);
      focusableElement.focus();
    } else {
        console.warn('Could not find focusable element or focus method for the new input.');
    }
  }
}

// Function to remove a name field
function removeNameField(index: number) {
  names.value.splice(index, 1);
  // Optionally, clear the corresponding ref if needed, though onBeforeUpdate handles it
  // nameInputRefs.value.splice(index, 1); 
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