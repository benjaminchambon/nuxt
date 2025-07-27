import { computed } from 'vue';
import { useFetch } from 'nuxt/app';
import type { Formation } from '~/types/formation';

export const useFormation = (id: string) => {
  const { data, pending, error, refresh } = useFetch<Formation>(`/api/formations/${id}`, {
    key: `formation-${id}`,
    server: true,
    lazy: false,
    default: () => null,
  });

  const formation = computed(() => data?.value ?? null);

  return {
    formation,
    pending,
    error,
    fetchFormation: refresh,
    refresh,
  };
};
