export interface GeoPoint {
  id: number;
  name: string;
  lat: number;
  lon: number;
  category: string;
  value: number;
}

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}