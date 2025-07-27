import { FormationSchema, type Formation } from '~/schemas/formation';

/**
 * Validates formation data using Zod schema
 * @param data - Raw formation data to validate
 * @returns Validated formation or null if invalid
 */
export function validateFormation(data: unknown): Formation | null {
  try {
    const result = FormationSchema.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      console.warn('Formation validation failed:', {
        data,
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });

      return null;
    }
  } catch (error) {
    console.error('Unexpected error during formation validation:', error);
    return null;
  }
}

/**
 * Validates an array of formation data
 * @param data - Array of raw formation data
 * @returns Array of validated formations (invalid ones are filtered out)
 */
export function validateFormations(data: unknown[]): Formation[] {
  if (!Array.isArray(data)) {
    console.warn('Expected array of formations, got:', typeof data);
    return [];
  }

  return data
    .map(validateFormation)
    .filter((formation): formation is Formation => formation !== null);
}

/**
 * Checks if data is a valid formation without logging warnings
 * @param data - Data to check
 * @returns Boolean indicating if data is valid
 */
export function isValidFormation(data: unknown): data is Formation {
  return FormationSchema.safeParse(data).success;
}
