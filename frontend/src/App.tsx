import { useState } from 'react';
import { MapContainer } from './components/MapContainer';
import './App.css';

const CATEGORIES = ['Energy', 'Transport', 'Health', 'Retail'];

function App() {
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <div className="app-wrapper">
      {/* Category Filter UI */}
      <div className="filter-container">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            className={`filter-chip ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(filter === cat ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <MapContainer onSelectPoint={setSelectedPoint} selectedCategory={filter} />

      {selectedPoint && (
        <div className="detail-sidebar">
          <button className="close-btn" onClick={() => setSelectedPoint(null)}>×</button>
          <h2>{selectedPoint.name}</h2>
          <hr />
          <div className="detail-row">
            <span>Category:</span> <strong>{selectedPoint.category}</strong>
          </div>
          <div className="detail-row">
            <span>Value:</span> <strong>{selectedPoint.value}</strong>
          </div>
          <div className="detail-row">
            <span>Coordinates:</span> 
            <small>{selectedPoint.lat.toFixed(4)}, {selectedPoint.lon.toFixed(4)}</small>
          </div>
        </div>
      )}

      <div className="map-overlay-info">
        <h3>3D Geospatial Viewer</h3>
        <p>Right-click + drag to rotate 3D view</p>
        <p>Scroll to zoom</p>
      </div>
    </div>
  );
}

export default App;