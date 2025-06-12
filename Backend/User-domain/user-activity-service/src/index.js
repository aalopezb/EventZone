import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import activityRoutes from './routes/activityRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3012;

app.use(cors());
app.use(express.json());

app.use('/api/activity', activityRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
