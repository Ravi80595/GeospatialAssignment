import { allPoints } from '../data/mockData';
import { GeoPoint } from '../types/point';

export class GeoService {
  static filterByBBox(minLon: number, minLat: number, maxLon: number, maxLat: number): GeoPoint[] {
    return allPoints.filter(p => 
      p.lon >= minLon && p.lon <= maxLon && 
      p.lat >= minLat && p.lat <= maxLat
    );
  }
}