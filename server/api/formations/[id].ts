import { defineEventHandler, getRouterParam } from 'h3';
import type { Formation } from '~/types/formation';
import { formations } from '~/server/mock/formations';
import { apiError } from '~/server/utils/apiError';

export default defineEventHandler(async (event): Promise<Formation> => {
  const formationId = getRouterParam(event, 'id');

  if (!formationId) {
    throw apiError(400, `L'ID de la formation est requis`);
  }

  const formation = formations.find((f) => f.id === formationId);

  if (!formation) {
    throw apiError(404, `Formation avec l'ID '${formationId}' non trouvée`);
  }

  return formation;
});
