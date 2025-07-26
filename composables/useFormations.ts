import { computed } from 'vue';
import { useFetch } from 'nuxt/app';
import type { ApiResponse, Formation } from '../types/formation';

export const useFormations = () => {
  const { data, pending, error, refresh } = useFetch<ApiResponse<Formation[]>>('/api/formations', {
    server: true,
    lazy: false,
    key: 'formations',
    default: () => ({ data: [] }),
  });

  const formations = computed(() => data.value?.data ?? []);

  return {
    formations,
    pending,
    error,
    fetchFormations: refresh,
    refresh,
  };
};
