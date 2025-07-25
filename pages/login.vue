<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">Connexion</h1>
    <button @click="login" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
      Se connecter
    </button>
  </div>
</template>

<script setup lang="ts">
const token = useCookie('auth_token');

const login = () => {
  token.value = 'fake-token'; // Simuler une connexion
  navigateTo('/dashboard');
};
</script>
