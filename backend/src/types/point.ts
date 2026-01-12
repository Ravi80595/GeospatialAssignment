export interface GeoPoint {
  id: number;
  name: string;
  lat: number;
  lon: number;
  category: 'Energy' | 'Transport' | 'Health' | 'Retail';
  value: number;
}