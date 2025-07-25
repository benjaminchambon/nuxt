import { defineEventHandler } from 'h3';
import type { Formation, ApiResponse } from '~/types/formation';
import { formations } from '~/server/mock/formations';
import { apiError } from '~/server/utils/apiError';

export default defineEventHandler(async (event): Promise<ApiResponse<Formation[]>> => {
  try {
    return {
      data: formations,
      message: 'Liste des formations récupérée avec succès',
    };
  } catch (err) {
    console.error('Erreur API /api/formations :', err);
    throw apiError(500, 'Impossible de récupérer les formations');
  }
});
