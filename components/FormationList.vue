<template>
  <div class="bg-white shadow-sm rounded-lg overflow-hidden">
    <ul class="divide-y divide-gray-200">
      <FormationCard
        v-for="formation in formations"
        :key="formation.id"
        :formation="formation"
        @click="$emit('click', $event)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Formation } from '../types/formation';

interface Props {
  formations: Formation[];
}

interface Emits {
  click: [id: string];
}

defineProps<Props>();
defineEmits<Emits>();
</script>
