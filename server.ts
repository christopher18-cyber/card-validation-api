import "dotenv/config"
import express from 'express';
import cardRoutes from './routes/cardRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Set up routes
app.use('/api', cardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});