import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // This tells Vite: "Pre-bundle these so I don't have to worry about their internal paths"
    include: ['react-map-gl/mapbox', 'mapbox-gl', 'deck.gl']
  }
})