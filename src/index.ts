import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import whaleRoutes from './routes/whale.routes';
import alertRoutes from './routes/alert.routes';
import { SolanaService } from './services/solana.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/whales', whaleRoutes);
app.use('/api/alerts', alertRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start Solana monitoring
const solanaService = new SolanaService();
solanaService.startMonitoring();

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
});
