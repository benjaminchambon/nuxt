import { describe, it, expect } from 'vitest';
import { FormationSchema } from '~/schemas/formation';
import { validateFormation, validateFormations, isValidFormation } from '~/utils/validation';

describe('Formation Zod Validation', () => {
  describe('FormationSchema', () => {
    it('should validate a complete valid formation', () => {
      const validFormation = {
        id: '1',
        school: 'École Polytechnique',
        city: 'Paris',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = FormationSchema.safeParse(validFormation);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).toEqual(validFormation);
      }
    });

    it('should validate formation without optional dates', () => {
      const validFormation = {
        id: '1',
        school: 'École Polytechnique',
        city: 'Paris',
      };

      const result = FormationSchema.safeParse(validFormation);
      expect(result.success).toBe(true);
    });

    it('should reject formation with missing required fields', () => {
      const invalidFormation = {
        id: '1',
        school: 'École Polytechnique',
        // missing city
      };

      const result = FormationSchema.safeParse(invalidFormation);
      expect(result.success).toBe(false);
    });

    it('should reject formation with empty required fields', () => {
      const invalidFormation = {
        id: '',
        school: 'École Polytechnique',
        city: 'Paris',
      };

      const result = FormationSchema.safeParse(invalidFormation);
      expect(result.success).toBe(false);
    });

    it('should reject formation with too long school name', () => {
      const invalidFormation = {
        id: '1',
        school: 'A'.repeat(256), // Too long
        city: 'Paris',
      };

      const result = FormationSchema.safeParse(invalidFormation);
      expect(result.success).toBe(false);
    });
  });

  describe('Validation Utilities', () => {
    describe('validateFormation', () => {
      it('should return valid formation for correct data', () => {
        const formationData = {
          id: '1',
          school: 'École Polytechnique',
          city: 'Paris',
        };

        const result = validateFormation(formationData);
        expect(result).toEqual(formationData);
      });

      it('should return null for invalid formation', () => {
        const invalidData = {
          id: '',
          school: 'École Polytechnique',
          // missing city
        };

        const result = validateFormation(invalidData);
        expect(result).toBeNull();
      });
    });

    describe('validateFormations', () => {
      it('should filter out invalid formations from array', () => {
        const formationsData = [
          { id: '1', school: 'École Polytechnique', city: 'Paris' },
          { id: '', school: 'Invalid School', city: 'City' }, // Invalid - empty id
          { id: '2', school: 'INSA Lyon', city: 'Lyon' },
          { id: '3', school: '', city: 'City' }, // Invalid - empty school
        ];

        const result = validateFormations(formationsData);

        expect(result).toHaveLength(2);
        expect(result[0].school).toBe('École Polytechnique');
        expect(result[1].school).toBe('INSA Lyon');
      });

      it('should return empty array for non-array input', () => {
        const result = validateFormations('not an array' as any);
        expect(result).toEqual([]);
      });
    });

    describe('isValidFormation', () => {
      it('should return true for valid formation', () => {
        const formationData = {
          id: '1',
          school: 'École Polytechnique',
          city: 'Paris',
        };

        expect(isValidFormation(formationData)).toBe(true);
      });

      it('should return false for invalid formation', () => {
        const invalidData = {
          id: '',
          school: 'École Polytechnique',
          city: 'Paris',
        };

        expect(isValidFormation(invalidData)).toBe(false);
      });
    });
  });

  describe('Error Messages', () => {
    it('should provide meaningful error messages', () => {
      const invalidFormation = {
        id: '',
        school: '',
        city: 'A'.repeat(101), // Too long
      };

      const result = FormationSchema.safeParse(invalidFormation);
      expect(result.success).toBe(false);

      if (!result.success) {
        const issues = result.error.issues;
        expect(issues.some((issue) => issue.message.includes('Formation ID is required'))).toBe(
          true
        );
        expect(issues.some((issue) => issue.message.includes('School name is required'))).toBe(
          true
        );
        expect(issues.some((issue) => issue.message.includes('City name too long'))).toBe(true);
      }
    });
  });
});
