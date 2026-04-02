import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { initializeDatabase } from './models/init';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware securely handles cross origin and json parsing
app.use(cors({
  origin: '*', // For production, replace with exact frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Main API Router Mount
app.use('/api', apiRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'HS Properties Core API', timestamp: new Date() });
});

// Boot Sequence
async function bootstrap() {
  try {
    console.log("[Server] Waking up and mapping MySQL constraints...");
    // 1. Ensure MySQL schema is constructed
    await initializeDatabase();
    
    // 2. Open HTTP Listener
    app.listen(PORT, () => {
      console.log(`[Server] Live on http://localhost:${PORT}`);
      console.log(`[Server] API endpoints mapped at /api/leads and /api/settings`);
    });
  } catch (error) {
    console.error("[Server] Fatal Boot Error - MySQL Connection Failed:", error);
    process.exit(1);
  }
}

bootstrap();
