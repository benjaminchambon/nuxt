import { z } from 'zod';

export const FormationSchema = z.object({
  id: z.string().min(1, 'Formation ID is required'),
  school: z.string().min(1, 'School name is required').max(255, 'School name too long'),
  city: z.string().min(1, 'City is required').max(100, 'City name too long'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Formation = z.infer<typeof FormationSchema>;
