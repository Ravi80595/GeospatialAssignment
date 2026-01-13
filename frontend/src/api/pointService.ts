import type { GeoPoint } from '../types';
import { localPoints } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1/points';

export const fetchPointsInBBox = async (bbox: string): Promise<GeoPoint[]> => {
  try {
    const response = await fetch(`${API_URL}?bbox=${bbox}`);
    if (!response.ok) throw new Error('API Down');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.warn("Using Fallback Mock Data:", error);
    
    // Manual filtering for the mock data (Same logic as backend)
    const [minLon, minLat, maxLon, maxLat] = bbox.split(',').map(Number);
    return localPoints.filter(p => 
      p.lon >= minLon && p.lon <= maxLon && 
      p.lat >= minLat && p.lat <= maxLat
    );
  }
};