import { computed } from 'vue';
import { useFetch } from 'nuxt/app';
import type { ApiResponse } from '~/types/formation';
import { type Formation } from '~/schemas/formation';
import { validateFormations, isValidFormation } from '~/utils/validation';

export const useFormations = () => {
  const { data, pending, error, refresh } = useFetch<ApiResponse<any[]>>('/api/formations', {
    server: true,
    lazy: false,
    key: 'formations',
    default: () => ({ data: [] }),
    // Transform and validate response data
    transform: (response: ApiResponse<any[]>) => {
      try {
        const validatedFormations = validateFormations(response.data);

        return {
          ...response,
          data: validatedFormations,
        };
      } catch (err) {
        console.error('Error validating formations response:', err);
        return { data: [] as Formation[] };
      }
    },
    // Handle HTTP errors
    onResponseError({ response }) {
      console.error('API Error:', response.status, response.statusText);
    },
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
