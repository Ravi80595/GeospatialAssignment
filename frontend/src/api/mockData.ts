import type { GeoPoint } from '../types';

export const generateLocalPoints = (): GeoPoint[] => {
  const points: GeoPoint[] = [];
  const categories: string[] = ['Energy', 'Transport', 'Health', 'Retail'];
  const center = { lat: 51.5074, lon: -0.1278 };

  for (let i = 0; i < 2000; i++) {
    points.push({
      id: i,
      name: `Local Node ${i}`,
      lat: center.lat + (Math.random() - 0.5) * 0.4,
      lon: center.lon + (Math.random() - 0.5) * 0.4,
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.floor(Math.random() * 5000)
    });
  }
  return points;
};

export const localPoints = generateLocalPoints();