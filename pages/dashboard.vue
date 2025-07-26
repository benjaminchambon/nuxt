<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <PageHeader title="My Study List" description="Manage your educational formations" />

      <!-- Loading State -->
      <LoadingSpinner v-if="pending" />

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading formations</h3>
            <p class="mt-1 text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Formations List -->
      <FormationList
        v-else-if="formations.length > 0"
        :formations="formations"
        @click="handleFormationClick"
      />

      <!-- Empty State -->
      <EmptyState
        v-else
        title="No formations"
        description="Get started by adding your first formation."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { formations, pending, error } = useFormations();

definePageMeta({
  middleware: 'auth',
});

const handleFormationClick = (formationId: string) => {
  navigateTo(`/formations/${formationId}`);
};
</script>
