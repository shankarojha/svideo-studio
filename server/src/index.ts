import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import healthRoutes from "./routes/health.routes.js";
import projectRoutes from './routes/project.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes)
app.use('/api/projects', projectRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`SVideo Studio server running on http://localhost:${PORT}`);
});