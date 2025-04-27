<template>
  <section class="flex flex-col justify-between min-h-screen p-4">
    <div class="flex flex-col items-center">
      <span class="text-highlighted text-3xl font-bold mb-12 self-center">Resultado da Rodada</span>
      <!-- <ul class="flex flex-col items-center">
        <li v-for="(name, index) in sortedNames" :key="index" class="mb-2 text-center text-2xl">
          <input type="checkbox" v-model="selectedNames" :value="name" class="mr-2" />
          {{ name }}: {{ sumVotes(name) }}
        </li>
      </ul> -->
    </div>
    <div>
      <UTable 
        :columns="columns" 
        :data="data"
      />
    </div>
    <button @click="handleButtonClick" :class="['p-2 text-white rounded px-3 py-2 self-center mt-8', buttonConfig.class]">
      {{ buttonConfig.label }}
    </button>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useFormState } from '~/composables/useFormState';
import { onMounted, nextTick, onBeforeMount, defineAsyncComponent } from 'vue';
const UCheckbox = resolveComponent('UCheckbox')

const { names, notes } = useFormState();
const router = useRouter();

// Initialize an empty array for selectedNames
const selectedNames = ref<string[]>([]);


function sumVotes(name: string): number {
  return notes.value[name]?.reduce((acc, vote) => acc + vote, 0) || 0;
}

const data = computed(() => {
  return names.value
    .map((name, index) => ({
      name,
      votes: sumVotes(name),
      index: index + 1
    }))
    .sort((a, b) => b.votes - a.votes);
});


const columns = [
  {
    header: '',
    cell: ({ row }) => {
      console.log("")
      console.log("-----",row.original.name)
      const isSelected = selectedNames.value.includes(row.original.name);
      console.log(`Rendering checkbox for ${row.original.name}, isSelected: ${isSelected}`); 

      return h(UCheckbox, {
              
        modelValue: isSelected,
        'onUpdate:modelValue': (value: boolean) => {
           console.log(`Checkbox for ${row.original.name} toggled to: ${value}`); 
          const name = row.original.name;
          const index = selectedNames.value.indexOf(name);

          if (value) { // Checkbox is checked
            if (index === -1) { // Only add if not already present
              selectedNames.value.push(name);
              console.log('Added:', name, 'Current selectedNames:', [...selectedNames.value]); 
            }
          } else { // Checkbox is unchecked
            if (index > -1) { // Only remove if present
              selectedNames.value.splice(index, 1);
              console.log('Removed:', name, 'Current selectedNames:', [...selectedNames.value]); 
            }
          }
        },
        'aria-label': `Select ${row.original.name}`, // More specific aria-label
        size: 'xl'
      });
    },
    id: 'selection', // Use a more descriptive id
    key: 'selection', // Use a more descriptive key
    label: '' // No label needed for header
  },
  {
    header: '#',
    accessorKey: 'index',
    id: 'index', // Changed id
    key: 'index', // Changed key
    label: '#'
  },
  {
    header: 'Poeta',
    accessorKey: 'name',
    id: 'name',
    key: 'name',
    label: 'Poeta'
  },
  {
    header: 'Pontuação',
    accessorKey: 'votes',
    id: 'votes',
    key: 'votes',
    label: 'Pontuação'
  }
];

const sortedNames = computed(() => {
  return names.value.slice().sort((a, b) => sumVotes(b) - sumVotes(a));
});

const buttonConfig = computed(() => {
  if (selectedNames.value.length > 0) {
    return { label: 'Nova Rodada', class: 'bg-green-600' };
  } else {
    return { label: 'Encerrar Edição', class: 'bg-blue-600' };
  }
});

definePageMeta({
  layout: false,
});

function handleButtonClick() {
  if (selectedNames.value.length > 0) {
    names.value = selectedNames.value;
    router.push('/step3');
  } else {
    router.push('/step5');
  }
}
</script>