import { GeoPoint } from '../types/point';

const categories: GeoPoint['category'][] = ['Energy', 'Transport', 'Health', 'Retail'];

export const generatePoints = (count: number = 2000): GeoPoint[] => {
  const points: GeoPoint[] = [];
  const center = { lat: 51.5074, lon: -0.1278 };

  for (let i = 0; i < count; i++) {
    points.push({
      id: i,
      name: `Sensor Node ${i}`,
      lat: center.lat + (Math.random() - 0.5) * 0.4,
      lon: center.lon + (Math.random() - 0.5) * 0.4,
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.floor(Math.random() * 5000)
    });
  }
  return points;
};

export const allPoints = generatePoints();