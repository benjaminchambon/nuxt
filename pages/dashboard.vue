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

      <!-- Content when data is loaded -->
      <template v-else>
        <!-- Filter Bar -->
        <FilterBar
          :filters="filters"
          :available-cities="availableCities"
          :filter-stats="filterStats"
          @set-city="setCity"
          @set-search="setSearch"
          @clear-filters="clearFilters"
          @clear-city="clearCity"
        />

        <!-- Results Summary -->
        <div v-if="formations.length > 0" class="mb-4">
          <p class="text-sm text-gray-600">
            <template v-if="filterStats.hasActiveFilters">
              Showing {{ filterStats.filtered }} of {{ filterStats.total }} formations
            </template>
            <template v-else> {{ filterStats.total }} formations total </template>
          </p>
        </div>

        <!-- Formations List -->
        <FormationList
          v-if="filteredFormations.length > 0"
          :formations="filteredFormations"
          @click="handleFormationClick"
        />

        <!-- Empty State - No formations at all -->
        <EmptyState
          v-else-if="formations.length === 0"
          title="No formations"
          description="Get started by adding your first formation."
        />

        <!-- Empty State - No results after filtering -->
        <EmptyState
          v-else
          title="No formations found"
          description="Try adjusting your search criteria or clear the current filters."
        >
          <template #actions>
            <button
              @click="clearFilters"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear Filters
            </button>
          </template>
        </EmptyState>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { formations, pending, error } = useFormations();

// Initialize filters
const {
  filters,
  availableCities,
  filteredFormations,
  filterStats,
  setCity,
  setSearch,
  clearFilters,
  clearCity,
} = useFormationFilters(formations);

definePageMeta({
  middleware: 'auth',
});

const handleFormationClick = (formationId: string) => {
  navigateTo(`/formations/${formationId}`);
};

// SEO Meta tags based on active filters
useHead(() => {
  const title = filters.value.city
    ? `Formations in ${filters.value.city} - My Study List`
    : 'My Study List - Educational Formations';

  const description = filters.value.city
    ? `Browse educational formations available in ${filters.value.city}. Find the perfect school for your studies.`
    : 'Browse and manage your educational formations. Find the perfect school for your studies.';

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
    ],
  };
});
</script>
