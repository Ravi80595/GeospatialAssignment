import { Request, Response } from 'express';
import { GeoService } from '../services/geoService';

export const getPoints = (req: Request, res: Response) => {
  try {
    const { bbox } = req.query;

    if (!bbox) {
      return res.status(400).json({ error: 'BBox parameter is required (minLon,minLat,maxLon,maxLat)' });
    }

    const coords = (bbox as string).split(',').map(Number);
    if (coords.length !== 4 || coords.some(isNaN)) {
      return res.status(400).json({ error: 'Invalid BBox format' });
    }

    const [minLon, minLat, maxLon, maxLat] = coords;
    const points = GeoService.filterByBBox(minLon, minLat, maxLon, maxLat);
    
    res.json({
      count: points.length,
      data: points
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};