import type { Request, Response } from 'express';
import { getHealthStatus } from '../services/health.service.js';

export const healthCheck = (_req: Request, res: Response) => {
  const response = getHealthStatus()
  res.status(response.status).json({ message: response.message });
};