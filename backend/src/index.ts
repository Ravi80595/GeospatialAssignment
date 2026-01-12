import express from 'express';
import cors from 'cors';
import { getPoints } from './controllers/pointController';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Senior Move: Versioning your API
app.get('/api/v1/points', getPoints);

app.listen(PORT, () => {
  console.log(`🚀 Geospatial API running on http://localhost:${PORT}/api/v1/points`);
});