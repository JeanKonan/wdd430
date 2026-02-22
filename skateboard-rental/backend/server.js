import { app } from './src/app.js';
import { seedSkateboards } from './src/config/seedSkateboards.js';

const PORT = process.env.PORT || 5000;

// Start server with seeding
const startServer = async () => {
  try {
    await seedSkateboards();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();