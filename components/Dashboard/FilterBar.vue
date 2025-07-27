<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <!-- Filter Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          ></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900">Filters</h3>
        <span
          v-if="filterStats.hasActiveFilters"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ filterStats.filtered }} / {{ filterStats.total }}
        </span>
      </div>

      <!-- Clear Filters Button -->
      <button
        v-if="filterStats.hasActiveFilters"
        @click="clearFilters"
        class="text-sm text-gray-500 hover:text-gray-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        Clear all filters
      </button>
    </div>

    <!-- Filter Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Search Input -->
      <div class="relative">
        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
          Search formations
        </label>
        <div class="relative">
          <input
            id="search"
            v-model="searchValue"
            type="text"
            placeholder="Search by school or city..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            @input="handleSearchInput"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <!-- Clear search button -->
          <button
            v-if="searchValue"
            @click="clearSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- City Filter -->
      <div>
        <label for="city-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Filter by city
        </label>
        <div class="relative">
          <select
            id="city-filter"
            v-model="selectedCity"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
            @change="handleCityChange"
          >
            <option value="">All cities</option>
            <option v-for="city in availableCities" :key="city.value" :value="city.value">
              {{ city.label }} ({{ city.count }})
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="filterStats.hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
      <span class="text-sm text-gray-500">Active filters:</span>

      <!-- City Filter Badge -->
      <span
        v-if="filters.city"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
      >
        City: {{ filters.city }}
        <button
          @click="clearCity"
          class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </span>

      <!-- Search Filter Badge -->
      <span
        v-if="filters.search"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
      >
        Search: "{{ filters.search }}"
        <button
          @click="clearSearch"
          class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </span>
    </div>

    <!-- No Results Message -->
    <div
      v-if="filterStats.hasActiveFilters && filterStats.filtered === 0"
      class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
    >
      <div class="flex">
        <svg
          class="flex-shrink-0 w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
          ></path>
        </svg>
        <div class="ml-3">
          <p class="text-sm text-yellow-800">
            No formations found matching your current filters. Try adjusting your search criteria.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FilterOptions } from '~/composables/filters/useFormationFilters';

interface Props {
  filters: FilterOptions;
  availableCities: Array<{ value: string; label: string; count: number }>;
  filterStats: { total: number; filtered: number; hasActiveFilters: boolean };
}

interface Emits {
  setCity: [city: string | null];
  setSearch: [search: string];
  clearFilters: [];
  clearCity: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Local reactive values for inputs
const selectedCity = ref(props.filters.city || '');
const searchValue = ref(props.filters.search || '');

// Watch for external filter changes (e.g., from URL)
watch(
  () => props.filters.city,
  (newCity) => {
    selectedCity.value = newCity || '';
  }
);

watch(
  () => props.filters.search,
  (newSearch) => {
    searchValue.value = newSearch || '';
  }
);

// Event handlers
const handleCityChange = () => {
  const city = selectedCity.value || null;
  emit('setCity', city);
};

const handleSearchInput = () => {
  emit('setSearch', searchValue.value);
};

const clearSearch = () => {
  searchValue.value = '';
  emit('setSearch', '');
};

const clearFilters = () => {
  selectedCity.value = '';
  searchValue.value = '';
  emit('clearFilters');
};

const clearCity = () => {
  selectedCity.value = '';
  emit('clearCity');
};
</script>
