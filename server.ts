import "dotenv/config"
import express from 'express';
import cardRoutes from './routes/cardRoutes.js';
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', cardRoutes);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});