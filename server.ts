import "dotenv/config"
import express from 'express';
import rateLimit from 'express-rate-limit';
import cardRoutes from './routes/cardRoutes.js';
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api', limiter);
app.use('/api', cardRoutes);

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  })
}