import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useFormationFilters } from '~/composables/filters/useFormationFilters';
import type { Formation } from '~/types/formation';

// Mock Nuxt composables
const mockRouter = {
  replace: vi.fn(),
};

const mockRoute = {
  query: {},
};

vi.mock('nuxt/app', () => ({
  useRouter: () => mockRouter,
  useRoute: () => mockRoute,
}));

describe('useFormationFilters', () => {
  const mockFormations: Formation[] = [
    {
      id: '1',
      school: 'École Polytechnique',
      city: 'Paris',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      school: 'INSA Lyon',
      city: 'Lyon',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
    },
    {
      id: '3',
      school: 'Sciences Po',
      city: 'Paris',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-03-20'),
    },
  ];

  let formations: Ref<Formation[]>;

  beforeEach(() => {
    formations = ref([...mockFormations]);
    mockRouter.replace.mockClear();
    mockRoute.query = {};
  });

  describe('initialization', () => {
    it('should initialize with empty filters when no URL params', () => {
      const { filters } = useFormationFilters(formations);

      expect(filters.value.city).toBeNull();
      expect(filters.value.search).toBe('');
    });

    it('should initialize with URL params when present', () => {
      mockRoute.query = { city: 'Paris', search: 'École' };

      const { filters } = useFormationFilters(formations);

      expect(filters.value.city).toBe('Paris');
      expect(filters.value.search).toBe('École');
    });
  });

  describe('availableCities', () => {
    it('should return unique cities with counts', () => {
      const { availableCities } = useFormationFilters(formations);

      expect(availableCities.value).toEqual([
        { value: 'Lyon', label: 'Lyon', count: 1 },
        { value: 'Paris', label: 'Paris', count: 2 },
      ]);
    });

    it('should update when formations change', async () => {
      const { availableCities } = useFormationFilters(formations);

      formations.value = [
        {
          id: '1',
          school: 'Test School',
          city: 'Bordeaux',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await nextTick();

      expect(availableCities.value).toEqual([{ value: 'Bordeaux', label: 'Bordeaux', count: 1 }]);
    });
  });

  describe('filtering', () => {
    it('should filter by city', () => {
      const { filteredFormations, setCity } = useFormationFilters(formations);

      setCity('Paris');

      expect(filteredFormations.value).toHaveLength(2);
      expect(filteredFormations.value.every((f) => f.city === 'Paris')).toBe(true);
    });

    it('should filter by search term', () => {
      const { filteredFormations, setSearch } = useFormationFilters(formations);

      setSearch('École');

      expect(filteredFormations.value).toHaveLength(1);
      expect(filteredFormations.value[0].school).toBe('École Polytechnique');
    });

    it('should filter by both city and search', () => {
      const { filteredFormations, setCity, setSearch } = useFormationFilters(formations);

      setCity('Paris');
      setSearch('Sciences');

      expect(filteredFormations.value).toHaveLength(1);
      expect(filteredFormations.value[0].school).toBe('Sciences Po');
    });

    it('should return empty array when no matches', () => {
      const { filteredFormations, setSearch } = useFormationFilters(formations);

      setSearch('NonExistentSchool');

      expect(filteredFormations.value).toHaveLength(0);
    });
  });

  describe('filter stats', () => {
    it('should return correct stats without filters', () => {
      const { filterStats } = useFormationFilters(formations);

      expect(filterStats.value).toEqual({
        total: 3,
        filtered: 3,
        hasActiveFilters: false,
      });
    });

    it('should return correct stats with filters', () => {
      const { filterStats, setCity } = useFormationFilters(formations);

      setCity('Paris');

      expect(filterStats.value).toEqual({
        total: 3,
        filtered: 2,
        hasActiveFilters: true,
      });
    });
  });

  describe('filter actions', () => {
    it('should clear all filters', () => {
      const { filters, clearFilters, setCity, setSearch } = useFormationFilters(formations);

      setCity('Paris');
      setSearch('École');
      clearFilters();

      expect(filters.value.city).toBeNull();
      expect(filters.value.search).toBe('');
    });

    it('should clear only city filter', () => {
      const { filters, clearCity, setCity, setSearch } = useFormationFilters(formations);

      setCity('Paris');
      setSearch('École');
      clearCity();

      expect(filters.value.city).toBeNull();
      expect(filters.value.search).toBe('École');
    });
  });

  describe('URL synchronization', () => {
    it('should update URL when city filter changes', async () => {
      const { setCity } = useFormationFilters(formations);

      setCity('Paris');
      await nextTick();

      expect(mockRouter.replace).toHaveBeenCalledWith({
        query: { city: 'Paris' },
      });
    });

    it('should update URL when search filter changes', async () => {
      const { setSearch } = useFormationFilters(formations);

      setSearch('École');
      await nextTick();

      expect(mockRouter.replace).toHaveBeenCalledWith({
        query: { search: 'École' },
      });
    });

    it('should update URL with both filters', async () => {
      const { setCity, setSearch } = useFormationFilters(formations);

      setCity('Paris');
      setSearch('École');
      await nextTick();

      expect(mockRouter.replace).toHaveBeenCalledWith({
        query: { city: 'Paris', search: 'École' },
      });
    });

    it('should clear URL params when filters are cleared', async () => {
      const { clearFilters, setCity, setSearch } = useFormationFilters(formations);

      setCity('Paris');
      setSearch('École');
      clearFilters();
      await nextTick();

      expect(mockRouter.replace).toHaveBeenCalledWith({
        query: {},
      });
    });
  });
});
