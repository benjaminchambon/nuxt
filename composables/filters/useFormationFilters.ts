import { computed, ref, watch } from 'vue';
import type { Formation } from '~/types/formation';

export interface FilterOptions {
  city: string | null;
  search: string;
}

export const useFormationFilters = (formations: Ref<Formation[]>) => {
  const route = useRoute();
  const router = useRouter();

  // Initialize filters from URL params
  const filters = ref<FilterOptions>({
    city: (route.query.city as string) || null,
    search: (route.query.search as string) || '',
  });

  // Get unique cities from formations data
  const availableCities = computed(() => {
    const cities = formations.value.map((f) => f.city);
    const uniqueCities = [...new Set(cities)].sort();
    return uniqueCities.map((city) => ({
      value: city,
      label: city,
      count: formations.value.filter((f) => f.city === city).length,
    }));
  });

  // Filter formations based on current filters
  const filteredFormations = computed(() => {
    let result = formations.value;

    // Filter by city
    if (filters.value.city) {
      result = result.filter((formation) => formation.city === filters.value.city);
    }

    // Filter by search term (school name)
    if (filters.value.search.trim()) {
      const searchTerm = filters.value.search.toLowerCase().trim();
      result = result.filter(
        (formation) =>
          formation.school.toLowerCase().includes(searchTerm) ||
          formation.city.toLowerCase().includes(searchTerm)
      );
    }

    return result;
  });

  // Stats for UI display
  const filterStats = computed(() => ({
    total: formations.value.length,
    filtered: filteredFormations.value.length,
    hasActiveFilters: filters.value.city !== null || filters.value.search !== '',
  }));

  // Update URL when filters change
  watch(
    filters,
    (newFilters) => {
      const query: Record<string, string> = {};

      if (newFilters.city) query.city = newFilters.city;
      if (newFilters.search) query.search = newFilters.search;

      router.replace({ query });
    },
    { deep: true }
  );

  // Filter actions
  const setCity = (city: string | null) => {
    filters.value.city = city;
  };

  const setSearch = (search: string) => {
    filters.value.search = search;
  };

  const clearFilters = () => {
    filters.value.city = null;
    filters.value.search = '';
  };

  const clearCity = () => {
    filters.value.city = null;
  };

  return {
    filters,
    availableCities,
    filteredFormations,
    filterStats,
    setCity,
    setSearch,
    clearFilters,
    clearCity,
  };
};
