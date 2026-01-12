# GeospatialAssignment

# 3D Geospatial Visualization Dashboard

A high-performance, full-stack application that visualizes 2,000+ geospatial data points in a 3D environment. Built for speed, accuracy, and smooth user interaction.

## 🚀 The Approach
This project goes beyond basic map rendering. Key architectural decisions include:
- **MapLibre GL JS & Deck.gl:** Chosen for hardware-accelerated (WebGL) rendering to ensure 60FPS performance even with high data density.
- **Bounding Box (BBox) Strategy:** Instead of fetching 2,000 points at once, the frontend requests only the data visible in the current viewport, significantly reducing payload size.
- **Debounced Interaction:** API calls are debounced to prevent server spamming during rapid zooming or panning.
- **Type Safety:** Full TypeScript implementation across the stack for robust data handling.

## 🛠 Tech Stack
- **Frontend:** React 19, Vite, Deck.gl (ColumnLayer), MapLibre GL JS.
- **Backend:** Node.js, Express, TypeScript.
- **Styling:** Standard CSS3 (Custom Dark Theme).

## 📦 Features
- **3D Visualization:** Data points rendered as columns where `height` represents the data value.
- **Dynamic Filtering:** Real-time category filtering (Energy, Transport, Health, Retail) without losing map context.
- **Smooth Animations:** Integrated 'Fly-to' transitions for camera resets and point selection.
- **Interactive Detail View:** Hover tooltips and a dedicated sidebar for deep-dives into specific data points.

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev


The server will start on http://localhost:3001

3. Frontend Setup
Bash

cd frontend
npm install
npm run dev
The app will be available at http://localhost:5173

🗺 API Documentation
Endpoint: GET /api/v1/points Query Params: - bbox: minLon,minLat,maxLon,maxLat (e.g., -0.2,51.4,0.1,51.6)

💡 Interaction Guide
Rotate in 3D: Right-click + Drag.

Zoom: Scroll wheel.

Select: Click any 3D column to view details in the sidebar.

Filter: Use the floating category chips at the top to toggle data layers.
