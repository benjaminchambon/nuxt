<template>
  <li
    class="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
    role="button"
    tabindex="0"
    @click="handleClick"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900">{{ formation.school }}</h3>
        <div class="mt-1 flex items-center text-sm text-gray-500">
          <svg
            class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          {{ formation.city }}
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Formation } from '~/types/formation';

interface Props {
  formation: Formation;
}

interface Emits {
  click: [id: string];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClick = () => {
  emit('click', props.formation.id);
};
</script>
