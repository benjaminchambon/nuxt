// server/mock/formations.ts
import type { Formation } from '~/types/formation';

export const formations: Formation[] = [
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
    school: 'Université de Bordeaux',
    city: 'Bordeaux',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: '4',
    school: 'CentraleSupélec',
    city: 'Gif-sur-Yvette',
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-03-12'),
  },
  {
    id: '5',
    school: 'Sciences Po',
    city: 'Paris',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
];
