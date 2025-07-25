<template>
  <div class="mb-8 flex flex-row justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
      <p v-if="description" class="mt-2 text-gray-600">{{ description }}</p>
    </div>
    <div class="space-y-4">
      <h1 class="text-xl font-bold">Dashboard</h1>
      <p>Vous êtes connecté 🎉</p>
      <button @click="logout" class="px-4 py-2 bg-red-600 text-white rounded">
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();

const token = useCookie('auth_token');

const logout = () => {
  token.value = null;
  navigateTo('/login');
};
</script>
