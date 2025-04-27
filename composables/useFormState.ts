// composables/useFormState.ts
import { ref, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const names = useLocalStorage<string[]>('names', []);
const notes = useLocalStorage<Record<string, number[]>>('notes', {});
const sumOfNotes = useLocalStorage<Record<string, number>>('sumOfNotes', {});
const juradosNumber = useLocalStorage<number>('juradosNumber', 5);

export const useFormState = () => {
  const addName = () => {
    names.value.push('');
  };

  const saveNotes = (name: string, newNotes: number[]) => {
    notes.value[name] = newNotes;
    sumOfNotes.value[name] = (sumOfNotes.value[name] || 0) + newNotes.reduce((acc, vote) => acc + vote, 0);
  };

  watch(names, (newNames) => {
    // Filter notes to only include entries for names present in the names array
    Object.keys(notes.value).forEach((name) => {
      if (!newNames.includes(name)) {
        delete notes.value[name];
      }
    });
  });

  return {
    names,
    notes,
    sumOfNotes,
    juradosNumber,
    addName,
    saveNotes
  };
};