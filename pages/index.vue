<template>
  <h1 class="text-xl text-green-600">✅ {{ msg }}</h1>
  <div class="p-8 bg-blue-200 text-blue-900 rounded-lg">Tailwind fonctionne parfaitement !</div>
</template>

<script setup lang="ts">
const msg: string = 'TypeScript is working!';

console.log(msg);
</script>
