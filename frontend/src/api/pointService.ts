import type { GeoPoint } from '../types';

export const fetchPointsInBBox = async (bbox: string): Promise<GeoPoint[]> => {
  const response = await fetch(`http://localhost:3001/api/v1/points?bbox=${bbox}`);
  if (!response.ok) throw new Error('Network response was not ok');
  const result = await response.json();
  return result.data;
};