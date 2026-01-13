import { useState, useCallback, useMemo } from 'react';
import { Map } from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { ColumnLayer } from '@deck.gl/layers';
import debounce from 'lodash.debounce';
import type { GeoPoint } from '../types';
import { fetchPointsInBBox } from '../api/pointService';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  longitude: -0.1278,
  latitude: 51.5074,
  zoom: 12,
  pitch: 45,
  bearing: 0,
  transitionDuration: 0 // Resetting transition for manual moves
};

interface Props {
  onSelectPoint: (p: any) => void;
  selectedCategory: string | null;
}

export const MapContainer = ({ onSelectPoint, selectedCategory }: Props) => {
  const [points, setPoints] = useState<GeoPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewState, setViewState] = useState<any>(INITIAL_VIEW_STATE);

  const loadData = useCallback(
    debounce(async (bounds: any) => {
      if (!bounds) return;
      setLoading(true);
      const { _sw, _ne } = bounds;
      const bbox = `${_sw.lng},${_sw.lat},${_ne.lng},${_ne.lat}`;
      try {
        const data = await fetchPointsInBBox(bbox);
        setPoints(data);
      } catch (err) {
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  // Client-side filter based on Category
  const filteredData = useMemo(() => {
    if (!selectedCategory) return points;
    return points.filter(p => p.category === selectedCategory);
  }, [points, selectedCategory]);

  const layers = useMemo(() => [
    new ColumnLayer({
      id: 'column-layer',
      data: filteredData,
      diskResolution: 20,
      radius: 50,
      extruded: true,
      pickable: true,
      elevationScale: 2,
      getPosition: (d: GeoPoint) => [d.lon, d.lat],
      getFillColor: (d: GeoPoint) => {
        const colors: Record<string, [number, number, number]> = {
          Energy: [255, 100, 0],
          Transport: [0, 200, 255],
          Health: [255, 0, 100],
          Retail: [100, 255, 0]
        };
        return colors[d.category] || [200, 200, 200];
      },
      getElevation: (d: GeoPoint) => d.value / 10,
      onClick: ({ object }) => {
        if (object) {
          onSelectPoint(object);
          // Smooth Fly-To effect on click
          setViewState((prev: any) => ({
            ...prev,
            longitude: object.lon,
            latitude: object.lat,
            zoom: 14,
            transitionDuration: 1000
          }));
        }
      },
    })
  ], [filteredData, onSelectPoint]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000' }}>
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e: any) => setViewState({ ...e.viewState, transitionDuration: 0 })}
        controller={true}
        layers={layers}
        getTooltip={({ object }) => object && {
          html: `<div style="padding: 10px; background: #222; color: #fff; border-radius: 5px;">
                  <strong>${object.name}</strong><br/>
                  Value: ${object.value}<br/>
                  Category: ${object.category}
                </div>`
        }}
      >
        <Map
          mapStyle={MAP_STYLE}
          onLoad={(evt) => loadData(evt.target.getBounds())}
          onMoveEnd={(evt) => loadData(evt.target.getBounds())}
        />
      </DeckGL>

      <button 
        onClick={() => setViewState({ ...INITIAL_VIEW_STATE, transitionDuration: 1000 })}
        className="reset-btn-ui"
      >
        Reset Camera
      </button>

      {loading && (
        <div className="loading-indicator">Updating Data...</div>
      )}
    </div>
  );
};